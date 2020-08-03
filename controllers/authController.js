const express = require("express");
const router = express.Router({ mergeParams: true });
const passport = require("passport");
const bcrypt = require("bcryptjs");
const User = require("../model/user");
const validateRegister = require("../validation/registerValidation");
module.exports = {
  renderLogin: async (req, res, next) => {
    try {
      res.render("admin/login");
    } catch (error) {
      console.log("error", error);
      res.statu(500).json("server error!");
    }
  },
  registerAdmin: async (req, res, next) => {
    try {
      //VALIDATION
      let { errors, isValid } = validateRegister(req.body);
      if (!isValid) {
        return res.status(401).json(errors);
      }
      User.findOne({ email: req.body.email }).then((user) => {
        if (user) {
          errors.email = "The email alredy exist";
          return res.status(401).json(errors);
        } else {
          const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
          });
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) console.log("err", err);
              newUser.password = hash;
              newUser.save().then((user) => {
                res.json({ success: true });
                //res.redirect("/register");
              });
            });
          });
        }
      });
    } catch (error) {
      console.log("error", error);
      res.status.json("server error!");
    }
  },
  //logout
  logout: async (req, res, next) => {
    try {
      req.logout();
      req.flash("success", "Logged you out!");
      res.redirect("/");
    } catch (error) {
      console.log("error", error);
      res.status(500).json("server error!");
    }
  },
};
