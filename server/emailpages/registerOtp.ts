export function registerOtpPage(otpCode:any,name:any) {
    return `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>OTP Verification</title>
  </head>
  <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
      <div style="width: 100%; max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
          <div style="background-color: #2980b9; color: #ffffff; text-align: center; padding: 20px; font-size: 24px;">
              OTP Verification
          </div>
          <div style="padding: 20px; color: #333333;">
              <h2 style="font-size: 20px; margin-top: 0;">Hello ${name},</h2>
              <p style="font-size: 16px; line-height: 1.5;">We received a request to verify your email address. Please use the OTP below to complete your verification:</p>
              <div style="font-size: 24px; font-weight: bold; text-align: center; margin: 20px 0; padding: 10px; background-color: #f0f0f0; border-radius: 5px;">
                  ${otpCode}
              </div>
              <p style="font-size: 16px; line-height: 1.5;">If you did not request this verification, please ignore this email.</p>
          </div>
          <div style="background-color: #f4f4f4; color: #777777; text-align: center; padding: 20px; font-size: 14px;">
              &copy; 2024 Foomato. All rights reserved.
          </div>
      </div>
  </body>
  </html>
  `;
  }