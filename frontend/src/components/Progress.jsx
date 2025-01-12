import { useContext } from "react";
import { UserContext } from "../context/UserContext";

function Progress(){
    const {quizState, setQuizState} = useContext(UserContext);
    const currentQuestion = quizState.currentQuestion;
    const totalQuestions = quizState.totalQuestions;
    return(
        <div className="flex-col pl-4 pt-2">
            <div className="flex justify-between">
                <h3>Question {currentQuestion+1} of {totalQuestions}</h3>
                <h3 className="pr-4">Score: {quizState.score}</h3>
            </div>
            <div className="pr-4 pt-4">
                <div className="bg-gray-300 h-2 max-w-full rounded">
                    <div className="rounded transition-all bg-blue-500 h-2" style={{width:`${(((currentQuestion+1)/totalQuestions)*100)}%`}}></div>
                </div>
            </div>
        </div>
    );
}
export default Progress;