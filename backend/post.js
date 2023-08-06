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
      WHERE p.p_id = ?
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

  const currentYear = currentDate.getFullYear();
  const targetYear = targetDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const targetMonth = targetDate.getMonth();
  const currentDay = currentDate.getDate();
  const targetDay = targetDate.getDate();
  const currentHours = currentDate.getHours();
  const targetHours = targetDate.getHours();
  const currentMinutes = currentDate.getMinutes();
  const targetMinutes = targetDate.getMinutes();

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

  const currentMonthName = monthNames[currentMonth];
  const targetMonthName = monthNames[targetMonth];
  const currentMonthShort = currentMonthName.substr(0, 3);
  const targetMonthShort = targetMonthName.substr(0, 3);

  if (
    currentYear === targetYear &&
    currentMonth === targetMonth &&
    currentDay === targetDay &&
    currentHours === targetHours
  ) {
    const minuteDifference = targetMinutes - currentMinutes;
    return `${minuteDifference}Min ago`;
  } else if (
    currentYear === targetYear &&
    currentMonth === targetMonth &&
    currentDay === targetDay
  ) {
    const hourDifference = targetHours - currentHours;
    const minuteDifference = targetMinutes - currentMinutes;
    return `${hourDifference}H ago`;
  } else if (currentYear === targetYear && currentMonth === targetMonth) {
    const dayDifference = targetDay - currentDay;
    return `${dayDifference}D ago`;
  } else if (currentYear === targetYear) {
    return `${targetDay} ${targetMonthShort}`;
  } else {
    return `${targetMonthShort} ${targetYear}`;
  }
}

module.exports = route;
