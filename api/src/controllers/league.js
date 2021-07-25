const League = require("../models/league.js");

module.exports = {
    findAll: async (req, res) => {
        try {
            let leagues = await League.getAll();
            return res.status(200).json({
                success: true,
                count: leagues.length,
                data: leagues
            });
        } catch (err) {
            return res.status(500).json({
                success: false,
                error: "Server Error!"
            })
        }
    },
    findLeagueByID: async (req, res) => {
        try {
            let league = await League.getByID(req.params.leagueID);
            return res.status(200).json({
                success: true,
                count: league.length,
                data: league
            });
        } catch (err) {
            return res.status(500).json({
                success: false,
                error: "Server Error!"
            })
        }
    },
    createLeague: async (req, res) => {
        try {
            let leagueName = req.body.leagueName;
            let maxNumberOfCoaches = req.body.maxNumberOfCoaches;
            let format = req.body.format;
            let megaTiers = req.body.mega;
            let sTiers = req.body.sTier;
            let aTiers = req.body.aTier;
            let bTiers = req.body.bTier;
            let cTiers = req.body.cTier;
            let dTiers = req.body.dTier;
            let userID = req.body.userID;
            let league = await League.createLeague(leagueName, maxNumberOfCoaches, format, megaTiers, sTiers, aTiers, bTiers, cTiers, dTiers, userID);

            //TODO Add image later
            return res.status(200).json({
                success: true,
                count: league.length,
                data: league
            });
            
        } catch (err) {
            return res.status(500).json({
                success: false,
                error: "Server Error!"
            })
        }
    },
    getAdmins: async (req, res) => {
        try {
            let leagueID = req.params.leagueID;

            let admins = await League.getAdmins(leagueID);

            return res.status(200).json({
                success: true,
                count: admins.length,
                data: admins
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                error: "Server Error!"
            })
        }
    },
    addAdmin: async (req, res) => {
        try {
            let leagueID = req.params.leagueID;
            let userID = req.body.userID;

            let admin = await League.addAdmin(leagueID, userID);
            return res.status(200).json({
                success: true
            });

        } catch (error) {
            return res.status(500).json({
                success: false,
                error: "Server Error!"
            })
        }
    },
    nonAdmins: async (req, res) =>{
        try {
            let leagueID = req.params.leagueID;

            let nonAdmins = await League.getNonAdmins(leagueID);
            return res.status(200).json({
                success: true,
                count: nonAdmins.length,
                data: nonAdmins
            });
            
        } catch (error) {
            return res.status(500).json({
                success: false,
                error: "Server Error!"
            })
        }
    },
    updateSignups: async (req, res) => {
        try {
            let leagueID = req.params.leagueID;
            let signups = req.body.signups;

            let update = await League.updateSignups(leagueID, signups);
            return res.status(200).json({
                success: true
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                error: "Server Error!"
            })
        }
    },
    update: async (req, res) => {
        try {
            let leagueID = req.params.leagueID;
            let signups = req.body.signups;
            let newName = req.body.name;
            let newAdmin = req.body.admin;
            

            let update = await League.update(leagueID, signups, newName, newAdmin);
            if (newAdmin != undefined) {
                let admin = await League.addAdmin(leagueID, newAdmin);
            }
            return res.status(200).json({
                success: true
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                error: "Server Error!"
            })
        }
    },
    alreadySignedUp: async (req, res) => {
        try {
            let leagueID = req.params.leagueID;
            let userID = req.body.userID;

            let check = await League.checkSignedUp(leagueID, userID);
            return res.status(200).json({
                success: true,
                data: check
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                error: "Server Error!"
            })
        }
    },
}