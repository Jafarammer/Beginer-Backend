const db = require("../../config/db");

const getAllUsers = () => {
  return new Promise((resolve, rejects) => {
    db.query("SELECT * FROM users ORDER BY id ASC", (error, result) => {
      if (error) {
        rejects(error);
      } else {
        resolve(result);
      }
    });
  });
};

const getUsersName = (name) => {
  return new Promise((resolve, rejects) => {
    db.query(
      "SELECT * FROM users WHERE name  LIKE $1",
      [`%${name}%`],
      (error, result) => {
        if (error) {
          rejects(error);
        } else {
          resolve(result);
        }
      }
    );
  });
};

module.exports = { getAllUsers, getUsersName };
