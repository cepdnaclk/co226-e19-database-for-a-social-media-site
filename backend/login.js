////////////////////////// login.js

const express = require("express");
const router = express.Router();

// Define a route for user login with Database connection
const route = (db)=>{
router.post("/", (req, res) => {
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
          res.json({ message: "Login successful" });
        } else {
          // Incorrect password
          res.status(401).json({ error: "Incorrect password" });
        }
      }
    }
  });
});
  return router;
};

module.exports = route;
