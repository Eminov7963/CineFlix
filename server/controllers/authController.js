const UserModel = require("../modules/userModel");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
require("dotenv").config();
const register = async (req, res) => {
  const { email, name, password } = req.body;
  try {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Bu email artıq istifadə edilib!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = UserModel({ ...req.body, password: hashedPassword });
    await newUser.save();
    res.status(201).json({
      message: "successfully registered!",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res
        .status(401)
        .json({ message: "email və ya password yanlışdır!" });
    }

    const token = jwt.sign(
      { email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );


    res.status(200).json({
      message: "login uğurla tamamlandı!",
      user,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = { register, login };
