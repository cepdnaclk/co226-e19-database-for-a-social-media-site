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
      location,
      affiliation,
      bio,
      interests, // Use the interests array instead of the interest field
    } = req.body;

    // profilePic as link
    // location as google map link
    let addUserQuery = `INSERT INTO user (u_id, first_name, last_name, email, sex, b_year, b_month, b_date, profile_picture, location, affiliation, bio) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
      first_name = VALUES(first_name),
      last_name = VALUES(last_name),
      email = VALUES(email),
      sex = VALUES(sex),
      b_year = VALUES(b_year),
      b_month = VALUES(b_month),
      b_date = VALUES(b_date),
      location = VALUES(location),
      affiliation = VALUES(affiliation),
      bio = VALUES(bio)`;

    if (password !== null) {
      addUserQuery += `, password = VALUES(password)`;
    }

    const deleteInterestsQuery = `DELETE FROM user_interests WHERE user_id = ?`;

    const addUserInterestsQuery = `INSERT INTO user_interests (user_id, interest) VALUES ?`;

    // Execute the queries to update user data and interests
    db.beginTransaction((error) => {
      if (error) {
        console.error("Error starting the transaction:", error);
        return res.status(500).json({ error: "Error updating user" });
      }

      db.query(
        addUserQuery,
        [
          u_id,
          first_name,
          last_name,
          email,
          sex,
          password,
          b_year,
          b_month,
          b_date,
          location,
          affiliation,
          bio,
        ],
        (error, result) => {
          if (error) {
            db.rollback(() => {
              console.error("Error updating the user:", error);
              res.status(500).json({ error: "Error updating user" });
            });
          } else {
            // Delete existing interests
            db.query(deleteInterestsQuery, [u_id], (error) => {
              if (error) {
                db.rollback(() => {
                  console.error("Error deleting existing interests:", error);
                  res.status(500).json({ error: "Error updating user interests" });
                });
              } else {
                // Insert new interests
                const interestsData = interests.map((interest) => [u_id, interest]);
                db.query(addUserInterestsQuery, [interestsData], (error) => {
                  if (error) {
                    db.rollback(() => {
                      console.error("Error adding interests:", error);
                      res.status(500).json({ error: "Error updating user interests" });
                    });
                  } else {
                    // Commit the transaction if everything is successful
                    db.commit((error) => {
                      if (error) {
                        db.rollback(() => {
                          console.error("Error committing the transaction:", error);
                          res.status(500).json({ error: "Error updating user" });
                        });
                      } else {
                        res.json({ message: "User info update successful" });
                      }
                    });
                  }
                });
              }
            });
          }
        }
      );
    });
  });

  return router;
};
module.exports = route;
