import dotenv from 'dotenv';
import jwt from "jsonwebtoken"
dotenv.config();

const secretKey = process.env.JWT_KEY;

export const generateJwt = (payload) => {
    console.log()
    return jwt.sign({ payload }, secretKey, { expiresIn: "24h" });
  };