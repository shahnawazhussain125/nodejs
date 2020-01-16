const express = require("express");
const router = express.Router();

router.use("/users", require("./users"));
router.use("/patient", require("./patient"));
router.use("/doctors", require("./doctors"));

module.exports = router;
