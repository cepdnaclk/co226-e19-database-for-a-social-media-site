/////////////////// post_feed.js
const express = require("express");
const router = express.Router();
const auth = require("./authMiddleware");
const timePresent = require("./timePresent");

// API endpoint for retrieving the post feed and connection with db
const route = (db) => {
  router.get("/", auth, (req, res) => {
    const u_id = req.user.u_id; //user ID is passed as a query parameter

    const query = `
    SELECT 
        p.*, 
        COALESCE(c.commentCount, 0) AS commentCount, 
        COALESCE(pl.likeCount, 0) AS likeCount,
        u.user_name,
        u.first_name,
        u.last_name,
        u.profile_picture,
        GROUP_CONCAT(lt.liketype_id ORDER BY lt.likeCount DESC) AS liketype_ids
    FROM post AS p
    LEFT JOIN user AS u ON u.u_id = p.user_id
    LEFT JOIN (
        SELECT post_id, COUNT(c_id) AS commentCount
        FROM comment
        GROUP BY post_id
    ) AS c ON c.post_id = p.p_id
    LEFT JOIN (
        SELECT post_id, COUNT(id) AS likeCount
        FROM post_like
        GROUP BY post_id
    ) AS pl ON pl.post_id = p.p_id
    LEFT JOIN (
        SELECT post_id, liketype_id, COUNT(id) AS likeCount
        FROM post_like
        GROUP BY post_id, liketype_id
    ) AS lt ON lt.post_id = p.p_id
    LEFT JOIN friends_with AS fw ON (fw.accepter_id = p.user_id OR fw.requester_id = p.user_id)
    WHERE (fw.accepter_id = ? OR fw.requester_id = ?) OR p.user_id = ? OR (p.private = 0)
    GROUP BY p.p_id
    ORDER BY p.p_year DESC, p.p_month DESC, p.p_date DESC, p.p_time DESC;
    `;

    db.query(query, [u_id, u_id, u_id], (err, results) => {
      if (err) {
        console.error("Error retrieving posts from the database:", err);
        res.status(500).json({ error: "Failed to retrieve posts" });
      }
      if (results.length == 1 && results[0].p_id == null) {
        return;
      } else {
        // Process and format the retrieved data as needed
        const posts = results.map((post) => ({
          id: post.p_id,
          date: timePresent(
            post.p_year,
            post.p_month,
            post.p_date,
            post.p_time.split(":")[0],
            post.p_time.split(":")[1]
          ),
          content: post.content,
          commentCount: post.commentCount,
          likeCount: post.likeCount,
          likeTypes: post.liketype_ids,
          media: post.media,
          m_type: post.m_type,
          uname: post.user_name,
          fname: post.first_name,
          lname: post.last_name,
          propic: post.profile_picture,
          // any other required properties
        }));

        res.json(posts);
      }
    });
  });

  router.get("/profile/:id", auth, (req, res) => {
    const u_id = req.params.id; //user ID is passed as a query parameter

    // Retrieve posts from friends only
    const query = `
    SELECT 
        p.*, 
        COALESCE(c.commentCount, 0) AS commentCount, 
        COALESCE(pl.likeCount, 0) AS likeCount,
        u.user_name,
        u.first_name,
        u.last_name,
        u.profile_picture,
        GROUP_CONCAT(lt.liketype_id ORDER BY lt.likeCount DESC) AS liketype_ids
    FROM post AS p
    LEFT JOIN user AS u ON u.u_id = p.user_id
    LEFT JOIN (
        SELECT post_id, COUNT(c_id) AS commentCount
        FROM comment
        GROUP BY post_id
    ) AS c ON c.post_id = p.p_id
    LEFT JOIN (
        SELECT post_id, COUNT(id) AS likeCount
        FROM post_like
        GROUP BY post_id
    ) AS pl ON pl.post_id = p.p_id
    LEFT JOIN (
        SELECT post_id, liketype_id, COUNT(id) AS likeCount
        FROM post_like
        GROUP BY post_id, liketype_id
    ) AS lt ON lt.post_id = p.p_id
    LEFT JOIN friends_with AS fw ON (fw.accepter_id = p.user_id OR fw.requester_id = p.user_id)
    WHERE p.user_id = ? 
    GROUP BY p.p_id
    ORDER BY p.p_year DESC, p.p_month DESC, p.p_date DESC, p.p_time DESC;
    `;

    db.query(query, [u_id], (err, results) => {
      if (err) {
        console.error("Error retrieving posts from the database:", err);
        res.status(500).json({ error: "Failed to retrieve posts" });
      } else {
        if (results.length == 1 && results[0].p_id == null) {
          res.json([]);
          return;
        }

        // Process and format the retrieved data as needed
        const posts = results.map((post) => ({
          id: post.p_id,
          date: timePresent(
            post.p_year,
            post.p_month,
            post.p_date,
            post.p_time.split(":")[0],
            post.p_time.split(":")[1]
          ),
          content: post.content,
          media: post.media,
          m_type: post.m_type,
          commentCount: post.commentCount,
          likeCount: post.likeCount,
          likeTypes: post.liketype_ids,
          uname: post.user_name,
          fname: post.first_name,
          lname: post.last_name,
          propic: post.profile_picture,
        }));

        res.json(posts);
      }
    });
  });
  return router;
};

module.exports = route;
