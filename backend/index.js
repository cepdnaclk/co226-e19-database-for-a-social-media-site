// Import required modules
const express = require("express");
const mysql = require("mysql");

//create connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "peralink",
});

// Create Express app
const app = express();

// Enable JSON request body parsing
app.use(express.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Define a route for user login
app.post("/login", (req, res) => {
  const { user_name, password } = req.body;

  // SQL query to fetch user from the database
  const query = `SELECT * FROM user WHERE user_name = ?`;

  // Execute the query
  db.query(query, [user_name], (error, results) => {
    if (error) {
      // Handle error
      console.error("Error fetching user:", error);
      res.status(500).json({ error: "Error fetching user" });
    } else {
      if (results.length === 0) {
        // User not found
        res.status(404).json({ error: "User not found" });
      } else {
        const user = results[0];

        if (user.password === password) {
          // Successful login
          res.status(200).json({ message: "Login successful" });
        } else {
          // Incorrect password
          res.status(401).json({ error: "Incorrect password" });
        }
      }
    }
  });
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////
// Define a route for user sign up
app.post("/signup", (req, res) => {
  const {
    user_name,
    email,
    password,
    confirmPassword,
    first_name,
    last_name,
    b_date,
    b_month,
    b_year,
    sex,
    profile_picture,
    location,
    affiliation,
    bio,
    user_interests,
  } = req.body;

  console.log(req.body);

  // Check if username is already taken
  const usernameQuery = `SELECT * FROM user WHERE user_name = ?`;

  db.query(usernameQuery, [user_name], (error, results) => {
    if (error) {
      // Handle error
      console.error("Error checking username:", error);
      res.status(500).json({ error: "Error checking username" });
    } else {
      if (results.length > 0) {
        // Username is already taken
        res.status(400).json({
          error: "Username is already taken. Please enter a different username",
        });
      } else {
        // Username is valid, proceed to store in the database
        // profilePic as link
        // location as google map link
        const addUserQuery = `INSERT INTO user (user_name, email, password, first_name, last_name, b_date, b_month, b_year, sex, profile_picture, location, affiliation, bio, interest) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        // Check if passwords match
        if (password !== confirmPassword) {
          res.status(400).json({ error: "Passwords do not match" });
        } else {
          // Execute the query to store user data
          db.query(
            addUserQuery,
            [
              user_name,
              email,
              password,
              first_name,
              last_name,
              b_date,
              b_month,
              b_year,
              sex,
              profile_picture,
              location,
              affiliation,
              bio,
              user_interests,
            ],
            (error, result) => {
              if (error) {
                // Handle error
                console.error("Error adding user:", error);
                res.status(500).json({ error: "Error adding user" });
              } else {
                // User data stored successfully
                res
                  .status(200)
                  .json({ message: "User registration successfull" });
              }
            }
          );
        }
      }
    }
  });
});

///////////////////////////////////////////////////////////////////////////////////////////
// Define a route for displaying a user's profile
app.get("/profile/:user_name", (req, res) => {
  const user_name = req.params.user_name;

  // Query the user data from the database
  const getUserQuery = `SELECT * FROM user WHERE user_name = ?`;

  db.query(getUserQuery, [user_name], (error, results) => {
    if (error) {
      // Handle error
      console.error("Error retrieving user data:", error);
      res.status(500).json({ error: "Error retrieving user data" });
    } else {
      if (results.length === 0) {
        // User not found
        res.status(404).json({ error: "User not found" });
      } else {
        // User data found
        const user = results[0];
        const userData = {
          user_name: user.user_name,
          email: user.email,
          password: user.password,
          first_name: user.first_name,
          last_name: user.last_name,
          b_date: user.b_date,
          b_month: user.b_month,
          b_year: user.b_year,
          sex: user.sex,
          profile_picture: user.profile_picture,
          location: user.location,
          affiliation: user.affiliation,
          bio: user.bio,
          user_interests: user.user_interests,
        };
        res.json(userData);
      }
    }
  });
});
///////////////////////////////////////////////////////////////////////////////////////////

// Start the server
app.listen(3010, () => {
  console.log("Server listening on port 3010");
});
