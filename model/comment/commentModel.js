const db = require("../../config/db");

const addCommentModel = (props) => {
  return new Promise((resolve, rejects) => {
    db.query(
      "INSERT INTO comment(username,message,user_id)VALUES($1,$2,$3)",
      [props.username, props.message, props.user_id],
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

module.exports = { addCommentModel };
