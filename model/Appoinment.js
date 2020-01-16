const mongoose = require("mongoose");

const appoinmentSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true
  },
  user_name: String,
  address: String,
  appoinment_time: {
    type: Date,
    required: true
  },
  appoinment_date: {
    type: Date,
    required: true
  },
  status: {
    type: String
  }
});

const Appoinment = mongoose.model("Appoinment", appoinmentSchema);

module.exports = Appoinment;
