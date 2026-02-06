import ApiError from "../Helpers/ApiError.js";
export default function requireRole(role) {
  return async (req, res, next) => {
    if (req.user.role !== role) {
      return res
        .status(403)
        .json(new ApiError(403, "Access denied.", "Access denied."));
    }
    next();
  };
}

export function requestEitherAdminSeller() {
  console.log("requiring both");
  return async (req, res, next) => {
    if (!req.user.role.includes("seller") && !req.user.role.includes("admin")) {
      return res
        .status(403)
        .json(new ApiError(403, "Access denied.", "Access denied."));
    }
    next();
  };
}
