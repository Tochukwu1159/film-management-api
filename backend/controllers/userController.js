import userService from '../services/userService.js';
import { updateUserSchema, passwordSchema } from '../validator/userValidators.js'; // Adjust imports if necessary

const updateUser = async (req, res) => {
  const { error } = updateUserSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    const updatedUser = await userService.updateUser(req.user.payload.userId, req.body);
    res.status(200).json({ message: 'User updated successfully', user: updatedUser });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getUserDetails = async (req, res) => {
  try {
    const user = await userService.getUserDetails(req.user.payload.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    console.log(user)
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const { page, limit } = req.query; // Extract pagination parameters from query
    const result = await userService.getAllUsers(page, limit);
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const result = await userService.deleteUser(req.params.id);
    if (!result) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const forgetPassword = async (req, res) => {
  const { identifier } = req.body; // Use `identifier` for email or phone number
  try {
    await userService.forgetPassword(identifier);
    res.status(200).json({ message: 'Password reset link sent to your email or phone' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;
  try {
    await userService.resetPassword(token, newPassword);
    res.status(200).json({ message: 'Password reset successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const editPassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const { error } = passwordSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    await userService.editPassword(req.user.payload.userId, oldPassword, newPassword);
    res.status(200).json({ message: 'Password updated successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
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
