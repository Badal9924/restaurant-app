"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const user_controller_1 = require("../controller/user.controller");
const isAuthenticated_1 = require("../middlewares/isAuthenticated");
const multer_1 = __importDefault(require("../middlewares/multer"));
router.route("/check-auth").get(isAuthenticated_1.isAuthenticated, user_controller_1.CheckAuth);
router.route("/signup").post(user_controller_1.SignUp);
router.route("/login").post(user_controller_1.LogIn);
router.route("/logout").post(user_controller_1.LogOut);
router.route("/verifyEmail").post(user_controller_1.VerifyEmail);
router.route("/forgotPassword").post(user_controller_1.ForgotPassword);
router.route("/resetPassword/:token").post(user_controller_1.ResetPassword);
router.route("/profile/update").patch(isAuthenticated_1.isAuthenticated, multer_1.default.single("profilePicture"), user_controller_1.UpdateUser);
exports.default = router;
