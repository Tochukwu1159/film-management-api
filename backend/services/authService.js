import bcrypt from 'bcrypt';
import User from '../models/user.js';
import { generateJwt } from '../helpers/generateToken.js';

const register = async ({ name, email, password, dateOfBirth, address, role }) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return await User.create({ name, email, password: hashedPassword, dateOfBirth, address, role });
};

const login = async ({ email, password }) => {
  const user = await User.findOne({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error('Invalid credentials');
  }
  console.log(user.role)
  const token = await generateJwt({ userId: user.id, role: user.role });
  return { user, token };
};

export default { register, login };
