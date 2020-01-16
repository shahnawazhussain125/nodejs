const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
  full_name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  }
});

const Users = mongoose.model("Users", usersSchema);

module.exports = Users;
