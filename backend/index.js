//////////////////////////////
// main js file    index.js

// Import required modules
const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");


//create connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "peralink"
});

// Create Express app
const app = express();

// Add body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Export Database connection to the routes
module.exports = db;

// routes
const login = require("./login")(db);    // route for login 
const signup = require("./signup")(db);  // route for signup
const additional_info = require("./additional_info")(db);  // route for additional account info
const search_friend = require("./search_friend")(db);      // route for search and view profiles of friends
const search_global = require("./search_global")(db);      // route for search and view profiles of any user
const post_feed = require("./post_feed")(db);              // route for post feed

// Use the routes
app.use("/login", login);
app.use("/signup", signup);
app.use("/additional_info", additional_info);
app.use("/search_friend", search_friend);
app.use("/search_global", search_global);
app.use("/post_feed",post_feed);




// Start the server
const port = 3010;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
