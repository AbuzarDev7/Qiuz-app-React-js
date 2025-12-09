import axios from "axios";
import { useEffect, useRef, useState } from "react";
import shuffleArray from "shuffle-array";
import './index.css'
const App = () => {
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState(false);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const inputRef = useRef([]);

  useEffect(() => {
    axios
      .get(
        "https://the-trivia-api.com/v2/questions?categories=programming&limit=20"
      )
      .then((res) => setQuestions(res.data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>Something went wrong</h2>;

  if (result) {
    return (
  <div className="result-bg">
  <div className="result-card">

    <h1 className="result-title">Quiz Finished </h1>

    <div className="score-box">
      <p className="score-text">Your Score</p>
      <h2 className="score-number">
        {score} <span>/ {questions.length}</span>
      </h2>
    </div>

    <p className="score-msg">
      {score >= questions.length / 2
        ? "Great job! You did really well "
        : "Nice try! Keep practicing "}
    </p>

  </div>
</div>

      
    );
  }

  const current = questions[index];

  const options = shuffleArray(
    [...current.incorrectAnswers, current.correctAnswer],
    { copy: true }
  );

  const nextQuestion = () => {
    
    const selectedOption = inputRef.current.find(
      (input) => input && input.checked
    );

    if (!selectedOption) return;

  
    if (selectedOption.value === current.correctAnswer) {
      setScore((prev) => prev + 1);
    }

    inputRef.current.forEach((input) => {
      if (input) input.checked = false;
    });

    if (index === questions.length - 1) {
      setResult(true);
    } else {
      setIndex((prev) => prev + 1);
    }
  };

  return (
    <>
 

     <div className="app-bg">
  <div className="quiz-box">

    <h1 className="quiz-title">Quiz App</h1>

    <p className="quiz-count">
      Question {index + 1} of {questions.length}
    </p>

    <h2 className="quiz-question">
      {current.question.text}
    </h2>

    <div className="quiz-options">
      {options.map((item, i) => (
        <label key={i} className="quiz-option">
          <input
            type="radio"
            name="question"
            value={item}
            ref={(el) => (inputRef.current[i] = el)}
          />
          <span>{item}</span>
        </label>
      ))}
    </div>

    <div className="quiz-footer">
    
      <button className="quiz-btn" onClick={nextQuestion}>
        {index === questions.length - 1 ? "Finish Quiz" : "Next"}
      </button>
    </div>

  </div>
</div>

    </>
  );
};

export default App;
