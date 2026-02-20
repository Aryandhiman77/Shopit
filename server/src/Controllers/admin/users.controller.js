import AsyncWrapper from "../../Helpers/AsyncWrapper.js";
import ApiResponse from "../../Helpers/ApiResponse.js";
import { getUsers } from "../../Services/adminServices/usersService.js";

export const getAllUsers = AsyncWrapper(async (req, res) => {
  const users = await getUsers();
  res.status(200).json(new ApiResponse(200, users, "Users found."));
});
