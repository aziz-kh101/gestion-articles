const bcrypt = require("bcrypt");

module.exports = {
  hashPassword: async (password) => {
    return await bcrypt.hash(password, 10);
  },

  verifPassword: async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
  },
};
