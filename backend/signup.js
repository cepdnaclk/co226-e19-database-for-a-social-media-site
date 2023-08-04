////////////////////////// signup.js
const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();

// Define a route for user sign up with database connection
const route = (db) => {
  router.post("/", async (req, res) => {
    const { user_name, email, password, confirmPassword } = req.body;

    // Check if username is already taken
    const usernameQuery = `SELECT * FROM user WHERE user_name = ?`;

    db.query(usernameQuery, [user_name], async (error, results) => {
      if (error) {
        // Handle error
        console.error("Error checking username:", error);
        res.status(500).json({ error: "Error checking username" });
      } else {
        if (results.length > 0) {
          // Username is already taken
          res.status(400).json({
            error:
              "Username is already taken. Please enter a different username",
          });
        } else {
          // Username is valid, proceed to store in the database

          const addUserQuery = `INSERT INTO user (user_name, email, password) VALUES (?, ?, ?)`;

          // Check if passwords match
          if (password !== confirmPassword) {
            res.status(400).json({ error: "Passwords do not match" });
          } else {
            // Execute the query to store user data
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(password, salt);

            db.query(
              addUserQuery,
              [user_name, email, hashPassword],
              (error, result) => {
                if (error) {
                  // Handle error
                  console.error("Error adding user:", error);
                  res.status(500).json({ error: "Error adding user" });
                } else {
                  // User data stored successfully
                  res.json({
                    message: "User registration successful",
                    u_id: result.insertId,
                  });
                }
              }
            );
          }
        }
      }
    });
  });

  router.post("/more", (req, res) => {
    const {
      u_id,
      first_name,
      last_name,
      sex,
      b_year,
      b_month,
      b_date,
      location,
    } = req.body;

    // profilePic as link
    // location as google map link
    const addUserQuery = `UPDATE user
    SET first_name = ?,
        last_name = ?,
        sex = ?,
        b_year = ?,
        b_month = ?,
        b_date = ?,
        location = ?
    WHERE u_id = ?;`;

    // Execute the query to store additional user data
    db.query(
      addUserQuery,
      [first_name, last_name, sex, b_year, b_month, b_date, location, u_id],
      (error, result) => {
        if (error) {
          // Handle error
          console.error("Error updating the user:", error);
          res.status(500).json({ error: "Error error updating user" });
        } else {
          // User data stored successfully
          res.json({ message: "User info update successful" });
        }
      }
    );
  });

  return router;
};
module.exports = route;
