import { useContext, useEffect,useState } from "react";
import { UserContext } from "../context/UserContext";
import {Trophy} from 'lucide-react';
function Leaderboard(){
    const {formData, setFormData, quizState, setQuizState, setGameStarted, INITIAL_TIME} = useContext(UserContext);
    const [leaderboard, setLeaderboard] = useState([]);
    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    const handleRetry = () => {
        setGameStarted(true);
        setQuizState((prev) => ({
            ...prev,
            currentQuestion: 0,
            timeRemaining: INITIAL_TIME,
            score: 0,
            isFinished: false
        }))
    }

    const handleExit = () => {
        setGameStarted(false);
        setQuizState((prev) => ({
            ...prev,
            currentQuestion: 0,
            timeRemaining: INITIAL_TIME,
            score: 0,
            isFinished: false,
        }))
        setFormData({
            username: "",
            email: "",
            password: ""
        })
    }

    useEffect(() => {
        const fetchLeaderboard = async () => {
            try{
                const response = await fetch(`${baseUrl}/leaderboard`);
                const data = await response.json();
                if(response.ok){
                    setLeaderboard(data);
                }else {
                    console.log("Error in fetching leaderboard");
                }
            }
            catch(err){
                console.log(err);
            }
        }
        fetchLeaderboard();
    },[]);
    return(
        <div className="bg-gray-100 min-h-screen flex justify-center items-center">
            <div className="flex-col p-8 justify-center text-center bg-white shadow-lg rounded-3xl w-2/5">
                <div className="bg-gray-100 p-3 rounded-lg">
                    <h1 className="text-xl font-bold mb-5 mt-4">Quiz finished, <i className="text-blue-400">{formData.username}</i>!</h1>
                    <div className="flex justify-between text-md gap-6 px-12 mt-3 mb-4">
                        <h1>Your score: <strong className="text-blue-400">{quizState.score}/{quizState.totalQuestions}</strong></h1>
                        <h1>Time taken: <strong className="text-blue-400">{INITIAL_TIME - quizState.timeRemaining} seconds</strong> </h1>
                    </div>
                </div>
                <div className="p-5 ">
                    <div className="mt-3 mb-8 flex justify-center gap-3 items-center">
                    <Trophy className="text-yellow-400 h-8 w-8"/>
                    <h1 className="text-2xl font-bold text-gray-800">Leaderboard</h1>
                </div>
                <div className="mt-4 flex justify-center">
                    <table className="w-full">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="text-gray-500 uppercase tracking-wider px-6 py-3 text-left text-xs font-medium">Rank</th>
                                <th className="text-gray-500 uppercase tracking-wider px-6 py-3 text-left text-xs font-medium">Player name</th>
                                <th className="text-gray-500 uppercase tracking-wider px-6 py-3 text-left text-xs font-medium">Score</th>
                                <th className="text-gray-500 uppercase tracking-wider px-6 py-3 text-left text-xs font-medium">Time taken</th>
                            </tr>
                        </thead>
                        <tbody className=" divide-y divide-gray-300">
                            {leaderboard.map((player, index) => (
                                <tr className={` mt-5 ${(index+1 == 1) ? "bg-yellow-100" : ""}`} key={index}>
                                <td><i>{index + 1}</i></td>
                                <td className="py-4 px-6 text-left font-semibold">{player.username}</td>
                                <td className="py-4 px-6 text-left">{player.highestScore}</td>
                                <td className="py-4 px-6 text-left">{player.recordTimeTaken}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                </div>
                <div className="flex justify-center gap-8">
                    <button className="bg-blue-400 px-3 py-2 rounded-lg text-white" onClick={handleRetry}>Retry</button>
                    <button className="bg-blue-400 px-4 py-2 rounded-lg text-white" onClick={handleExit}>Exit</button>
                </div>
            </div>
        </div>
    )
}
export default Leaderboard