"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUser = exports.CheckAuth = exports.ResetPassword = exports.ForgotPassword = exports.LogOut = exports.VerifyEmail = exports.LogIn = exports.SignUp = void 0;
const UserModel_1 = __importDefault(require("../models/UserModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const crypto_1 = __importDefault(require("crypto"));
const generateVerificationCode_1 = require("../utils/generateVerificationCode");
const generateToken_1 = require("../utils/generateToken");
const sendEmail_1 = require("../nodemailer/sendEmail");
const registerOtp_1 = require("../emailpages/registerOtp");
const welcome_1 = require("../emailpages/welcome");
const imageUpload_1 = __importDefault(require("../utils/imageUpload"));
const resetPasswordOtp_1 = require("../emailpages/resetPasswordOtp");
const SignUp = async (req, res) => {
    try {
        const { fullName, email, password, number } = req.body;
        const user = await UserModel_1.default.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: "User Already Exist..",
                success: false,
                error: true,
            });
        }
        // hashing password using bcrypt : )
        const salt = await bcrypt_1.default.genSalt(10);
        const hashedPassword = await bcrypt_1.default.hash(password, salt);
        const verificationToken = (0, generateVerificationCode_1.generateVerificationCode)();
        const newUser = await UserModel_1.default.create({
            fullName,
            email,
            password: hashedPassword,
            number: Number(number),
            verificationToken,
            verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
        });
        (0, generateToken_1.generateToken)(res, newUser);
        await (0, sendEmail_1.sendingMail)(email, `OTP for Email Verification`, `Hello!! ${fullName}, Welcome to Our Restaurant :)`, (0, registerOtp_1.registerOtpPage)(verificationToken, fullName));
        const userWithoutPassword = await UserModel_1.default
            .findOne({ email })
            .select("-password");
        return res.status(201).json({
            success: true,
            error: false,
            message: "Account created successfully..",
            userData: userWithoutPassword,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            error: true,
            message: error.message || "Faild to signUp",
        });
    }
};
exports.SignUp = SignUp;
const LogIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel_1.default.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "User not found..",
                error: true,
                success: false,
            });
        }
        const isPasswordMatch = await bcrypt_1.default.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Please enter a valid Password..",
                error: true,
                success: false,
            });
        }
        user.lastLogin = new Date();
        await user.save();
        const userWithoutPassword = await UserModel_1.default
            .findOne({ email })
            .select("-password");
        (0, generateToken_1.generateToken)(res, userWithoutPassword);
        return res.status(200).json({
            message: `Welcome back ${user.fullName}..`,
            success: true,
            error: false,
            userData: userWithoutPassword,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            error: true,
            message: error.message || "Faild to signUp",
        });
    }
};
exports.LogIn = LogIn;
const VerifyEmail = async (req, res) => {
    try {
        const { verificationCode } = req.body;
        const user = await UserModel_1.default
            .findOne({
            verificationToken: verificationCode,
            verificationTokenExpiresAt: { $gt: Date.now() },
        })
            .select("-password");
        if (!user) {
            return res.status(400).json({
                success: false,
                error: true,
                message: "Invalid or expired verification Token",
            });
        }
        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpiresAt = undefined;
        await user.save();
        // Sending welcome email :)
        await (0, sendEmail_1.sendingMail)(user.email, `Great Welcome :)`, `Hello!! ${user.fullName}, Welcome to Our Restaurant :)`, (0, welcome_1.welcomeEmailPage)());
        // await sendWelcomeEmail(user.email,user.fullName)
        return res.status(200).json({
            success: true,
            error: false,
            message: "Email verified successfully..",
            userData: user,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            error: true,
            message: error.message || "Faild to signUp",
        });
    }
};
exports.VerifyEmail = VerifyEmail;
const LogOut = async (req, res) => {
    try {
        res.clearCookie("myToken", {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
        });
        return res.status(200).json({
            success: true,
            error: false,
            message: "Logged out successfully..",
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            error: true,
            message: error.message || "Faild to Logout",
        });
    }
};
exports.LogOut = LogOut;
const ForgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await UserModel_1.default.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "User not exist..",
                success: false,
                error: true,
            });
        }
        const resetToken = crypto_1.default.randomBytes(40).toString("hex");
        const resetTokenExpiresAt = new Date(Date.now() + 1 * 60 * 60 * 1000);
        user.resetPasswordToken = resetToken;
        user.resetPasswordTokenExpiresAt = resetTokenExpiresAt;
        await user.save();
        // send mail to reset password :)
        await (0, sendEmail_1.sendingMail)(user.email, `Reset Your Password`, `Reset Password link is generated below, Please click it to reset `, (0, resetPasswordOtp_1.ResetPasswordOtpPage)(`${process.env.FRONTED_URL}/resetpassword/${resetToken}`));
        return res.status(200).json({
            message: "Password reset Link is sent to your email",
            success: true,
            error: false,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            error: true,
            message: error.message || "Internal server error..",
        });
    }
};
exports.ForgotPassword = ForgotPassword;
const ResetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { newPassword } = req.body;
        const user = await UserModel_1.default.findOne({
            resetPasswordToken: token,
            resetPasswordTokenExpiresAt: { $gt: Date.now() },
        });
        if (!user) {
            return res.status(400).json({
                success: false,
                error: true,
                message: "Invalid or expired verification token",
            });
        }
        const salt = await bcrypt_1.default.genSalt(10);
        const hashedPassword = await bcrypt_1.default.hash(newPassword, salt);
        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordTokenExpiresAt = undefined;
        await user.save();
        // Send success reset Email :)
        // await sendResetPasswordSuccessEmail(user.email);
        return res.status(200).json({
            success: true,
            error: false,
            message: "Password reset successfully..",
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            error: true,
            message: error.message || "Internal server error..",
        });
    }
};
exports.ResetPassword = ResetPassword;
const CheckAuth = async (req, res) => {
    try {
        const userId = req.id;
        const user = await UserModel_1.default.findById(userId).select("-password");
        if (!user) {
            return res.json({
                success: false,
                error: true,
                message: "Please Login..",
            });
        }
        return res.status(200).json({
            success: true,
            error: false,
            userData: user,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            error: true,
            message: error.message || "Internal server error..",
        });
    }
};
exports.CheckAuth = CheckAuth;
const UpdateUser = async (req, res) => {
    try {
        const userId = req.id;
        const { fullName, email, address, city, country, profilePicture, state, pincode, } = req.body;
        const file = req.file;
        if (file) {
            const imageUrl = await (0, imageUpload_1.default)(file);
            const updatedData = {
                fullName,
                email,
                address,
                city,
                country,
                state,
                pincode,
                profilePicture: imageUrl,
            };
            const updatedUser = await UserModel_1.default
                .findByIdAndUpdate(userId, updatedData, { new: true })
                .select("-password");
            return res.status(200).json({
                success: true,
                error: false,
                message: "Profile Updated Successfully..",
                updatedUser,
            });
        }
        else {
            const updatedData = {
                fullName,
                email,
                address,
                city,
                country,
                state,
                pincode,
            };
            const updatedUser = await UserModel_1.default
                .findByIdAndUpdate(userId, updatedData, { new: true })
                .select("-password");
            return res.status(200).json({
                success: true,
                error: false,
                message: "Profile Updated Successfully..",
                updatedUser,
            });
        }
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            error: true,
            errorOccur: error,
            message: error.message || "Internal server error..",
        });
    }
};
exports.UpdateUser = UpdateUser;
