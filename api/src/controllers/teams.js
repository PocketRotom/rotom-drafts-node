const Teams = require("../models/teams.js");

module.exports = {
    getAllTeams: async (req, res) => {
        try {
            //let leagueID = req.query.leagueID;

            let teams = await Teams.getTeams();
            return res.status(200).json({
                success: true,
                count: teams.length,
                data: teams
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                error: error
            })
        }
    },
    getTeamDraft: async (req, res) => {
        try {
            let teamID = req.query.teamID;

            let team = await Teams.getTeamDraft(teamID);
            return res.status(200).json({
                success: true,
                count: team.length,
                data: team
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                error: error
            })
        }
    },
    getTeam: async (req, res) => {
        try {
            let teamID = req.query.teamID;

            let team = await Teams.getTeam(teamID);
            return res.status(200).json({
                success: true,
                count: team.length,
                data: team
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                error: error
            })
        }
    },
    getDrafted: async (req, res) => {
        try {

            let team = await Teams.getDrafted();
            return res.status(200).json({
                success: true,
                count: team.length,
                data: team
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                error: error
            })
        }
    },
    
}