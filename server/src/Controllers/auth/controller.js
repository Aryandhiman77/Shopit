import AsyncWrapper from "../../Helpers/AsyncWrapper.js";
import bcrypt from "bcryptjs";
import User from "../../Models/user.js";
import { customAlphabet } from "nanoid";
import ApiResponse from "../../Helpers/ApiResponse.js";
import ApiError from "../../Helpers/ApiError.js";

export const registerAsAdmin = AsyncWrapper(async (req, res) => {
  const { name, email, password, phoneNumber } = req.body;

  const UUID = customAlphabet("1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ", 20)();
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email,
    phoneNumber,
    password: hash,
    UUID: UUID,
  });

  if (user) {
    res
      .status(200)
      .json(new ApiResponse(200, user, "Admin Created Successfully."));
  }
});

export const loginController = AsyncWrapper(async (req, res) => {
  const { email, UUID, phoneNumber, password, role } = req.data;
  console.log(req.data);

  //1. GET THE USER  FROM DB and return if blocked or user not found
  const user = await User.findOne({
    $or: [{ email }, { UUID }, { phoneNumber }],
  });
  if (user.accountStatus === "blocked") {
    return res
      .status(400)
      .json(
        new ApiError(400, "Login unsuccessfull.", "Your account is blocked.")
      );
  }
  if (!user) {
    return res
      .status(404)
      .json(new ApiError(404, "Login unsuccessfull.", "User not found."));
  }
  //2. COMPARE THE PASSWORD USING BCRYPTJS WITH HASH STORED IN DB
  const isTrueUser = await bcrypt.compare(password, user.passwordHash);
  if (!isTrueUser) {
    return res
      .status(400)
      .json(new ApiError(400, "Login unsuccessfull.", "Invalid Credentials."));
  }
  //3. GENERATE AUTH TOKENS AND STORE REFRESH TOKEN IN DB
  const authToken = await user.generateAuthToken({ userId: user.id, role });
  const refreshToken = await user.generateRefreshToken({
    userId: user.id,
    role,
  });
  const tokensGenerated = Promise.all([authToken, refreshToken]);
  if (!tokensGenerated) {
    return res
      .status(400)
      .json(
        new ApiError(
          400,
          "Login unsuccessfull.",
          "Please try logging in again."
        )
      );
  }
  user.refreshToken = refreshToken;

  // 4. INCREASE LOGIN COUNT, SAVE USER IN DB
  user.loginCount = user.loginCount + 1;
  const saved = await user.save();

  // 5 . DELETE INTERNAL DETAILS AND RETURN THE USER DETAILS TO CLIENT

  if (!saved) {
    return res
      .status(400)
      .json(
        new ApiError(
          400,
          "Login unsuccessfull.",
          "Cannot login due to some technical issue."
        )
      );
  }
  const savedUser = {
    UUID: saved.UUID,
    name: saved.name,
    email: saved.email,
    loginCount: saved.loginCount,
    refreshToken: saved.refreshToken,
    phoneNumber: saved.phoneNumber,
  };
  return res
    .status(200)
    .json(new ApiResponse(200, savedUser, "Login successfull."));
});
