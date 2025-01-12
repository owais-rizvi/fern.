const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');

const createUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const isUser = await userModel.findOne({ username });
    if (isUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await userModel.create({
      username,
      email,
      password: hashedPassword,
    });

    console.log(`User ${username} created successfully.`);
    return res.status(201).json({ message: 'User registered successfully', user: { username, email } });
  } catch (err) {
    console.error('Error during user creation:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const userExists = await userModel.findOne({ username });
    if (!userExists) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const passMatch = await bcrypt.compare(password, userExists.password);
    if (!passMatch) {
      return res.status(401).json({ message: 'Incorrect username or password.' });
    }

    console.log(`User ${username} has logged in successfully.`);
    return res.status(200).json({
      message: 'User logged in successfully',
      user: { username: userExists.username, email: userExists.email },
    });
  } catch (err) {
    console.error('Error during user login:', err);
    return res.status(500).json({ message: 'Internal server error during login.' });
  }
};
const updateScore = async (req,res) => {
    const {username, score, timeTaken} = req.body;
    try{
        const user = await userModel.findOne({username});
        if(!user) return res.status(404).json({message: 'User not found.'});
        user.currentScore = score;
        user.timeTaken = timeTaken;
        if(score > user.highestScore){
            user.highestScore = score;
            user.recordTimeTaken = timeTaken;
        }
        await user.save();
        console.log(`Score updated for ${username}: ${score}`);
        return res.status(200).json({message: "Successfully updated the score to db"});
    } catch(err){
        console.log('Error during score updation', err);
    }
}

module.exports = { createUser, loginUser, updateScore } ;
