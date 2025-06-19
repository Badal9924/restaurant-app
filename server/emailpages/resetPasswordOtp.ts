export function ResetPasswordOtpPage(token: any) {
  return `
        <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset token </title>
</head>
<body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4;">
    <div style="background-color: #ffffff; width: 100%; max-width: 600px; margin: 0 auto; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);">
        <div style="background-color: #007bff; padding: 20px; text-align: center; color: #ffffff;">
            <h1 style="margin: 0; font-size: 24px;">Password Reset Request</h1>
        </div>
        <div style="padding: 30px; text-align: center;">
            <p style="font-size: 16px; color: #333333; line-height: 1.5;">Hello,</p>
            <p style="font-size: 16px; color: #333333; line-height: 1.5;">You have requested to reset your password. Use the click the Link below to proceed:</p>
            <div style="font-size: 24px; font-weight: bold; color: #007bff; background-color: #f0f0f0; padding: 10px; margin: 20px auto; width: 200px; border-radius: 5px; letter-spacing: 5px;">
           
                <a href="${token}" style="color: white; background-color: #4CAF50; padding: 10px 15px; text-decoration: none; border-radius: 5px;">
    Reset Password
  </a>
            </div>
            <p style="font-size: 16px; color: #333333; line-height: 1.5;">If you did not request this, please ignore this email.</p>
        </div>
        <div style="background-color: #f4f4f4; padding: 20px; text-align: center; font-size: 14px; color: #888888;">
            <p>Thank you,<br>The Foomato Team</p>
        </div>
    </div>
</body>
</html>
 `;
}
