var passport = require("passport");
var User = require("../model/user");
const bcrypt = require("bcryptjs");
const validateLogin = require("../validation/loginValidator");

var LocalStrategy = require("passport-local").Strategy;

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

passport.use(
  "local.signin",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    function (req, email, password, done) {
      let { isValid, errors } = validateLogin(req.body);

      if (!isValid) {
        req.flash("error", Object.values(errors));
        return done(null, false);
      }
      User.findOne({ email: email }, function (err, user) {
        if (err) {
          console.log(err);
          return done(err);
        }
        const errors = {};
        if (!user) {
          errors.email = "user not found";
          return done(null, false, { message: "User not found!" });
        }
        //CHECK PASSWORD
        bcrypt.compare(password, user.password).then((isMatch) => {
          if (!isMatch) {
            errors.password = "Wrong password!";
            return done(null, false, { message: "Wrong password!" });
          } else {
            req.flash("success", "Welcome ", user.name);

            return done(null, user);
          }
        });
      });
    }
  )
);
