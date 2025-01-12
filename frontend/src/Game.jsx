import { Brain } from "lucide-react";
import { UserContext } from "./context/UserContext";
import { useContext, useEffect } from "react";
import Time from "./components/Time";
import Progress from "./components/Progress";
import Question from "./components/Question";
import Leaderboard from "./components/Leaderboard";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

function Game(){
    const { formData, quizState, setQuizState,gameStarted, INITIAL_TIME} = useContext(UserContext);
    function finishQuiz(){
        setQuizState((prevQuizState) => ({
            ...prevQuizState,
            isFinished: true,
        }))
    }

    const submitScore = async (username, score, timeTaken) => {
        try {
            const response = await fetch(`${baseUrl}/score`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({username,score, timeTaken})
            })
            const data = await response.json();
            if(response.ok){
                console.log('Score submitted successfully.', data);
            }else {
                console.log('Failed to submit the score.',data);
            }
        } catch(err){
            console.log('Error in submission of score',err);
        }
    }

    useEffect(()=> {
        if(quizState.isFinished){
            submitScore(formData.username, quizState.score, INITIAL_TIME - quizState.timeRemaining);
        }
    },[quizState.isFinished])

    if(gameStarted && !quizState.isFinished){
        return(
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="bg-white p-4 shadow-lg rounded-md max-w-3xl w-full">
                    <div className="flex items-center gap-5 p-4 justify-between">
                        <div className="flex gap-4 items-center">
                            <Brain className="text-blue-500 w-10 h-10"/>
                            <h1 className="text-2xl font-bold">fern. time!</h1>
                        </div>
                        <Time finishQuiz={finishQuiz} />
                    </div>
                    <Progress/>
                    <Question/>
                </div>
            </div>
        );
    }
        if(quizState.isFinished){
            return(
                <Leaderboard/>
            )
        }
    }
export default Game;