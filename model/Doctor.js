const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  registration_id: {
    type: String,
    required: true
  },
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String
  },
  phone_no: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  education: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  contact_no: {
    type: String,
    required: true
  },
  taxonomies: {
    type: [
      {
        code: String,
        desc: String,
        license: String
      }
    ],
    required: true
  },
  services: {
    type: [
      {
        name: String,
        rate: String
      }
    ],
    required: true
  },
  availibility: {
    type: {
      time: Date,
      days: [String]
    }
  }
});

const Doctors = mongoose.model("Doctors", doctorSchema);

module.exports = Doctors;
