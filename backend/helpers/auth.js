import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "../models/user.js";

dotenv.config();

const secretKey = process.env.JWT_KEY;
if (!secretKey) {
  throw new Error("JWT_KEY is not defined in the environment variables");
}

const generateJwt = (payload) => {
  return jwt.sign({ payload }, secretKey, { expiresIn: "24h" });
};

const hashPassword = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

const passwordCompare = (hashPassword, password) => {
  return bcrypt.compareSync(password, hashPassword);
};

const verifyToken = (token) => {
  return jwt.verify(token, secretKey);
};

const findUserByEmail = async (email) => {
  console.log(email)
  return await User.findOne({ where: { email } });
};

export { generateJwt, hashPassword, passwordCompare, verifyToken, findUserByEmail };




