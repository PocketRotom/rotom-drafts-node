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
    },
    getTeamDraft: async (req, res) => {
        try {
            let teamID = req.params.teamID;

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
            let teamID = req.params.teamID;

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
    addPokemon: async (req, res) => {
        try {
            let teamID = req.body.teamID;
            //let teamID = 27;
            let pokemonID = req.body.pokemonID;

            let pokemon = await Teams.addPokemon(teamID, pokemonID);
            return res.status(200).json({
                success: true,
                //count: teams.length,
                data: pokemon
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                error: error
            })
        }
    }
}