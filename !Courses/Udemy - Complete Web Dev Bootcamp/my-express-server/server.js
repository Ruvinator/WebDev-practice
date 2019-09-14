//jshint esversion:6

const express = require("express");

// Function that represents the Express module
// Good practice to use "app" as variable name
const app = express();

// What happens when a browser gets in touch with our server and makes a get request.
// Parameters: location ("/" is root/homepage), callback function
// req = request, res = response
app.get("/", function(req, res) {

  // Send response to browser
  res.send("<h1>Hello World!</h1>");
});

// Callbacks can be created for any desired route (specify scenarios):
app.get("/contact", function(req, res) {
  res.send("Contact me at: myemail@gmail.com");
});

app.get("/about", function(req, res) {
  res.send("This is my biography. My name is Igor and I own this website.");
});

// Listen for HTTP requests on a specific port
app.listen(3000, function() {
  console.log("Server started on port 3000");
});
