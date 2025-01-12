import { useState } from "react";
import Register from "./components/Register";
import { UserContext } from './context/UserContext';
import Game from "./Game";

function App(){
  const INITIAL_TIME = 15;
  const [playerName, setPlayerName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [gameStarted,setGameStarted] = useState(false);
  const [quizState, setQuizState] = useState({
    currentQuestion: 0,
    totalQuestions: 5,
    timeRemaining: INITIAL_TIME,
    score: 0,
    isFinished: false
  })
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState('');
  if(gameStarted){
    return(
      <UserContext.Provider value={{error, setError,formData,setFormData,quizState,setQuizState,gameStarted,setGameStarted,playerName,setPlayerName,email,setEmail,password,setPassword,INITIAL_TIME}}>
        <Game/>
      </UserContext.Provider>
    );
  }
  return(
    <UserContext.Provider value={{error, setError,formData,setFormData,playerName,setPlayerName,gameStarted,setGameStarted, quizState, setQuizState, email, setEmail,password,setPassword}}>
      <Register/>
    </UserContext.Provider>
  );
}
export default App;