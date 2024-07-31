import User from "../models/user.js";

const updateUser = async (userId, updateData) => {
  return await User.update(updateData, { where: { id: userId } });
};

const getUserDetails = async (userId) => {
  return await User.findByPk(userId);
};

export default { updateUser, getUserDetails };
