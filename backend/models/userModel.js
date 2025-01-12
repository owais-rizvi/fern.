const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        minlength: [3,"Username must be atleast 3 characters."]
    },
    email: {
        type: String,
        unique: true,
        required: true,
        minlength:[5, "Email must be atleast 5 characters."]
    },
    password: {
        type: String,
        required: true,
        minlength: [5, "Password must be atleast 5 characters."]
    },
    currentScore: {
        type: Number,
        default: 0
    },
    highestScore: {
        type: Number,
        default: 0
    },
    timeTaken: {
        type: Number,
        default: 0
    },
    recordTimeTaken: {
        type: Number,
        default: 0
    }
})

const userModel = mongoose.model('userModel',UserSchema);
module.exports = userModel;
