const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://balti:7PtOtYjVYLqL8nep@cluster0-ztgsd.mongodb.net/test?retryWrites=true&w=majority",
  { useUnifiedTopology: true }
);

module.exports = mongoose;
