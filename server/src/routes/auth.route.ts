import { Router } from "express";
import passport from "passport";
import * as Controller from "../controllers/auth.controller";

const router: Router = Router();

router.post("/createUserWithEmail", Controller.createUserWithEmail);
router.post("/loginWithEmail", Controller.loginWithEmail);

router.post("/refreshToken", Controller.refreshToken);
router.post("/logout", Controller.logout);

router.get(
  "/loginWithGoogle",
  passport.authenticate("google", {
    scope: ["profile", "email "],
    //prompt: "select_account",
  }),
);

router.get("/google/callback", passport.authenticate("google", { session: false }), Controller.googleCallback);

export { router as AuthRouter };
