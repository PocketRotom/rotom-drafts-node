const Divisions = require("../models/divisions.js");

module.exports = {
    findAll: async (req, res) => {
        try {
            let divisions = await Divisions.getAll(req.params.leagueID);
            return res.status(200).json({
                success: true,
                count: divisions.length,
                data: divisions
            });
        } catch (err) {
            return res.status(500).json({
                success: false,
                error: "Server Error!"
            })
        }
    },
}