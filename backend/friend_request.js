////////////////////////////////// friend_request.js

const express = require("express");
const router = express.Router();
const db = require("./index"); // Assuming the database connection is in index.js
const auth = require("./authMiddleware");

// POST route to send a friend request
router.post("/send", auth, (req, res) => {
  const requesterId = req.user.u_id; // Assuming the requester's ID is provided in the request body
  const requesteeId = req.body.friend_id; // Assuming the requestee's ID is provided in the request body
  // Save the friend request in the database
  const currentTime = new Date();
  db.query(
    "INSERT INTO friend_request (requestee_id, requester_id, req_time, req_date, req_month, req_year, req_status) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [
      requesteeId,
      requesterId,
      currentTime.toLocaleTimeString(),
      currentTime.getDate(),
      currentTime.getMonth() + 1,
      currentTime.getFullYear(),
      "pending",
    ],
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: "Database error" });
      }
      res.status(200).json({ message: "Friend request sent successfully" });
    }
  );
});

// PUT route to accept/reject a friend request
router.put("/respond", auth, (req, res) => {
  const requesteeId = req.user.u_id; // Assuming the requestee's ID is provided in the request body
  const requesterId = req.body.friend_id; // Assuming the requester's ID is provided in the request body
  const response = req.body.response; // Assuming the response (accept/reject) is provided in the request body
  // Update the friend request status in the database
  db.query(
    "UPDATE friend_request SET req_status = ? WHERE requestee_id = ? AND requester_id = ?",
    [response, requesteeId, requesterId],
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: "Database error" });
      }
      res
        .status(200)
        .json({ message: "Friend request response updated successfully" });
    }
  );
});

// DELETE route to cancel a friend request
router.delete("/cancel", auth, (req, res) => {
  const requesterId = req.user.u_id; // Assuming the requester's ID is provided in the request body
  const requesteeId = req.body.friend_id; // Assuming the requestee's ID is provided in the request body
  // Delete the friend request from the database
  db.query(
    "DELETE FROM friend_request WHERE requester_id = ? AND requestee_id = ?",
    [requesterId, requesteeId],
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: "Database error" });
      }
      res.status(200).json({ message: "Friend request canceled successfully" });
    }
  );
});

module.exports = router;
