import User from "../models/User.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashPassword =await bcrypt.hash(password, 10);

    const user = User.create({
      name,
      email,
      password: hashPassword,
    });

    res.status(201).json({
      _id: user._id,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && bcrypt.compare(password, user.password)) {
      res.json({
        _id: user._id,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({
        message: "Invalid Credentials",
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
