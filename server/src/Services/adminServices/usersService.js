import User from "../../Models/user.js";
import ApiError from "../../Helpers/ApiError.js";
export const getUsers = async () => {
  const users = await User.find().select(
    "UUID name email phoneNumber role loggedInUserCount createdAt updatedAt loginAttempts accountStatus suspensionCount suspensionExpires verifiedEmail verifiedNumber",
  );
  return users;
};
