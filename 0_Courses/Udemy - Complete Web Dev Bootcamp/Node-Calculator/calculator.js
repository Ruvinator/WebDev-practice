//jshint esversion:6

// requiring is like including packages
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
// can also parse to text and json but this is used for HTML
// {extended: true} allows us to post nested objects (required for body-parser)
app.use(bodyParser.urlencoded({extended: true}));

// Responders
app.get("/", function(req, res) {
  // Sends an entire HTML webpage
  // Directory must be absolute (for when server is deployed)
  // __dirname returns directory of current file
  res.sendFile(__dirname + "/index.html");
});

app.get("/bmicalculator", function(req, res) {
  res.sendFile(__dirname + "/bmiCalculator.html");
});

// Listeners
app.listen(3000, function() {
  console.log("Server started on port 3000");
});

// post() method used to handle post requests
// HTTP request data now found in req.body (.num1, .num2 - naming from HTML)
app.post("/", function(req, res) {
  // Calculation using posted numbers
  var num1 = Number(req.body.num1);
  var num2 = Number(req.body.num2);

  res.send("The result of the calculation is " + (num1 + num2));
});

app.post("/bmicalculator", function(req, res) {
  // Calculation using posted numbers
  var weight = Number(req.body.weight);
  var height = Number(req.body.height);

  res.send("The calculated BMI is " + (weight / Math.pow(height, 2)).toFixed(1));
});




// body-parser was installed and used for parsing data received from post
