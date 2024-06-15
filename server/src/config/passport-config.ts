import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { db } from "./db";
import { IUser } from "../models/user.model";

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user: any, done) => {
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      clientID: process.env.GOOGLE_AUTH_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_AUTH_CLIENT_SECRET || "",
    },
    async (accessToken, refreshToken, profile, done) => {
      const userByEmail = await db.user.findUnique({
        where: {
          email: profile._json.email,
        },
      });

      if (userByEmail) {
        return done(null, userByEmail);
      }

      const userById = await db.user.findUnique({
        where: {
          id: profile.id,
        },
      });

      if (userById) {
        return done(null, userById);
      }

      const user = await db.user.create({
        data: {
          id: profile.id,
          email: profile._json.email || "User " + Math.floor(Math.random() * 50000),
          name: profile.displayName,
          picture: profile._json.picture || "http://localhost:5000/public/assets/default_picture.png",
          provider: "google",
        },
      });

      done(null, user);
    },
  ),
);
