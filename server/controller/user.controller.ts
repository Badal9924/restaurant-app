import { Request, Response } from "express";
import userModel from "../models/UserModel";
import bcrypt from "bcrypt";
import crypto from "crypto";
import cloudinary from "../utils/Cloudinary";
import { generateVerificationCode } from "../utils/generateVerificationCode";
import { generateToken } from "../utils/generateToken";
import { sendingMail } from "../nodemailer/sendEmail";
import { registerOtpPage } from "../emailpages/registerOtp";
import { welcomeEmailPage } from "../emailpages/welcome";
import upLoadImageOnCloudinary from "../utils/imageUpload";
import { ResetPasswordOtpPage } from "../emailpages/resetPasswordOtp";

export const SignUp = async (req: Request, res: Response) => {
  try {
    const { fullName, email, password, number } = req.body;
    const user = await userModel.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "User Already Exist..",
        success: false,
        error: true,
      });
    }

    // hashing password using bcrypt : )

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const verificationToken = generateVerificationCode();
    const newUser = await userModel.create({
      fullName,
      email,
      password: hashedPassword,
      number: Number(number),
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
    });

    generateToken(res, newUser);

    await sendingMail(
      email,
      `OTP for Email Verification`,
      `Hello!! ${fullName}, Welcome to Our Restaurant :)`,
      registerOtpPage(verificationToken, fullName)
    );

    const userWithoutPassword = await userModel
      .findOne({ email })
      .select("-password");

    return res.status(201).json({
      success: true,
      error: false,
      message: "Account created successfully..",
      userData: userWithoutPassword,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: true,
      message: error.message || "Faild to signUp",
    });
  }
};

export const LogIn = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "User not found..",
        error: true,
        success: false,
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Please enter a valid Password..",
        error: true,
        success: false,
      });
    }
    user.lastLogin = new Date();
    await user.save();

    const userWithoutPassword = await userModel
      .findOne({ email })
      .select("-password");

    generateToken(res, userWithoutPassword);

    return res.status(200).json({
      message: `Welcome back ${user.fullName}..`,
      success: true,
      error: false,
      userData: userWithoutPassword,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: true,
      message: error.message || "Faild to signUp",
    });
  }
};

export const VerifyEmail = async (req: Request, res: Response) => {
  try {
    const { verificationCode } = req.body;
    const user = await userModel
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
    await sendingMail(
      user.email,
      `Great Welcome :)`,
      `Hello!! ${user.fullName}, Welcome to Our Restaurant :)`,
      welcomeEmailPage()
    );

    // await sendWelcomeEmail(user.email,user.fullName)
    return res.status(200).json({
      success: true,
      error: false,
      message: "Email verified successfully..",
      userData: user,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: true,
      message: error.message || "Faild to signUp",
    });
  }
};

export const LogOut = async (req: Request, res: Response) => {
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
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: true,
      message: error.message || "Faild to Logout",
    });
  }
};

export const ForgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "User not exist..",
        success: false,
        error: true,
      });
    }

    const resetToken = crypto.randomBytes(40).toString("hex");
    const resetTokenExpiresAt = new Date(Date.now() + 1 * 60 * 60 * 1000);
    user.resetPasswordToken = resetToken;
    user.resetPasswordTokenExpiresAt = resetTokenExpiresAt;
    await user.save();

    // send mail to reset password :)
    await sendingMail(
      user.email,
      `Reset Your Password`,
      `Reset Password link is generated below, Please click it to reset `,
      ResetPasswordOtpPage(`${process.env.FRONTED_URL}resetpassword/${resetToken}`)
    );
    
    return res.status(200).json({
      message: "Password reset Link is sent to your email",
      success: true,
      error: false,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: true,
      message: error.message || "Internal server error..",
    });
  }
};

export const ResetPassword = async (req: Request, res: Response) => {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;
    const user = await userModel.findOne({
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

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
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
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: true,
      message: error.message || "Internal server error..",
    });
  }
};

export const CheckAuth = async (req: any, res: Response) => {
  try {
    const userId = req.id;
    const user = await userModel.findById(userId).select("-password");
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
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: true,
      message: error.message || "Internal server error..",
    });
  }
};

export const UpdateUser = async (req: any, res: Response) => {
  try {
    const userId = req.id;
    const {
      fullName,
      email,
      address,
      city,
      country,
      profilePicture,
      state,
      pincode,
    } = req.body;

    const file = req.file;

    if (file) {
      const imageUrl = await upLoadImageOnCloudinary(file);
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

      const updatedUser = await userModel
        .findByIdAndUpdate(userId, updatedData, { new: true })
        .select("-password");

      return res.status(200).json({
        success: true,
        error: false,
        message: "Profile Updated Successfully..",
        updatedUser,
      });
    } else {
      const updatedData = {
        fullName,
        email,
        address,
        city,
        country,
        state,
        pincode,
      };

      const updatedUser = await userModel
        .findByIdAndUpdate(userId, updatedData, { new: true })
        .select("-password");

      return res.status(200).json({
        success: true,
        error: false,
        message: "Profile Updated Successfully..",
        updatedUser,
      });
    }
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: true,
      errorOccur: error,
      message: error.message || "Internal server error..",
    });
  }
};