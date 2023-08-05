///////////////////////////////////////////// search_global.js
const express = require("express");
const router = express.Router();
const auth = require("./authMiddleware");

// API endpoint for searching and retrieving friend profiles a with db connection
const route = (db) => {
  router.get("/", auth, (req, res) => {
    const searchQuery = req.query.q; // search query is passed as a query parameter
    const u_id = req.user.u_id;

    // Retrieve friend profiles from the 'user' table based on the search query
    const query = `
    SELECT u.user_name,u.first_name, u.last_name, u.bio, u.profile_picture
    FROM user AS u
    WHERE u.u_id != ? AND (u.user_name LIKE ? OR u.first_name LIKE ? OR u.last_name LIKE ?)
  `;
    const searchValue = `%${searchQuery}%`;
    db.query(
      query,
      [u_id, searchValue, searchValue, searchValue],
      (err, results) => {
        if (err) {
          console.error(
            "Error retrieving user profiles from the database:",
            err
          );
          res.status(500).json({ error: "Failed to retrieve user profiles" });
        } else {
          const profiles = results;

          res.json(profiles);
        }
      }
    );
  });
  return router;
};
module.exports = route;
