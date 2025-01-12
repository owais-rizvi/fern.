const mongoose = require('mongoose');
const MONGO_URI = process.env.MONGO_URI;
function connectToDB(){
    mongoose.connect(MONGO_URI)
    .then(() => console.log('Successfully connected to the database.'))
    .catch((err) => console.log(err));
}

module.exports = connectToDB;