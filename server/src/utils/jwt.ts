import { Jwt } from "../models/user.model";
import jwt from "jsonwebtoken";

const signAccessToken = (payload: Jwt) => {
  if (payload == undefined) return;

  const accessToken = jwt.sign(payload, process.env.JWT_SECRET_ACCESS_TOKEN || "", { expiresIn: "45s" });

  return accessToken;
};

const signRefreshToken = (payload: Jwt) => {
  if (payload == undefined) return;

  const refreshToken = jwt.sign(payload, process.env.JWT_SECRET_REFRESH_TOKEN || "", { expiresIn: "2m" });

  return refreshToken;
};

export { signAccessToken, signRefreshToken };
