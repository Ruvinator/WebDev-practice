//jshint esversion:6

const mongoose = require("mongoose");

// Port where MongoDB server can be accessed
// If it doesn't find DB we're searching for it creates it
// useNewUrlParser used to get rid of deprecation message
mongoose.connect("mongodb://localhost:27017/fruitsDB", {
  useNewUrlParser: true
});

// -----------------------------------------------------------------------------
//                                STORING DATA
// -----------------------------------------------------------------------------

// Create new schema using a JavaScript object
// Defining how data in a collection will be structured
const fruitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please name your fruits."]
  },
  // Can have built-in data validation
  rating: {
    type: Number,
    min: 0,
    max: 10
  },
  review: String
});

// Schema is used to create a mongoose model
// Mongoose automatically creates collection based on schema and model
// Mongoose uses model name to name the collection "fruits" (auto pluralizes)
const Fruit = mongoose.model("Fruit", fruitSchema);

// Create document from model (must stick to schema)
const fruit = new Fruit({
  name: "Apple",
  rating: 7,
  review: "Pretty solid as a fruit."
});

// Saves single fruit document into Fruits collection in fruitsDB
// fruit.save();

const kiwi = new Fruit({
  name: "Kiwi",
  rating: 10,
  review: "Awesome possum golden kiwis, yum."
});

const orange = new Fruit({
  name: "Orange",
  rating: 9,
  review: "Glass full of vitamins!"
});

const banana = new Fruit({
  name: "Banana",
  rating: 6,
  review: "Not so hot without peanut butter."
});

// Saves multiple fruit documents into Fruits collection in fruitsDB
// Fruit.insertMany([kiwi, orange, banana], function(err) {
//   if(err) {
//     console.log(err);
//   } else {
//     console.log("Successfully saved all fruits to fruitsDB");
//   }
// });

// Defining a person
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [1]
  },
  age: {
    type: Number,
    min: 0,
    max: 999
  },
  // Can establish relationships between databases using the schemas
  // Embeds an entire fruit document within this person document
  favoriteFruit: fruitSchema
});

const Person = mongoose.model("Person", personSchema);

const person = new Person({
  name: "Biljana",
  age: 21,
  favoriteFruit: kiwi
});

person.save();

// -----------------------------------------------------------------------------
//                               RETRIEVING DATA
// -----------------------------------------------------------------------------

// Callback function returns error msg and find results
Fruit.find(function(err, fruits) {
  if (err) {
    console.log(err);
  } else {
    fruits.forEach(function(fruit) {
      console.log(fruit.name);
    });
  }
});

// -----------------------------------------------------------------------------
//                                UPDATING DATA
// -----------------------------------------------------------------------------

Fruit.updateOne({
  _id: "5d818585b0e69e6a34401882"
}, {
  name: "Red Delicions Apple"
}, function(err) {
  if (err) {
    console.log(err);
  } else {
    // Close database connection when finished using
    // Since this is ASYNCHRONOUS, close connection only when no longer used
    mongoose.connection.close();

    console.log("Successfully updated the fruit.");
  }
});
