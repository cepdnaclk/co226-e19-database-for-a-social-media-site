/////////////////// post_feed.js
const express = require("express");
const router = express.Router();

// API endpoint for retrieving the post feed and connection with db
const route = (db) => {
  router.get("", (req, res) => {
    const u_id = req.query.u_id; //user ID is passed as a query parameter

    // Retrieve posts from friends only
    const query = `
      SELECT p.*, COUNT(c.id) AS commentCount, COUNT(pl.id) AS likeCount
      FROM post AS p
      LEFT JOIN comment AS c ON c.post_id = p.p_id
      LEFT JOIN post_like AS pl ON pl.post_id = p.p_id
      WHERE p.user_id IN (
        SELECT friend_id
        FROM friend
        WHERE (friends_with.accepter_id = ? OR friends_with.requester_id = ? )
      )
      GROUP BY p.id
      ORDER BY RAND()
    `;

    db.query(query, [u_id], (err, results) => {
      if (err) {
        console.error("Error retrieving posts from the database:", err);
        res.status(500).json({ error: "Failed to retrieve posts" });
      } else {
        // Process and format the retrieved data as needed
        const posts = results.map((post) => ({
          id: post.p_id,
          //title: post.title,
          content: post.content,
          commentCount: post.commentCount,
          likeCount: post.likeCount,
          // any other required properties
        }));

        res.json(posts);
      }
    });
  });
  return router;
};

module.exports = route;
