import bcrypt from 'bcrypt';
import crypto from 'crypto';
import User from '../models/user.js';
import transporter, {
  buildResetEmail,
  buildSignupEmail,
  buildTestEmail,
} from "../helpers/email.js";
import { generateJwt } from '../helpers/generateToken.js'; // Assuming this function uses crypto for JWT

const registerUser = async ({ email, phoneNumber, password }) => {
  const hashedPassword = await bcrypt.hash(password, 10);


  const emailContent = buildSignupEmail(email);
  const info = await transporter.sendMail(emailContent);
  return await User.create({
    email: email || null, // Handle the case where only phone number is provided
    phoneNumber: phoneNumber || null, // Handle the case where only email is provided
    password: hashedPassword,
    role: "user"
  });
};

const registerAdmin = async ({ email, phoneNumber, password }) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const emailContent = buildSignupEmail(email);
  const info = await transporter.sendMail(emailContent);
  return await User.create({
    email: email || null, // Handle the case where only phone number is provided
    phoneNumber: phoneNumber || null, // Handle the case where only email is provided
    password: hashedPassword,
    role: "admin"
  });
};


// Login User
const login = async ({ email, phoneNumber, password }) => {
  let query = {};
  if (email) {
    query.email = email;
  } else if (phoneNumber) {
    query.phoneNumber = phoneNumber;
  } else {
    throw new Error('Email or phone number is required');
  }
  console.log(query)
  const user = await User.findOne(query);

  if (!user) {
    throw new Error('User not found');
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Invalid credentials');
  }
  const jwtToken = await generateJwt({ userId: user._id, role: user.role });

  return { user, token: jwtToken };
}

export default { registerUser, registerAdmin, login };

