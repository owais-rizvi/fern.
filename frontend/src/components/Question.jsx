import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";

function Question() {
  const { quizState, setQuizState } = useContext(UserContext);
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const fetchQuestions = async () => {
    try {
      const response = await fetch(`${baseUrl}/questions`);
      const data = await response.json();
      return data;
    } catch (err) {
      console.log("Error fetching the questions.", err);
      return [];
    }
  };

  const getRandomQuestions = (questions) => {
    const randomQuestions = [...questions];
    for (let i = randomQuestions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [randomQuestions[i], randomQuestions[j]] = [randomQuestions[j], randomQuestions[i]];
    }
    return randomQuestions.slice(0, 5);
  };

  const [questions, setQuestions] = useState([]);
  const [randomQuestions, setRandomQuestions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    const fetchAndPickQuestions = async () => {
      const fetchedQuestions = await fetchQuestions();
      const selectedQuestions = getRandomQuestions(fetchedQuestions);
      setQuestions(fetchedQuestions);
      setRandomQuestions(selectedQuestions);
    };
    fetchAndPickQuestions();
  }, []); 

  if (quizState.currentQuestion >= randomQuestions.length) return null;

  const options = randomQuestions[quizState.currentQuestion]?.options || [];

  const handleAnswer = (index) => {
    const correctAnswer = index === randomQuestions[quizState.currentQuestion].correctAnswer;
    setSelectedOption(index);
    setIsCorrect(correctAnswer);
    setTimeout(() => {
      setQuizState((prev) => {
        const newScore = correctAnswer ? prev.score + 1 : prev.score;
        const isFinished = prev.currentQuestion >= randomQuestions.length - 1;
        return {
          ...prev,
          score: newScore,
          currentQuestion: isFinished ? prev.currentQuestion : prev.currentQuestion + 1,
          isFinished: isFinished,
        };
      });
    }, 500);
    setTimeout(() => setSelectedOption(null), 300);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold">{randomQuestions[quizState.currentQuestion]?.question}</h1>
      <div className="pt-4 flex-col">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(index)}
            className={`p-4 m-2 border-2 w-5/6 text-left rounded-lg border-gray-200 hover:border-blue-200 transition-colors ${
              selectedOption === index ? (isCorrect ? "bg-green-200" : "bg-red-200") : ""
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Question;
