const db = require("../../config/db");

const getAllComment = () => {
  return new Promise((resolve, rejects) => {
    db.query("SELECT * FROM comment ORDER BY id ASC", (error, result) => {
      if (error) {
        rejects(error);
      } else {
        resolve(result);
      }
    });
  });
};

module.exports = { getAllComment };
