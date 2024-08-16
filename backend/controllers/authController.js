import { registerSchema, loginSchema } from '../validator/authValidators.js';
import authService from '../services/authService.js';
import { findUserByEmailOrPhone } from '../validator/EmailOrPhoneValidation.js';

const registerUser = async (req, res) => {
  const { error } = registerSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    const { email, phoneNumber } = req.body;
    console.log("fcfcfcfc")

    const existingUser = await findUserByEmailOrPhone(email, phoneNumber);
    if (existingUser) {
      return res.status(400).json({ message: 'Email or phone number already in use' });
    }
    const user = await authService.registerUser(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const registerAdmin = async (req, res) => {
  const { error } = registerSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    const { email, phoneNumber } = req.body;
    const existingUser = await findUserByEmailOrPhone(email, phoneNumber);
    if (existingUser) {
      return res.status(400).json({ message: 'Email or phone number already in use' });
    }
    const user = await authService.registerAdmin(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


const login = async (req, res) => {
  const { error } = loginSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    const { email, phoneNumber, password } = req.body;
    const { user, token } = await authService.login({ email, phoneNumber, password });
    res.json({ user, token });
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};


export default { registerUser, registerAdmin, login };
