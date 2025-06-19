import express from "express";
const router = express.Router();

import { CheckAuth, ForgotPassword, LogIn, LogOut, ResetPassword, SignUp, UpdateUser, VerifyEmail } from "../controller/user.controller";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import upload from "../middlewares/multer";

router.route("/check-auth").get(isAuthenticated, CheckAuth);
router.route("/signup").post(SignUp);
router.route("/login").post(LogIn);
router.route("/logout").post(LogOut);
router.route("/verifyEmail").post(VerifyEmail);
router.route("/forgotPassword").post(ForgotPassword);
router.route("/resetPassword/:token").post(ResetPassword);
router.route("/profile/update").patch(isAuthenticated,upload.single("profilePicture"),UpdateUser);

export default router;