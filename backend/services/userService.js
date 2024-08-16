import bcrypt from 'bcrypt';
import crypto from 'crypto';
import User from '../models/user.js'; // Import the Mongoose User model
import transporter, { buildResetEmail } from '../helpers/email.js';

// Update User
const updateUser = async (userId, updateData) => {
  console.log(userId, "min")
  return await User.findByIdAndUpdate(userId, updateData, { new: true }); // Return the updated document
};

// Get User Details
const getUserDetails = async (userId) => {
  return await User.findById(userId);
};

// Get User by ID
const getUserById = async (userId) => {
  return await User.findById(userId);
};

const getAllUsers = async (page = 1, limit = 10) => {
  // Validate page and limit
  page = parseInt(page, 10) || 1;
  limit = parseInt(limit, 10) || 10;
  const skip = (page - 1) * limit;

  // Fetch users with pagination
  const users = await User.find().skip(skip).limit(limit).exec();
  const totalUsers = await User.countDocuments(); // Count total documents

  return {
    totalUsers,
    totalPages: Math.ceil(totalUsers / limit),
    currentPage: page,
    users,
  };
};

// Delete User
const deleteUser = async (userId) => {
  return await User.findByIdAndDelete(userId);
};

// Forget Password
const forgetPassword = async (identifier) => {
  // Check if identifier is an email or phone number
  const user = await User.findOne({ $or: [{ email: identifier }, { phoneNumber: identifier }] });
  if (!user) throw new Error('User not found');
  
  const resetToken = crypto.randomBytes(32).toString('hex');
  user.resetToken = resetToken;
  user.resetTokenExpires = Date.now() + 3600000; // 1 hour expiration

  const url =`https://bottleup.com://reset-password?token=${resetToken}`

  const emailContent = buildResetEmail(user.email,user.firstname, url);
  const info = await transporter.sendMail(emailContent);

  await user.save();


};

// Reset Password
const resetPassword = async (token, newPassword) => {
  try {
    const user = await User.findOne({
      resetToken: token,
      resetTokenExpires: { $gt: Date.now() }, // Token should not be expired
    });

    if (!user) {
      throw new Error('Token is invalid or expired');
    }
    if (!newPassword) {
      throw new Error('New password is required');
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password
    user.password = hashedPassword;
    user.resetToken = undefined; // Clear the reset token
    user.resetTokenExpires = undefined; // Clear the expiration date

    // Save the user with the new password
    await user.save();

    return { message: 'Password reset successfully' };
  } catch (err) {
    throw new Error(err.message);
  }
};

// Edit Password
const editPassword = async (userId, oldPassword, newPassword) => {
  console.log(userId)
  const user = await User.findById(userId);
  if (!user) throw new Error('User not found');

  const isMatch = await bcrypt.compare(oldPassword, user.password);
  if (!isMatch) throw new Error('Incorrect old password');

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  user.password = hashedPassword;
  await user.save();
};

export default {
  updateUser,
  getUserDetails,
  getUserById,
  getAllUsers,
  deleteUser,
  forgetPassword,
  resetPassword,
  editPassword,
};
