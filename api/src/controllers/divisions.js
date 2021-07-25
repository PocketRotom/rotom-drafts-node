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
    getTeams: async (req, res) => {
        try {
            let teams = await Divisions.getTeamsByDivision(req.params.divisionID);
            return res.status(200).json({
                success: true,
                count: teams.length,
                data: teams
            });
        } catch (err) {
            return res.status(500).json({
                success: false,
                error: "Server Error!"
            })
        }
    },
    getTeamsWithNoDivision: async (req, res) => {
        try {
            let teams = await Divisions.getTeamsWithNoDivision(req.params.leagueID);
            return res.status(200).json({
                success: true,
                count: teams.length,
                data: teams
            });
        } catch (err) {
            return res.status(500).json({
                success: false,
                error: "Server Error!"
            })
        }
    },
    createDivision: async (req, res) => {
        try {
            let name = req.body.name;
            let division = await Divisions.createDivision(req.params.leagueID, name);
            return res.status(200).json({
                success: true,
                data: division
            });
        } catch (err) {
            return res.status(500).json({
                success: false,
                error: "Server Error!"
            })
        }
    }
}