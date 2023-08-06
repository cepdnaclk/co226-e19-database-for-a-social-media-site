/////////////////// post_feed.js
const express = require("express");
const router = express.Router();
const auth = require("./authMiddleware");

// API endpoint for retrieving the post feed and connection with db
const route = (db) => {
  router.get("/", auth, (req, res) => {
    const u_id = req.user.u_id; //user ID is passed as a query parameter

    // Retrieve posts from friends and public posts
    const query = `
    SELECT 
        p.*, 
        COUNT(c.c_id) AS commentCount, 
        COUNT(pl.id) AS likeCount,
        u.user_name,
        u.first_name,
        u.last_name,
        u.profile_picture
    FROM post AS p
    LEFT JOIN comment AS c ON c.post_id = p.p_id
    LEFT JOIN post_like AS pl ON pl.post_id = p.p_id
    LEFT JOIN friends_with AS fw ON (fw.accepter_id = p.user_id OR fw.requester_id = p.user_id)
    LEFT JOIN user AS u ON u.u_id = p.user_id
    WHERE (fw.accepter_id = ? OR fw.requester_id = ?) OR p.user_id = ? OR (p.private = 0)
    GROUP BY p.p_id
    ORDER BY p.p_year DESC, p.p_month DESC, p.p_date DESC, p.p_time DESC;
    `;

    db.query(query, [u_id, u_id, u_id], (err, results) => {
      if (err) {
        console.error("Error retrieving posts from the database:", err);
        res.status(500).json({ error: "Failed to retrieve posts" });
      } else {
        // Process and format the retrieved data as needed
        const posts = results.map((post) => ({
          id: post.p_id,
          date: getDateInfo(
            post.p_year,
            post.p_month,
            post.p_date,
            post.p_time.split(":")[0],
            post.p_time.split(":")[1]
          ),
          content: post.content,
          commentCount: post.commentCount,
          likeCount: post.likeCount,
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
        COUNT(c.c_id) AS commentCount, 
        COUNT(pl.id) AS likeCount,
        u.user_name,
        u.first_name,
        u.last_name,
        u.profile_picture
    FROM post AS p
    LEFT JOIN comment AS c ON c.post_id = p.p_id
    LEFT JOIN post_like AS pl ON pl.post_id = p.p_id
    LEFT JOIN user AS u ON u.u_id = p.user_id
    WHERE p.user_id = ?
    ORDER BY p.p_year DESC, p.p_month DESC, p.p_date DESC, p.p_time DESC;
    `;

    db.query(query, [u_id], (err, results) => {
      if (err) {
        console.error("Error retrieving posts from the database:", err);
        res.status(500).json({ error: "Failed to retrieve posts" });
      } else {
        if (results.length <= 1 && results[0].p_id == null) {
          res.json([]);
          return;
        }

        // Process and format the retrieved data as needed
        const posts = results.map((post) => ({
          id: post.p_id,
          date: getDateInfo(
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

function getDateInfo(
  inputYear,
  inputMonth,
  inputDay,
  inputHours,
  inputMinutes
) {
  const currentDate = new Date();
  const targetDate = new Date(
    inputYear,
    inputMonth - 1,
    inputDay,
    inputHours,
    inputMinutes
  );

  const timeDifference = currentDate - targetDate;
  const minuteDifference = Math.floor(timeDifference / (1000 * 60));
  const hourDifference = Math.floor(timeDifference / (1000 * 60 * 60));
  const dayDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  if (minuteDifference < 60) {
    return `${minuteDifference} min ago`;
  } else if (hourDifference < 24) {
    return `${hourDifference} h ago`;
  } else if (dayDifference < 30) {
    return `${dayDifference} d ago`;
  } else {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const targetMonthName = monthNames[inputMonth - 1];
    return `${targetMonthName} ${inputDay}, ${inputYear}`;
  }
}

module.exports = route;
