//////////////////////////  additional_info.js
const express = require("express");
const router = express.Router();


// Define a route for user additional info with the connection to the database
const route = (db)=>{
router.post("/", (req, res) => {
    const {
      profile_picture,
      location,
      affiliation,
      bio,
      user_interests
    } = req.body;
  
    
      // profilePic as link
      // location as google map link
      const addUserQuery = `INSERT INTO user (profile_picture, location, affiliation, bio, user_interests) VALUES (?, ?, ?, ?, ?)`;

        // Execute the query to store additional user data
        db.query(
          addUserQuery,
          [
            profile_picture,
            location,
            affiliation,
            bio,
            user_interests
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