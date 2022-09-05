const db = require("../../config/db");

// All users
const getAllUsers = () => {
  return new Promise((resolve, rejects) => {
    db.query("SELECT * FROM users ORDER BY id DESC", (error, result) => {
      if (error) {
        rejects(error);
      } else {
        resolve(result);
      }
    });
  });
};
// Users by id
const getUserId = (id) => {
  return new Promise((resolve, rejects) => [
    db.query("SELECT * FROM users WHERE id = $1", [id], (error, result) => {
      if (error) {
        rejects(error);
      } else {
        resolve(result);
      }
    }),
  ]);
};
// Users by name
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
// Users by email
const getUsersEmail = (email) => {
  return new Promise((resolve, rejects) => [
    db.query(
      "SELECT * FROM users WHERE email LIKE $1",
      [`%${email}%`],
      (error, result) => {
        if (error) {
          rejects(error);
        } else {
          resolve(result);
        }
      }
    ),
  ]);
};

// Pagination
const getModelPage = (page, size) => {
  return new Promise((resolve, rejects) => {
    db.query(
      "SELECT * FROM users ORDER BY id ASC LIMIT $2 OFFSET (($1 - 1) * $2)",
      [page, size],
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

// masih tidak paham
const getSort = () => {
  return new Promise((resolve, rejects) => {
    db.query(
      "SELECT * FROM users ORDER BY id ASC",
      [sortType],
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

module.exports = {
  getAllUsers,
  getUsersName,
  getUserId,
  getUsersEmail,
  getModelPage,
  getSort,
};
