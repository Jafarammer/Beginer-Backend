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

module.exports = { addUserModel };
