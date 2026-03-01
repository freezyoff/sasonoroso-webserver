/**
 * API ROUTE
 */
const express = require('express');
const router = express.Router();

router.use(express.json());

// user api
router.post('/user/save', require('./../http/user/save.js'));
// router.post('/user/delete', require('./../http/user/save.js'));
// router.post('/user/list', require('./../http/user/save.js'));

// partner api
router.post('/partner', (req, res) => {
  res.send('Create a new user');
});

// merchandise api
router.post('/merch', (req, res) => {
  res.send('Create a new user');
});

module.exports = router;