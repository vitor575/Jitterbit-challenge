const db = require("../config/database");

const User = {
  findByUsername: async (username) => {
    const [rows] = await db.query("SELECT * FROM Users WHERE username = ?", [
      username,
    ]);
    return rows[0];
  },
};

module.exports = User;
