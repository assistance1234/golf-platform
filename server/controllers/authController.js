import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// ✅ NAMED EXPORT
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // ✅ check empty fields
    if (!name || !email || !password) {
      return res.status(400).json({ msg: "All fields required" });
    }

    // ✅ check duplicate email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // ✅ hash password
    const hash = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hash
    });

    res.json({
      msg: "User registered successfully",
      user
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Error in register" });
  }
};

// ✅ NAMED EXPORT
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ msg: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || "secret");

    res.json({ token, user });

  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Error in login" });
  }
};