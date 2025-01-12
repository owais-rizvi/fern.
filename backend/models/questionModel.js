const mongoose = require('mongoose');

const questionSchema = mongoose.Schema({
    id: {
        type: Number,
        unique: true,
        required: true
    },
    question: {
        type: String,
        required: true
    },
    options: {
        type: [String],
        required: true
    },
    correctAnswer: {
        type: Number,
        required: true
    }
});

const questionModel = mongoose.model('questionModel',questionSchema);

module.exports = questionModel;