const Teams = require("../models/teams.js");

module.exports = {
    signUpTeam: async (req, res) => {
        try {

            let teamName = req.body.teamName;
            let userID = req.body.userID;
            let idLeague = req.params.leagueID;

            
            let teams = await Teams.signUpTeam(teamName, userID, idLeague);

            return res.status(200).json({
                success: true,
                //count: teams.length,
                data: teams
            });
        } catch (err) {
            return res.status(500).json({
                success: false,
                error: err
            })
        }
    },
    getAllTeams: async (req, res) => {
        try {
            let leagueID = req.params.leagueID;

            let teams = await Teams.getTeams(leagueID);
            return res.status(200).json({
                success: true,
                count: teams.length,
                data: teams
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                error: "Server Error!"
            })
        }
    }
}