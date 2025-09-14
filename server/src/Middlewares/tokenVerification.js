import JWT, { decode } from "jsonwebtoken";
import AsyncWrapper from "../Helpers/AsyncWrapper.js";
import User from "../Models/user.js";
import ApiError from "../Helpers/ApiError.js";

const tokenVerification = AsyncWrapper(async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json(new ApiError(401, "No authorization provided."));
  }
  console.log(token);
  const decoded = JWT.verify(token, process.env.JWT_AUTH_SECRET);
  console.log(decoded);
  const user = await User.findById(decoded.userId);
  if (!user) {
    return res
      .status(404)
      .json(new ApiError(404, "Invalid credentials.", "User not found."));
  }
  req.user = user;
  next();
});
export default tokenVerification;
