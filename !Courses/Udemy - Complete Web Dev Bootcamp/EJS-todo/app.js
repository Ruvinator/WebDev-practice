const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// EJS is set as the view engine of the Express server
// EJS will by default look in 'views' folder for views to render
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));

var day = "";
var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

// Get response
app.get("/", function(req, res) {

  var today = new Date();
  day = days[today.getDay()];
  console.log(today);

  res.render("list", {
    kindOfDay: day
  });
});

// Port listener
app.listen(3000, function() {
  console.log("Server is running on port 3000.");
});
