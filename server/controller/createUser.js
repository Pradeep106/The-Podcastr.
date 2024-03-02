const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.createUser = async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    if (!userName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      userName,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    return res.status(201).json({
      success: true,
      newUser,
      message: "User registered successfully",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "User registration failed",
    });
  }
};

exports.login = async (req, res) => {
  try {
    // Get the user email and password from req.body
    const { email, password } = req.body;

    // Check if the user exists; if not, return an error
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(401)
        .json({ error: "User not found", errorType: "user_not_found" });
    }

    // Validate the user's password
    const SECRET_KEY = process.env.SECRET_KEY;

    if (await bcrypt.compare(password, user.password)) {
      //generating jwt
      const token = jwt.sign(
        { email: user.email, id: user._id, userName: user.userName },
        SECRET_KEY,
        {
          expiresIn: "24h",
        }
      );

      // Save the token to the user document in the database
      user.token = token;
      user.password = undefined;

      // Set cookie for token and return success response
      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };
      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        user,
        message: `User Login Success`,
      });
 
    } else {
      return res
        .status(401)
        .json({ error: "Incorrect password", errorType: "incorrect_password" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Login failure. Please try again.",
    });
  }
};
