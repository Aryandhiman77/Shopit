import JWT, { decode } from "jsonwebtoken";
import AsyncWrapper from "../Helpers/AsyncWrapper.js";
import User from "../Models/user.js";
import ApiError from "../Helpers/ApiError.js";

const tokenVerification = AsyncWrapper(async (req, res, next) => {
  const token = req.cookies.authToken;
  console.log(token);
  if (!token) {
    throw new ApiError(401, "No authorization provided.");
  }
  const decoded = JWT.verify(token, process.env.JWT_AUTH_SECRET);
  const user = await User.findById(decoded.userId);
  if (!user) {
    new ApiError(404, "Invalid credentials.", "User not found.");
  }
  req.user = user;
  next();
});
export default tokenVerification;
