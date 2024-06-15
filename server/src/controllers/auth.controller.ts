import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Jwt, IUser } from "../models/user.model";
import { db } from "../config/db";
import bcrypt from "bcrypt";
import { signAccessToken, signRefreshToken } from "../utils/jwt";

const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const validEmail = (email: string): boolean => {
  return regex.test(email);
};

const validatePassword = (password: string, confirmPassword: string): boolean => {
  if (password.trim() !== confirmPassword.trim()) return false;
  if (password.trim().length < 4) return false;

  return true;
};

export const createUserWithEmail = async (req: Request, res: Response) => {
  try {
    const { email, name, password, confirmPassword } = req.body;

    if (!email || !name || !password || !confirmPassword) {
      return res.json({ message: "Invalid credentials" }).status(400);
    }

    if (!validEmail(email)) {
      return res.json({ message: "Invalid email" }).status(400);
    }

    if (!validatePassword(password, confirmPassword)) {
      return res.json({ message: "Invalid password" }).status(400);
    }

    const userExist = await db.user.findUnique({
      where: {
        email: email,
      },
    });

    if (userExist) {
      return res.json({ message: "User already exist with the same email" }).status(400);
    }

    const user = await db.user.create({
      data: {
        email: email,
        name: name,
        picture: process.env.DEFAULT_PICTURE || "http://localhost:5000/public/assets/default_picture.png",
        provider: "local",
        password: await bcrypt.hash(password, 10),
      },
    });

    const payload: Jwt = {
      id: user.id,
      name: user.name,
      picture: user.picture,
    };

    const accessToken = signAccessToken(payload);
    const refreshToken = signRefreshToken(payload);

    res.cookie("refresh_token", refreshToken, { httpOnly: true });

    return res.json({ message: userExist ? "User logged in successfully" : "User created successfully", accessToken }).status(200);
  } catch (e: any) {
    console.log(e);
  }
};

export const googleCallback = async (req: Request, res: Response) => {
  const user: IUser = req.user as IUser;

  console.log(req.user);
  const payload: Jwt = {
    id: user.id,
    name: user.name,
    picture: user.picture,
  };

  const accessToken = signAccessToken(payload);
  const refreshToken = signRefreshToken(payload);

  res.cookie("refresh_token", refreshToken, { httpOnly: true });

  return res.redirect(`${process.env.CLIENT_ORIGIN || "http://localhost:3000"}?token=${accessToken}`);
};

export const logout = async (req: Request, res: Response) => {
  res.clearCookie("refresh_token");
};

export const loginWithEmail = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.json({ message: "Invalid credentials" }).status(400);
    }

    const user = await db.user.findUnique({
      where: {
        email: email,
        provider: "local",
      },
    });

    if (!user) {
      return res.json({ message: "Invalid credentials" }).status(400);
    }

    if (!(await bcrypt.compare(password, user.password || ""))) {
      return res.json({ message: "Invalid credentials" }).status(400);
    }

    const payload: Jwt = {
      id: user.id,
      name: user.name,
      picture: user.picture,
    };

    const accessToken = signAccessToken(payload);
    const refreshToken = signRefreshToken(payload);

    res.cookie("refresh_token", refreshToken, { httpOnly: true });

    return res.json({ message: "Logged in successfully", accessToken }).status(200);
  } catch (e: any) {
    console.log(e);
  }
};

export const test = async (req: Request, res: Response) => {
  return res.json({ message: "You reached test endpoint" });
};

export const refreshToken = async (req: Request, res: Response) => {
  const { refresh_token } = req.cookies;

  if (!refreshToken) {
    return res.json({ message: "Token is required" });
  }

  try {
    const user = jwt.verify(refresh_token, process.env.JWT_SECRET_REFRESH_TOKEN || "") as Jwt;
    if (!user) {
      return res.json({ message: "Invalid token" }).status(400);
    }

    const payload: Jwt = {
      id: user.id,
      name: user.name,
      picture: user.picture,
    };

    const accessToken = signAccessToken(payload);

    return res.json({ message: "Created access token", accessToken }).status(200);
  } catch (e: any) {
    return res.json({ message: "Invalid token" }).status(400);
  }
};
