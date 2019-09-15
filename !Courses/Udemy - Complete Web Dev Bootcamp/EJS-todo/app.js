const express = require("express");
const bodyParser = require("body-parser");

const app = express();

let items = ["Buy Food", "Cook Food", "Eat Food"];  // Will store ToDo text inputs

// EJS is set as the view engine of the Express server
// EJS will by default look in 'views' folder for views to render
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

// Get response
app.get("/", function(req, res) {

  let today = new Date();
  // Used to format the date
  let options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  };
  let day = today.toLocaleDateString("en-US", options);

  // IMRORTANT: Every time you call res.render() you must pass all variables
  res.render("list", {
    kindOfDay: day,
    newListItem: items
  });
});

// Passing data from webpage back to server
app.post("/", function(req, res) {
  let item = req.body.todoInput;
  items.push(item);
  res.redirect("/");  // Redirecting instead of calling res.render() again
});

// Port listener
app.listen(3000, function() {
  console.log("Server is running on port 3000.");
});
