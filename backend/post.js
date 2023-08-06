///////////////////////////////// post.js

const express = require("express");
const router = express.Router();
const auth = require("./authMiddleware");

// Define a route for post handling with database connection
const route = (db) => {
  // POST route to add a new post
  router.post("/add", auth, (req, res) => {
    const userId = req.user.u_id; // Assuming the user ID is provided in the request body
    const { p_time, p_date, p_month, p_year, content, media, m_type, private } =
      req.body;

    const post = {
      p_time,
      p_date,
      p_month,
      p_year,
      content,
      media,
      m_type,
      private, // Add the "private" field
      user_id: userId,
    };

    db.query("INSERT INTO post SET ?", post, (err, results) => {
      if (err) {
        return res.status(500).json({ error: "Database error" });
      }
      res.status(200).json({ message: "Post added successfully" });
    });
  });

  // DELETE route to delete a post
  router.delete("/delete/:postid", auth, (req, res) => {
    const postId = req.params.p_id; // Assuming the post ID is provided as a route parameter
    const userId = req.user.u_id; // Assuming the user ID is provided in the request body
    db.query(
      "SELECT user_id FROM post WHERE p_id = ?",
      [postId],
      (err, results) => {
        if (err) {
          return res.status(500).json({ error: "Database error" });
        }
        if (results.length === 0) {
          return res.status(404).json({ error: "Post not found" });
        }
        const postUserId = results[0].u_id;
        if (postUserId !== userId) {
          return res
            .status(403)
            .json({ error: "You are not authorized to delete this post" });
        }
        db.query(
          "DELETE FROM post WHERE p_id = ?",
          [postId],
          (err, results) => {
            if (err) {
              return res.status(500).json({ error: "Database error" });
            }
            res.status(200).json({ message: "Post deleted successfully" });
          }
        );
      }
    );
  });

  return router;
};
module.exports = route;
