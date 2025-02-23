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
      return res.status(401).json({ message: "Email və ya şifrə yanlışdır!" });
    }

    // Token oluştururken, kullanıcı ID'sini (user._id) de ekliyoruz
    const token = jwt.sign(
      {
        userId: user._id, // Burada userId'yi ekliyoruz
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" } // Token süresi
    );

    res.status(200).json({
      message: "Giriş başarılı!",
      user,
      token, // Token'ı yanıt olarak döndürüyoruz
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { register, login };
