const jwt = require("jsonwebtoken");
const user = require("../model/User");
require("dotenv").config();

exports.auth = async (req, res, next) => {
  try {
    //extracting json
    const token =
      req.cookies.token ||
      req.body.token ||
      req.header("Authorisation").replace("Bearer ", "");

    console.log("this is auth token", token);

    //if token missing, then return response
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token is missing",
      });
    }
    //varifying json
    try {
      const decode = jwt.verify(token, process.env.SECRET_KEY);
      console.log(decode);
      req.user = decode;
    } catch (err) {
      return res.status(401).json({
        success: false,
        message: "token is invalid",
      });
    }
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Something went wrong while validating the token",
    });
  }
};
