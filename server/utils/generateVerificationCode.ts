import otpGenerator from "otp-generator";
export const generateVerificationCode = () => {
  let verificationCode = otpGenerator.generate(6, {
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false
  });
  return verificationCode;
};