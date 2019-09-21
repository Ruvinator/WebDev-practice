//jshint esversion:6
require('dotenv').config(); // stores environment variables in .env file
const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const encrypt = require("mongoose-encryption");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");

const app = express();

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));

// Session setup must be placed here (before DB)
app.use(session({
  secret: "Our little secret.",
  resave: false,
  saveUninitialized: true
}));

// Passport setup right below session setup
app.use(passport.initialize());
app.use(passport.session()); // Use passport to deal with sessions

mongoose.connect("mongodb://localhost:27017/userDB", {
  useNewUrlParser: true
});
mongoose.set("useCreateIndex", true);

const userSchema = new mongoose.Schema({
  email: String,
  password: String
});

// Add plugin to mongoose schema before defining model
// Mongoose will automatically use passport to hash/salt passwords
userSchema.plugin(passportLocalMongoose);

const User = new mongoose.model("User", userSchema);


// Serialize: create cookie with authentication info
// Deserialize: destroy cookie with authentication info
passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/", function(req, res) {
  res.render("home");
});

app.get("/login", function(req, res) {
  res.render("login");
});

app.get("/register", function(req, res) {
  res.render("register");
});

// creating GET request for secrets since using sessions
app.get("/secrets", function(req, res) {
  // Make sure that user is authenticated
  // If they are not, redirect to login page
  if (req.isAuthenticated()) {
    res.render("secrets");
  } else {
    res.redirect("/login");
  }
});

app.get("/logout", function(req, res) {
  req.logout();  // Deauthenticate user
  res.redirect("/");
});

app.post("/register", function(req, res) {
  // Using passport-local-mongoose
  User.register({
    username: req.body.username
  }, req.body.password, function(err, user) {
    if (err) {
      console.log(err);
      res.redirect("/register");
    } else {
      passport.authenticate("local")(req, res, function() {
        // Only triggers if authentication is successful (cookie with session is setup)
        // Since they can only get here by being authenticated, we can redirect
        // the user to the secrets route rather than calling res.render()
        res.redirect("/secrets");
      });
    }
  })
});

app.post("/login", function(req, res) {
  const user = new User({
    username: req.body.username,
    password: res.body.password
  });

  // from passport
  req.login(user, function(err) {
    if (err) {
      console.log(err);
    } else {
      passport.authenticate("local")(req, res, function() {
        res.redirect("/secrets");
      });
    }
  });
});

app.listen(3000, function() {
  console.log("Server started on port 3000.");
});
