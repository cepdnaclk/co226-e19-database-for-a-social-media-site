///////////////////////////////////////////// search_global.js
const express = require('express');
const router = express.Router();


// API endpoint for searching and retrieving friend profiles a with db connection
const route = (db)=>{
router.get('/', (req, res) => {
    const searchQuery = req.query.q; // search query is passed as a query parameter
    const u_id = req.query.u_id; // user ID is passed as a query parameter
  
    // Retrieve friend profiles from the 'user' table based on the search query
    const query = `
    SELECT u.user_name,u.first_name, u.last_name, u.bio
    FROM user AS u
    WHERE u.u_id != ?
  `;
    const searchValue = `%${searchQuery}%`;
    db.query(query, [u_id,searchValue], (err, results) => {
      if (err) {
        console.error('Error retrieving user profiles from the database:', err);
        res.status(500).json({ error: 'Failed to retrieve user profiles' });
      } else {
        const profiles = results;
  
        res.json(profiles);
      }
    });
  });
  return router;

};
module.exports = route; 