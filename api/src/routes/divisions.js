const express = require("express");
const router = express.Router();
const divisions = require("../controllers/divisions.js");

// base_url/leagues/divisions/id
router.get('/:leagueID', divisions.findAll);

module.exports = router;