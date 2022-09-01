const model = require("../../model/users/usresModel");

const addUser = async (req, res) => {
  try {
    const { name, email, phoneNumber, password, photo } = req.body;
    const getData = await model.addUserModel({
      name,
      email,
      phoneNumber,
      password,
      photo,
    });
    if (getData) {
      res.status(200).send("Data added successfully");
    } else {
      res.status(400).send("Data failed to add!!!");
    }
  } catch (error) {
    res.status(400).send("Any error!!!");
  }
};

module.exports = { addUser };
