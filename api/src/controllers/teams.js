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
            console.log(err);
            return res.status(500).json({
                success: false,
                error: err
            })
        }
    }
}