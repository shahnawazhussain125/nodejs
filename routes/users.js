const express = require("express");
const router = express.Router();
const Users = require("../model/Users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  const { email, password, full_name, type } = req.body;

  console.log("{ email, password, full_name }", {
    email,
    password,
    full_name,
    type
  });

  if (!validateEmail(email)) {
    res.status(500).send({ message: "Email is badly formated" });
    return;
  }

  if (password.length < 6) {
    res.status(500).send({ message: "Password must be at least 6 character" });
    return;
  }

  const response = await Users.find({ email: email });

  if (response.length) {
    res.status(500).send({ message: "This email is already registered!" });
    return;
  }

  const hash = hashPassword(password);

  const newUser = new Users({
    full_name,
    email,
    type,
    password: hash
  });

  newUser
    .save()
    .then(response => {
      console.log("response", response);
      //Generate Token
      const token = jwt.sign({ user: response }, "anySecretKey");

      res.send({
        user: {
          full_name,
          email,
          type,
          uid: response._id
        },
        token,
        message: "User registered successfully!"
      });
    })
    .catch(e => res.status(500).send({ message: e.message }));
});

router.post("/login", async (req, res) => {
  //Check Email
  let { email, password } = req.body;

  if (!validateEmail(email)) {
    res.status(500).send({ message: "Email is badly formated" });
    return;
  }

  const user = await Users.find({ email: email });

  if (!user.length) {
    res.status(500).send({ message: "User not found!" });
    return;
  }

  //Compare Password
  const passwordMatched = bcrypt.compareSync(password, user[0].password);

  if (!passwordMatched) {
    res.status(500).send({ message: "Incorrect Email/Password!" });
    return;
  }

  //Generate Token
  const token = jwt.sign({ user: user[0] }, "anySecretKey");
  res.send({ user: user[0], token });
});

function validateEmail(email) {
  let regx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return regx.test(email);
}

function hashPassword(password) {
  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(password, salt);

  return hash;
}

router.post("/test", (req, res) => {
  let { uid } = req.body;

  Users.findById(uid)
    .exec()
    .then(response => {
      console.log("response", response);
      res.send(response);
    })
    .catch(error => {
      console.log("Error", error);
    });
});

module.exports = router;
