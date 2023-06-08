////////////////////////// signup.js
const express = require('express');
const router = express.Router();


// Define a route for user sign up with database connection
const route = (db)=>{
router.post('/', (req, res) => {
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
      sex
    } = req.body;
  
    // Check if username is already taken
    const usernameQuery = `SELECT * FROM user WHERE user_name = ?`;
  
    db.query(usernameQuery, [user_name], (error, results) => {
      if (error) {
        // Handle error
        console.error('Error checking username:', error);
        res.status(500).json({ error: 'Error checking username' });
      } else {
        if (results.length > 0) {
          // Username is already taken
          res
            .status(400)
            .json({ error: 'Username is already taken. Please enter a different username' });
        } else {
          // Username is valid, proceed to store in the database
          
          const addUserQuery = `INSERT INTO user (user_name, email, password, first_name, last_name, b_date, b_month, b_year, sex) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  
          // Check if passwords match
          if (password !== confirmPassword) {
            res.status(400).json({ error: 'Passwords do not match' });
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
                sex
              ],
              (error, result) => {
                if (error) {
                  // Handle error
                  console.error('Error adding user:', error);
                  res.status(500).json({ error: 'Error adding user' });
                } else {
                  // User data stored successfully
                  res.json({ message: 'User registration successful' });
                }
              }
            );
          }
        }
      }
    });
  });
  return router;
};
module.exports = route;