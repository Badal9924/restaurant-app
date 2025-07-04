import jwt from "jsonwebtoken";

export const generateToken = (res: any, user: any) => {
  const tokens = jwt.sign({ userId: user?._id }, process.env.SECRET_KEY!, {
    expiresIn: "1d",
  });

  res.cookie("myToken", tokens, {
    httpOnly: true,
    sameSite: "None",
    maxAge: 24 * 60 * 60 * 1000,
  });
  return tokens;
};