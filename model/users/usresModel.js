const db = require("../../config/db");

const addUserModel = (props) => {
  return new Promise((resolve, rejects) => {
    db.query(
      "INSERT INTO users(name,email,phoneNumber,password,photo) VALUES ($1,$2,$3,$4,$5)",
      [props.name, props.email, props.phoneNumber, props.password, props.photo],
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

const editUserModel = (props) => {
  return new Promise((resolve, rejects) => {
    db.query(
      "UPDATE users SET name = $1, email = $2, phoneNumber = $3, password = $4, photo = $5 WHERE id = $6 RETURNING *",
      [
        props.name,
        props.email,
        props.phoneNumber,
        props.password,
        props.photo,
        props.id,
      ],
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

// DELETE USERS
const deleteUserModel = (id) => {
  return new Promise((resolve, reject) => {
    db.query(`DELETE FROM users WHERE id = $1`, [id], (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};

module.exports = { addUserModel, editUserModel, deleteUserModel };
