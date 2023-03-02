const General = require("../models/general.js");

module.exports = {
    getCurrentPick: async (req, res) => {
        try {
            let draftNo = req.query.draftNo;
            let currentPick = await General.getCurrentPick(draftNo);
            return res.status(200).json({
                success: true,
                count: currentPick.length,
                data: currentPick,
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                error: error
            })
        }
    },
    setCurrentPick: async (req, res) => {
      try {
          let currentPick = req.query.currentPick;
          let draftNo = req.query.draftNo;

          console.log(currentPick);

          let connection = await General.setCurrentPick(currentPick, draftNo);
          return res.status(200).json({
              success: true,
              count: connection.length,
              data: currentPick,
          });
      } catch (error) {
          return res.status(500).json({
              success: false,
              error: error
          })
      }
  },
}