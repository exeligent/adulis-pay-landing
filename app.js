const express = require("express");
const app = express();
const expressSanitizer = require("express-sanitizer");
const session = require("express-session");
const flash = require("connect-flash");
const methodOverride = require("method-override");
const passport = require("passport");

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
//initializing routes
app.use(methodOverride("_method"));

app.use(
  session({
    secret: "Adulis is a life style",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
    /*  store: new MongoStore({ mongooseConnection: mongoose.connection }) */
  })
);

//AUTHENTICATION CHECK
app.use((req, res, next) => {
  res.locals.session = req.session; //setting session to a user
  res.locals.sessionID = req.sessionID;
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  res.locals.error_form = req.flash("error_form");
  res.locals.success_form = req.flash("success_form");

  next();
});

//INTIALIZING ROUTES
const indexRoutes = require("./routes/index");
const userRoutes = require("./routes/user");
const dashboardRoutes = require("./routes/admin");

//ROUTE SETUP
app.use("/", indexRoutes);
app.use("/user", userRoutes);
app.use("/dashboard", dashboardRoutes);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Adulis server running at port ${port}`));
