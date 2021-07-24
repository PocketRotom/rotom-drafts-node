const Tierlist = require("../models/tierlist.js");

module.exports = {
    getTierlist: async (req, res) => {
        try {
            let tierlist = await Tierlist.getTierlist(req.params.leagueID);
            return res.status(200).json({
                success: true,
                count: tierlist.length,
                data: tierlist
            });
        } catch (err) {
            return res.status(500).json({
                success: false,
                error: "Server Error!"
            })
        }
    },
}