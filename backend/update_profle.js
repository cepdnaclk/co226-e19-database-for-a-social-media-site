//////////////////////////  update_profile.js
const express = require("express");
const router = express.Router();


// Define a route for user update profile info with the connection to the database
const route = (db)=>{
router.post("/", (req, res) => {
    const {
      first_name,
      last_name,
      email,
      password,
      b_year,
      b_month,
      b_date,
      profile_picture,
      location,
      affiliation,
      bio,
      interests
    } = req.body;
  
    
      // profilePic as link
      // location as google map link
      const addUserQuery = `INSERT INTO user (first_name,last_name,email,password,b_year,b_month,b_date,profile_picture, location, affiliation, bio, interests) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        // Execute the query to store additional user data
        db.query(
          addUserQuery,
          [
            first_name,
            last_name,
            email,
            password,
            b_year,
            b_month,
            b_date,
            profile_picture,
            location,
            affiliation,
            bio,
            interests
          ],
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