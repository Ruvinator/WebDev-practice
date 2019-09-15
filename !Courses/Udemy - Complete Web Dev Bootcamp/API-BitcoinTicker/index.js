//jshint esversion: 6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));

// Port listener
app.listen(3000, function() {
  console.log("Server is running on port 3000.");
});

// Get route
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

// Post route to access data from user
app.post("/", function(req, res) {
  var crypto = req.body.crypto;
  var currency = req.body.currency;
  var url = "https://apiv2.bitcoinaverage.com/indices/global/ticker/";

  // Make HTTP request using 'request' package
  // Data is stored in the 'body' variable of callback function
  request(url + crypto + currency, function(error, response, body) {
    var data = JSON.parse(body);
    var price = data.last;

var currentDate = data.display_timestamp;

    // res.write is used if you want to send multiple things
    res.write("<p>The current date is " + currentDate + "</p>");
    res.write("<h1>The price of " + crypto + " is " + price.toFixed(2) + " " + currency + "</h1>");

    // res.send is the last command that should be executed (only send once)
    res.send();
  });
});
