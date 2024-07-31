import { updateUserSchema } from '../validator/userValidators.js';
import userService from '../services/userService.js';

const updateUser = async (req, res) => {
  const { error } = updateUserSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    await userService.updateUser(req.user.id, req.body);
    res.status(200).json({ message: 'User updated successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getUserDetails = async (req, res) => {
  try {
    const user = await userService.getUserDetails(req.user.id);
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export default { updateUser, getUserDetails };
