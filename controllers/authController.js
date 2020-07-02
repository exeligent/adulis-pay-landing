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
      const { errors, isValid } = validateRegister(req.body);
      if (!isValid) {
        req.flash("error", Object.values(errors));
        return res.redirect("/register");
      }
      User.findOne({ email: req.body.email }).then((user) => {
        if (user) {
          req.flash("error", "The email alredy exist");
          return res.status(400).redirect("/register");
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
                req.flash(
                  "success",
                  newUser.name + " is registered successfully!"
                );
                res.json(user);
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
