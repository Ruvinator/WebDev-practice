//jshint esversion: 6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));

// Used to serve up static resources (CSS, images)
// All static files were placed in the 'public' folder
app.use(express.static("public"));

// Get response
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});

// Post
app.post("/", function(req, res) {
  var firstName = req.body.fname;
  var lastName = req.body.lname;
  var emailAddress = req.body.email;

  var data = {
    members: [{
      email_address: emailAddress,
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName,
      },
      status: "subscribed"
    }]
  };

  var jsonData = JSON.stringify(data);

  var options = {
    url: "https://us4.api.mailchimp.com/3.0/lists/eca2a0a871",
    method: "POST",

    // Used with request for authorization
    headers: {
      "Authorization": "igor1 21a0f20b6c5397eaef45ceb32700fcac-us4"
    },

    // Contains data we are actually posting
    body: jsonData
  };

  request(options, function(error, response, body) {
    if (error) {
      res.sendFile(__dirname + "/failure.html");
    } else {
      if (response.statusCode === 200) {
        res.sendFile(__dirname + "/success.html");
      } else {
        res.sendFile(__dirname + "/failure.html");
      }
    }
  });
});

app.post("/failure", function(req, res) {
  // Used to redirect the user to another page in website
  res.redirect("/");
});

// Port listener
app.listen(3000, function() {
  console.log("Server is running on port 3000.");
});


// API Key
// 21a0f20b6c5397eaef45ceb32700fcac-us4

// Audience ID
// eca2a0a871
