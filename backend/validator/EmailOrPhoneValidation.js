import { Op } from 'sequelize';
import User from "../models/user.js";

export const findUserByEmailOrPhone = async (email, phoneNumber) => {
    return await User.findOne({
      where: {
        [Op.or]: [
          { email: email || null },
          { phoneNumber: phoneNumber || null },
        ],
      },
    });
};
