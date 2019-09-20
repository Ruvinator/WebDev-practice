const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const lodash = require("lodash");
const mongoose = require("mongoose");

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/articlesDB");


// --------------------------------- Database ----------------------------------

// Schema for article documents
const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [1]
  },
  content: {
    type: String,
    required: [1]
  }
});

// Model based on schema
const Article = new mongoose.model("Article", articleSchema);


// ---------------------------------- Routing ----------------------------------

// Chaining route handlers for all articles
app.route('/articles')
  .get(function(req, res) {
    // GET route that fetches all articles
    Article.find({}, function(err, foundArticles) {
      if (!err) {
        res.send(foundArticles);
      }
    });
  })
  .post(function(req, res) {
    // POST rounte that accepts all articles
    // Can use Postman to send data to server for storage
    const newArticle = new Article({
      title: req.body.title, // Corresponding to name="title" (key)
      content: req.body.content // Corresponding to name="content" (key)
    });
    newArticle.save(function(err) {
      if (!err) {
        res.send("Successfully added new article.")
      } else {
        res.send(err);
      }
    });
  })
  .delete(function(req, res) {
    // DELETE route that deletes all articles
    Article.deleteMany({}, function(err) {
      if (!err) {
        res.send("Successfully deleted all articles.");
      } else {
        res.send(err);
      }
    })
  });

// Chaining route handlers for specific articles
app.route('/articles/:articleTitle')
  .get(function(req, res) {
    Article.findOne({
      title: req.params.articleTitle
    }, function(err, foundArticle) {
      if (foundArticle) {
        res.send(foundArticle);
      } else {
        res.send("No articles matching that title were found.");
      }
    });
  })
  .put(function(req, res) {
    Article.update({
      title: req.params.articleTitle
    }, {
      title: req.body.title,
      content: req.body.content
    }, {
      overwrite: true
    }, function(err) {
      if (!err) {
        res.send("Successfully updated article.");
      } else {
        res.send(err);
      }
    });
  })
  .patch(function(req, res) {
    Article.update({
      title: req.params.articleTitle
    }, {
      $set: req.body // Only update what client has sent
    }, function(err) {
      if (!err) {
        res.send("Successfully updated article.");
      } else {
        res.send(err);
      }
    });
  })
  .delete(function(req, res) {
    Article.deleteOne({
      title: req.params.articleTitle
    }, function(err) {
      if (!err) {
        res.send("Successfully deleted article.");
      } else {
        res.send(err);
      }
    });
  });

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
