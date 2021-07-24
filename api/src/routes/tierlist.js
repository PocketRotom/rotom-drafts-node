const express = require("express");
const router = express.Router({mergeParams: true});
const tierlist = require("../controllers/tierlist.js");

// base_url/leagues/leagueID/tierlist/
router.get('', tierlist.getTierlist);



module.exports = router;