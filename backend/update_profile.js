//////////////////////////  update_profile.js
const express = require("express");
const router = express.Router();

// Define a route for user update profile info with the connection to the database
const route = (db) => {
  router.post("/", (req, res) => {
    const {
      u_id,
      first_name,
      last_name,
      email,
      sex,
      password,
      b_year,
      b_month,
      b_date,
      profile_picture,
      location,
      affiliation,
      bio,
      interest,
    } = req.body;

    // profilePic as link
    // location as google map link
    const addUserQuery = `INSERT INTO user (u_id,first_name,last_name,email,sex,password,b_year,b_month,b_date,profile_picture, location, affiliation, bio, interest) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
        first_name = VALUES(first_name),
        last_name = VALUES(last_name),
        email = VALUES(email),
        sex = VALUES(sex),
        password = VALUES(password),
        b_year = VALUES(b_year),
        b_month = VALUES(b_month),
        b_date = VALUES(b_date),
        profile_picture = VALUES(profile_picture),
        location = VALUES(location),
        affiliation = VALUES(affiliation),
        bio = VALUES(bio),
        interest = VALUES(interest)`;

    // Execute the query to store additional user data
    db.query(
      addUserQuery,
      [
        u_id,
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
        interest,
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
