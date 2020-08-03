const express = require("express");
const app = express();
const expressSanitizer = require("express-sanitizer");
const session = require("express-session");
const flash = require("connect-flash");
const methodOverride = require("method-override");
const passport = require("passport");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
//mongose setup
/* mongoose
  .connect("mongodb://127.0.0.1/edufin", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err)); */

mongoose
  .connect(
    "mongodb://exeligent-shard-00-01-knapx.mongodb.net:27017,exeligent-shard-00-02-knapx.mongodb.net:27017/test?ssl=true&replicaSet=Exeligent-shard-0&authSource=admin&retryWrites=true&w=majority",
    {
      auth: {
        user: "sam",
        password: "9604040347",
      },
    }
  )
  .then(() => console.log("atlas db connected"))
  .catch((err) => {
    console.log("err", err);
  });

app.use(methodOverride("_method"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    secret: "Adulis is a life style",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
    /*  store: new MongoStore({ mongooseConnection: mongoose.connection }) */
  })
);

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
require("./services/passport");
//initializing routes

//AUTHENTICATION CHECK
app.use((req, res, next) => {
  res.locals.session = req.session; //setting session to a user
  res.locals.sessionID = req.sessionID;
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");

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
