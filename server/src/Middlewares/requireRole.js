import User from "../Models/user.js";
export function requireRole(role) {
  return async (req, res, next) => {
    if (req.user.role !== role) {
      return res.status(403).json(new ApiError(403, "Access denied."));
    }
    next();
  };
}
