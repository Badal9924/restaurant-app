import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  secure: true, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: "opbadal096@gmail.com",
    pass: "tsrzwzphfzhbmorq",
  },
});

export async function sendingMail(to:any, subject:any, text:any, html:any) {
  const info = await transporter.sendMail({
    from: "opbadal096@gmail.com",
    to,
    subject,
    text,
    html,
  });
}