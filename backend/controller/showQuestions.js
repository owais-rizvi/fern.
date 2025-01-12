const questionModel = require('../models/questionModel');

async function showQuestions (req,res) {
    try {
        const allQuestions = await questionModel.find();
        return res.json(allQuestions);
    }catch(err){
        console.log(err);
        return res.status(500).json({message: "Error retrieving questions."});
    }
}

module.exports = showQuestions;