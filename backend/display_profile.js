///////////////////////////////// display_profile.js
const express = require("express");
const router = express.Router();

// Define a route for displaying a user's profile
const route = (db) => {
  router.get("/:user_name", (req, res) => {
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
            u_id: user.u_id,
            user_name: user.user_name,
            email: user.email,
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
          };
          res.json(userData);
        }
      }
    });
  });

  return router;
};
module.exports = route;
