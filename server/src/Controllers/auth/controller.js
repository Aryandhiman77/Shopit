import { AsyncWrapper } from "../../Helpers/AsyncWrapper.js";
import bcrypt from "bcryptjs";
import User from "../../Models/user.js";
import { customAlphabet } from "nanoid";

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
    res.json({ message: "admin created successfully." });
  }
});

export const loginController = AsyncWrapper(async (req, res) => {
  const { email, UUID, password, role } = req.body;
});
