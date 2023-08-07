///////////////////////////////// post.js

const express = require("express");
const router = express.Router();
const auth = require("./authMiddleware");

// Define a route for post handling with database connection
const route = (db) => {
  router.get("/get/:postid", auth, (req, res) => {
    const postId = req.params.postid; // Get the post ID from the route parameter
    const userId = req.user.u_id; // Assuming the user ID is provided in the request body

    db.query(
      `
      SELECT 
          p.*, 
          COALESCE(c.commentCount, 0) AS commentCount, 
          COALESCE(pl.likeCount, 0) AS likeCount,
          u.user_name,
          u.first_name,
          u.last_name,
          u.profile_picture
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
      WHERE p.p_id = ?;  
    `,
      [postId],
      (err, results) => {
        if (err) {
          return res.status(500).json({ error: "Database error" });
        }
        if (results.length === 0) {
          return res.status(404).json({ error: "Post not found" });
        }
        const post = results.map((post) => ({
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

        res.send(post[0]);
      }
    );
  });

  // POST route to add a new post
  router.post("/add", auth, (req, res) => {
    const userId = req.user.u_id; // Assuming the user ID is provided in the request body
    const { content, media, m_type, private } = req.body;

    const post = {
      p_time: `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
      p_date: new Date().getDate(),
      p_month: new Date().getMonth() + 1,
      p_year: new Date().getFullYear(),
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
