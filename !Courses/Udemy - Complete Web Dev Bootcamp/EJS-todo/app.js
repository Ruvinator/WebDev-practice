const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// Can add custom modules (useful for code refactoring)
// Will have access to anything we have bound with module.exports
const date = require(__dirname + "/date.js");

const app = express();

// EJS is set as the view engine of the Express server
// EJS will by default look in 'views' folder for views to render
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

// --------------------------------- Database ----------------------------------
// Connect to database
mongoose.connect("mongodb://localhost:27017/todolistDB");

const todoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [1]
  }
});

const Todo = mongoose.model("Todo", todoSchema);

// Documents for default todos
const todo1 = new Todo({
  name: "Buy food"
});

const todo2 = new Todo({
  name: "Cook food"
});

const todo3 = new Todo({
  name: "Eat food"
});

// --------------------------------- Browser -----------------------------------
// Get response for home page
app.get("/", function(req, res) {

  // Calling function bound to constant date (exports.getDate)
  const todayDate = date.getDate();

  // Access todos from database when home page is accessed
  Todo.find({}, function(err, todoItems) {
    if (err) {
      console.log(err);
    } else if (0 === todoItems.length) {
      // Insert default documents to collection only if database is empty
      Todo.insertMany([todo1, todo2, todo3], function(err) {
        if (err) {
          console.log(err);
        } else {
          console.log("Successfully saved all todo todos to todolistDB");
        }
      });
      // Refresh page after inserting items
      res.redirect("/");
    } else {
      res.render("list", {
        listTitle: todayDate,
        newListItems: todoItems
      });
    }
  });
});

app.get("/about", function(req, res) {
  res.render("about");
});

// Passing data from webpage back to server
app.post("/", function(req, res) {
  const itemName = req.body.todoInput;
  const newTodoItem = new Todo({
    name: itemName
  });
  newTodoItem.save();  // Saves in collection of todo items
  res.redirect("/");  // Refresh page to show new items
});

app.post("/delete", function(req, res) {
  const checkedItemId = req.body.checkbox;

  // Remove item that is checked off
  Todo.findByIdAndRemove(checkedItemId, function(err) {
    if (err) {
      console.log(err);
    }
  });
  res.redirect("/");  // Refresh page to show updated items
});

// Port listener
app.listen(3000, function() {
  console.log("Server is running on port 3000.");
});
