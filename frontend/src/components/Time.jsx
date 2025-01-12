import { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { Timer } from "lucide-react";
function Time({finishQuiz}){
    const {quizState,setQuizState,gameStarted} = useContext(UserContext);
    const timeRemaining = quizState.timeRemaining;
    const minutes = Math.floor(timeRemaining/60);
    const seconds = timeRemaining % 60;
    useEffect(() => {
        let timer;
        if (gameStarted && !quizState.isFinished && quizState.timeRemaining > 0) {
          timer = window.setInterval(() => {
            setQuizState(prevQuizState => {
              if (prevQuizState.timeRemaining <= 1) {
                finishQuiz();
                return { ...prevQuizState, timeRemaining: 0 };
              }
              return { ...prevQuizState, timeRemaining: prevQuizState.timeRemaining - 1 };
            });
          }, 1000);
        }
        return () => clearInterval(timer);
      }, [gameStarted, quizState.isFinished]);


    return(
        <div className="flex items-center gap-3 ml-96">
            <Timer className="text-blue-500 w-6 h-6"/>
            <h1 className="text-xl" id="tim">{minutes.toString().padStart(2,'0')}:{seconds.toString().padStart(2,'0')}</h1>
        </div>
    );
}
export default Time;