const db = require("../../config/db");
const userModel = require("../../model/userModel");

const getAllUsers = async (req, res) => {
  try {
    const getData = await userModel.userAllModel();
    res.send({
      data: getData.rows,
      totalData: getData.rowCount,
    });
  } catch (err) {
    res.status(400).send("Internal server error");
  }
};

const findUser = async (req, res) => {
  try {
    const { id } = req.body;
    const getData = await userModel.userFindModel(id);
    res.send({
      data: getData.rows,
      totalData: getData.rowCount,
    });
  } catch (err) {
    res.status(400).send("Internal server error");
  }
};

const addUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const addUser = await userModel.addUserModel({ name, email, password });

    if (addUser) {
      res.send("Data added successfully");
    } else {
      res.status(400).send("Data failed to add");
    }
  } catch (error) {
    console.log(`Errornya disini nih ${error}`);
    res.status(400).send("Internal server error");
  }
};

const editUser = async (req, res) => {
  try {
    const { name, email, password, id } = req.body;

    const getData = await userModel.userFindModel(id);

    if (getData.rowCount > 0) {
      let nameInput = name || getData?.rows[0]?.name;
      let emailInput = email || getData?.rows[0]?.email;
      let passInput = password || getData?.rows[0]?.password;

      const editDataUser = await userModel.editUserModel({
        name: nameInput,
        email: emailInput,
        password: passInput,
        id,
      });

      if (editDataUser) {
        res.send("Data changed successfully");
      } else {
        res.status(400).send("Data failed to change");
      }
    } else {
      res.status(400).send("Data not found");
    }
  } catch (error) {
    res.status(400).send("Internal server error");
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.body;

    // Check user by id
    const getData = await userModel.userFindModel(id);

    if (getData.rowCount > 0) {
      const deleteUser = await userModel.deleteUserModel(id);

      if (deleteUser) {
        res.send("Data deleted successfully");
      } else {
        res.status(400).send("Data failed to delete");
      }
    } else {
      res.status(400).send("Data not found");
    }
  } catch (error) {
    console.log(error);
    res.status(400).send("Internal server error");
  }
};

module.exports = { findUser, getAllUsers, addUser, editUser, deleteUser };
