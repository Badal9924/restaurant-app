"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendingMail = sendingMail;
const nodemailer_1 = __importDefault(require("nodemailer"));
const transporter = nodemailer_1.default.createTransport({
    host: "smtp.gmail.com",
    secure: true, // Use `true` for port 465, `false` for all other ports
    auth: {
        user: "opbadal096@gmail.com",
        pass: "tsrzwzphfzhbmorq",
    },
});
async function sendingMail(to, subject, text, html) {
    const info = await transporter.sendMail({
        from: "opbadal096@gmail.com",
        to,
        subject,
        text,
        html,
    });
}
