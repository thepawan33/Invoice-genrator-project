if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}
const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");
const ExpressError = require("./utils/ExpressErr.js");
const session = require("express-session");
const flash = require("connect-flash");
const listsRoute = require("./routes/list.js");
const customersRoute = require("./routes/customer.js");
const userRoute = require("./routes/user.js");
const selfsRoute = require("./routes/self.js");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");
const MongoStore = require("connect-mongo");
const mongo_url = process.env.ATLASDB_URL;

main()
  .then(() => {
    console.log("connection done to database");
  })
  .catch((e) => {
    console.log(e);
  });
async function main() {
  await mongoose.connect(mongo_url);
}
const old = "mongodb://127.0.0.1:27017/invoice";
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.engine("ejs", ejsMate);
app.use(methodOverride("_method"));

const store = MongoStore.create({
  mongoUrl: mongo_url,
  touchAfter: 24 * 3600,
  crypto: {
    secret: process.env.SECRET,
  },
});

const sessionOptions = {
  store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
});

app.use("/list", listsRoute);
app.use("/customer", customersRoute);
app.use("/self", selfsRoute);
app.use("/", userRoute);

app.get("*", (req, res, next) => {
  next(new ExpressError(404, "Page Not Found!"));
});

app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Something went worng" } = err;
  res.status(statusCode).render("error.ejs", { message });
});

app.listen(8080, () => {
  console.log("server is on 8080");
});
