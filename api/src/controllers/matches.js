const Matches = require("../models/matches.js");

module.exports = {
    findAll: async (req, res) => {
        try {
            let matches = await Matches.getAll(req.params.leagueID);
            return res.status(200).json({
                success: true,
                count: matches.length,
                data: matches
            });
        } catch (err) {
            return res.status(500).json({
                success: false,
                error: "Server Error!"
            })
        }
    },
    addMatch: async (req, res) => {
        try {

            let idTeam1 = req.body.team1;
            let idTeam2 = req.body.team2;
            let week = req.body.week;
            let stream = req.body.stream;
            

            let match = await Matches.addMatch(req.params.leagueID, idTeam1, idTeam2, week, stream);
            return res.status(200).json({
                success: true,
                count: match.length,
                data: match
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                error: "Server Error!"
            })
        }
    },
    getMatch: async (req, res) =>{
        try {
            let matchID = req.params.matchID;

            let match = await Matches.getMatch(matchID);
            return res.status(200).json({
                success: true,
                count: match.length,
                data: match
            });

        } catch (error) {
            return res.status(500).json({
                success: false,
                error: "Server Error!"
            })
        }
    },
    updateMatch: async (req, res) => {
        try {
            let matchID = req.params.matchID;
            let scoreTeam1 = req.body.scoreT1;
            let scoreTeam2 = req.body.scoreT2;
            let replay = req.body.replay;
            
            let match = await Matches.updateMatch(matchID, scoreTeam1, scoreTeam2, replay);
            return res.status(200).json({
                success: true,
                count: match.length,
                data: match
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                error: "Server Error!"
            })
        }
    }
}