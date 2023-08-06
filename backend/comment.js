const express = require("express");
const router = express.Router();
const auth = require("./authMiddleware");

// Define a route for like and comment handling related to posts with database connection
const route = (db) => {
  // Middleware to check if the post exists
  const postExists = (req, res, next) => {
    const postId = req.body.p_id || req.query.p_id;
    db.query(
      "SELECT p_id FROM post WHERE p_id = ?",
      [postId],
      (err, results) => {
        if (err) {
          return res.status(500).json({ error: "Database error" });
        }
        if (results.length === 0) {
          return res.status(404).json({ error: "Post not found" });
        }
        next();
      }
    );
  };

  router.get("/get/:postid", (req, res) => {
    const postId = req.params.postid; // Get the post ID from the route parameter

    // Query to fetch comments for the specified post
    db.query(
      "SELECT c.*, u.user_name, u.first_name, u.last_name, u.profile_picture " +
        "FROM comment AS c " +
        "LEFT JOIN user AS u ON u.u_id = c.user_id " +
        "WHERE c.post_id = ?",
      [postId],
      (err, results) => {
        if (err) {
          return res.status(500).json({ error: "Database error" });
        }
        if (results.length == 1 && results[0].c_id == null) return;
        // Return the comments for the specified post
        res.status(200).json(results);
      }
    );
  });

  // POST route to add a comment to a post
  router.post("/add", auth, postExists, (req, res) => {
    const userId = req.user.u_id;
    const postId = req.body.p_id;
    const content = req.body.content;

    const comment = {
      c_time: new Date().toISOString().slice(11, 19), // Get current time in HH:mm:ss format
      c_date: new Date().getDate(),
      c_month: new Date().getMonth() + 1,
      c_year: new Date().getFullYear(),
      content: content,
      user_id: userId,
      post_id: postId,
    };

    db.query("INSERT INTO comment SET ?", comment, (err, results) => {
      if (err) {
        return res.status(500).json({ error: "Database error" });
      }
      res.status(200).json({ message: "Comment added to post successfully" });
    });
  });

  // DELETE route to remove a comment from a post
  router.delete("/delete/:commentid", auth, postExists, (req, res) => {
    const commentId = req.params.commentid; // Get the comment ID from the route parameter

    db.query(
      "DELETE FROM comment WHERE c_id = ?",
      [commentId],
      (err, results) => {
        if (err) {
          return res.status(500).json({ error: "Database error" });
        }
        res
          .status(200)
          .json({ message: "Comment removed from post successfully" });
      }
    );
  });

  return router;
};

module.exports = route;
