const express = require('express');
const Router = express.Router();
const {
  getAllUser,
  CreateUser,
  getUser,
  UpdateUser,
  DeleteUser,
} = require('./../Controllers/userController');
Router.route('/').get(getAllUser).post(CreateUser);
Router.route('/:id').get(getUser).patch(UpdateUser).delete(DeleteUser);

module.exports = Router;
