require('dotenv').config();
const express = require('express');
const connectToDB = require('./config/db');
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require('cors');
const {createUser,loginUser, updateScore} = require('./controller/userController');
const getLeaderboard = require('./controller/getLeaderboard');
const showQuestions = require('./controller/showQuestions');
connectToDB();
const corsOptions = {
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type","Authorization"]
}
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.post('/register', createUser);
app.post('/login', loginUser);
app.post('/score',updateScore);
app.get('/leaderboard',getLeaderboard);
app.get('/questions', showQuestions);
app.listen(PORT,() => console.log(`Server started at ${PORT}`));