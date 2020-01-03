const express = require("express");
const router = express.Router();
const User = require("../database/model/User");
const nodemailer = require("nodemailer");
const {
  sendMail,
  pinGenerator,
  previewUrl
} = require("../middleware/middleware");

router.route("/:id").get((req, res) => {
  console.log("in", req.params.id);
  User.findAll({ where: { pin: req.params.id } })
    .then(function(user) {
      res.json(user);
    })
    .catch(err => {
      console.log(err);
      res.status(400).json({ message: "error" });
    });
});

router.route("/add").post((req, res) => {
  const username = req.body.username;
  const phoneNumber = req.body.phoneNumber;
  const email = req.body.email;
  const pin = pinGenerator();

  const newUser = {
    username,
    phoneNumber,
    email,
    pin
  };

  User.create(newUser)
    .then(user => {
      sendMail(user)
        .then(url => {
          const userDetails = {
            previewUrl: url || null,
            ...newUser
          };
          res.json(userDetails);
        })
        .catch(err => console.log(err));
    })
    .catch(err => {
      console.log(err);
      res.status(400).json({ message: "error" });
    });
});

module.exports = router;
