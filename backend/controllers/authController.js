import { registerSchema, loginSchema } from '../validator/authValidators.js';
import authService from '../services/authService.js';
import User from '../models/user.js';
import { findUserByEmail } from '../helpers/auth.js';

const register = async (req, res) => {
  const { error } = registerSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
console.log("tyvtfyf", req.body.email)
  try {
    const existingUser = await findUserByEmail(req.body.email);
    console.log(existingUser)
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }
    const user = await authService.register(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const login = async (req, res) => {
  const { error } = loginSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    const { user, token } = await authService.login(req.body);
    res.json({ user, token });
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

export default { register, login };
