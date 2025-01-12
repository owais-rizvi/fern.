const userModel = require("../models/userModel");

async function getLeaderboard (req,res){
    try {
        const topScores = await userModel.find({})
            .sort({highestScore: -1, recordTimeTaken: 1})
            .limit(5)
        res.status(200).json(topScores);
    }catch(err){
        console.log('Error in getting the leaderboard',err);
        res.status(500).json({message: "Error in getting leaderboard scores."});
    }
}
module.exports = getLeaderboard;