import JWT from "jsonwebtoken";
import AsyncWrapper from "../Helpers/AsyncWrapper.js";
import User from "../Models/user.js";
import ApiError from "../Helpers/ApiError.js";

const tokenMiddleware = AsyncWrapper(async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json(new ApiError(401, "No Authentication provided."));
  }
  const decoded = JWT.verify(token, process.env.JWT_AUTH_SECRET);
  const user = await User.findById(decoded.userId);
  if (!user) {
    return res
      .status(404)
      .json(new ApiError(404, "Invalid credentials.", "User not found."));
  }
  req.user = user;
  next();
});
export default tokenMiddleware;
