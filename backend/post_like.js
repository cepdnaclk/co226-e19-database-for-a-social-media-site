///////////////////////////////////// post_like.js

const express = require("express");
const router = express.Router();

// Define a route for like handling related to posts with database connection
const route = (db) => {
// Middleware to check if the user exists
const userExists = (req, res, next) => {
  const userId = req.body.u_id; // Assuming the user ID is provided in the request body
  db.query("SELECT u_id FROM user WHERE u_id = ?", [userId], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Database error" });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    next();
  });
};

// Middleware to check if the post exists
const postExists = (req, res, next) => {
  const postId = req.body.p_id; // Assuming the post ID is provided in the request body
  db.query("SELECT p_id FROM post WHERE p_id = ?", [postId], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Database error" });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "Post not found" });
    }
    next();
  });
};

// POST route to add a like to a post
router.post("/add", userExists, postExists, (req, res) => {
  const userId = req.body.u_id; // Assuming the user ID is provided in the request body
  const postId = req.body.p_id; // Assuming the post ID is provided in the request body
  const likeTypeId = req.body.liketype_id; // Assuming the like type ID is provided in the request body

  const like = {
    l_time: new Date().toISOString().slice(11, 19), // Get current time in HH:mm:ss format
    l_date: new Date().getDate(),
    l_month: new Date().getMonth() + 1, // Months are 0-indexed, so  add 1
    l_year: new Date().getFullYear(),
    liketype_id: likeTypeId,
    user_id: userId,
    post_id: postId,
  };

  db.query("INSERT INTO post_like SET ?", like, (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Database error" });
    }
    res.status(200).json({ message: "Like added to post successfully" });
  });
});

// DELETE route to remove a like from a post
router.delete("/delete", userExists, postExists, (req, res) => {
  const userId = req.body.u_id; // Assuming the user ID is provided in the request body
  const postId = req.body.p_id; // Assuming the post ID is provided in the request body

  db.query(
    "DELETE FROM post_like WHERE user_id = ? AND post_id = ?",
    [userId, postId],
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: "Database error" });
      }
      res.status(200).json({ message: "Like removed from post successfully" });
    }
  );
});
return router;
};

module.exports = route;
