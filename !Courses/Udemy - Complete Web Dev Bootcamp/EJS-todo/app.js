const express = require("express");
const bodyParser = require("body-parser");

// Can add custom modules (useful for code refactoring)
// Will have access to anything we have bound with module.exports
const date = require(__dirname + "/date.js");

const app = express();

// const array: can push new items but can't reassign entire array
const items = ["Buy Food", "Cook Food", "Eat Food"]; // Will store ToDo text inputs
const workItems = [];

// EJS is set as the view engine of the Express server
// EJS will by default look in 'views' folder for views to render
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

// Get response for home page
app.get("/", function(req, res) {

  // Calling function bound to constant date (exports.getDate)
  const todayDate = date.getDate();

  // Every time you call res.render() you must pass all variables
  res.render("list", {
    listTitle: todayDate,
    newListItem: items
  });
});

// Get response for /work page
app.get("/work", function(req, res) {
  res.render("list", {
    listTitle: "Work List",
    newListItem: workItems
  });
});

app.get("/about", function(req, res) {
  res.render("about");
});

// Passing data from webpage back to server
app.post("/", function(req, res) {
  const item = req.body.todoInput;

  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/"); // Redirecting instead of calling res.render() again
  }
});

// Port listener
app.listen(3000, function() {
  console.log("Server is running on port 3000.");
});
