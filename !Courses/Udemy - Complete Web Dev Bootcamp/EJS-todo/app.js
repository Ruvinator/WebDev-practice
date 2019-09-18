const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");

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

// Schema for todo items
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

const defaultItems = [todo1, todo2, todo3];

// Schema for todo lists
const listSchema = new mongoose.Schema({
  name: String,
  todos: [todoSchema]
});

const List = mongoose.model("List", listSchema);


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
      Todo.insertMany(defaultItems, function(err) {
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

app.get("/:listName", function(req, res) {
  const customListName = _.capitalize(req.params.listName); // Name of user entered list

  List.findOne({
    name: customListName
  }, function(err, foundList) {
    if (!err) {
      if (!foundList) {
        const list = new List({
          name: customListName,
          todos: defaultItems // populate new list with default items
        });

        list.save();
        res.redirect("/" + customListName);
      } else {
        res.render("list", {
          listTitle: foundList.name,
          newListItems: foundList.todos
        });
      }
    }
  });
});

// Passing data from webpage back to server
app.post("/", function(req, res) {
  const itemName = req.body.todoInput;
  const pageName = req.body.list;

  const newTodoItem = new Todo({
    name: itemName
  });
  if (pageName === date.getDay() + ",") {
    // Default list
    newTodoItem.save(); // Saves in collection of todo items
    res.redirect("/"); // Refresh page to show new items
  } else {
    // Custom list
    List.findOne({
      name: pageName
    }, function(err, foundList) {
      foundList.todos.push(newTodoItem);
      foundList.save();
      res.redirect("/" + pageName);
    });
  }
});

app.post("/delete", function(req, res) {
  const checkedItemId = req.body.checkbox;
  const listName = req.body.listName;

console.log(listName);
  if (listName === date.getDate()) {
    // Default list
    // Remove item that is checked off
    Todo.findByIdAndRemove(checkedItemId, function(err) {
      if (err) {
        console.log(err);
      }
    });
    res.redirect("/"); // Refresh page to show updated items
  } else {
    // Custom list
    // Deleting todo item from todos array in list
    List.findOneAndUpdate({
      name: listName
    }, {
      $pull: {
        todos: {
          _id: checkedItemId
        }
      }
    }, function(err, foundList) {
      if (!err) {
        res.redirect("/" + listName);
      }
    });
  }
});

// Port listener
app.listen(3000, function() {
  console.log("Server is running on port 3000.");
});
