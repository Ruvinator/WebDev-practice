//jshint esversion:6
require('dotenv').config();  // stores environment variables in .env file
const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const encrypt = require("mongoose-encryption");
const md5 = require('md5');

const app = express();

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));

mongoose.connect("mongodb://localhost:27017/userDB", {
  useNewUrlParser: true
});

const userSchema = new mongoose.Schema({
  email: String,
  password: String
});

// Add plugin to mongoose schema before defining model
// Mongoose will automatically be encrypting and decrypting on save and find
// If secret is found, anything can easily be decrypted
userSchema.plugin(encrypt, {
  secret: process.env.SECRET,  // calling .env variable
  encryptedFields: ["password"]  // want to search email so don't encrypt it
});

const User = new mongoose.model("User", userSchema);

// ----------------------- LEVEL 1 AUTHENTICATION ------------------------------

// Issue: we can see the user's password in plain text.
// Any employee can look through the database and find out anyone's password.
// A hacker would also have a field day.

app.get("/", function(req, res) {
  res.render("home");
});

app.get("/login", function(req, res) {
  res.render("login");
});

app.get("/register", function(req, res) {
  res.render("register");
});

app.post("/register", function(req, res) {
  const newUser = new User({
    email: req.body.username,
    password: md5(req.body.password)  // Hash password upon storage
  });

  newUser.save(function(err) {
    if (!err) {
      res.render("secrets");
    } else {
      console.log(err);
    }
  });
});

app.post("/login", function(req, res) {
  const username = req.body.username;
  const password = md5(req.body.password);  // Hash login password to compare

  User.findOne({
    email: username
  }, function(err, foundUser) {
    if (err) {
      console.log(err);
    } else {
      if (foundUser) {
        if (foundUser.password === password) {
          res.render("secrets");
        }
      }
    }
  })
});

app.listen(3000, function() {
  console.log("Server started on port 3000.");
});
