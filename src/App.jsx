import axios from "axios";
import { useEffect, useState } from "react";
import shuffleArray from "shuffle-array";

const App = () => {
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    axios
      .get(
        "https://the-trivia-api.com/v2/questions?categories=programming&limit=20"
      )
      .then((res) => {
        console.log(res.data);
        setQuestions(res.data);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  const nextQuestion = () => {
    if (index < questions.length - 1) {
      setIndex(index + 1);
    }
  };

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>Something went wrong</h2>;
  if (!questions.length) return <h2>No questions found</h2>;


  const options = shuffleArray(
    [
      ...questions[index].incorrectAnswers,
      questions[index].correctAnswer,
    ],
    { copy: true }
  );

  return (
    <>
      <h1>Quiz App</h1>

      <h2>
        Q{index + 1}. {questions[index].question.text}
      </h2>

      {options.map((item, i) => (
        <div key={i}>
          <input
            type="radio"
            name="question"
            id={`option-${i}`}
            value={item}
          />
          <label htmlFor={`option-${i}`}>{item}</label>
        </div>
      ))}

      <br />

      <button
        onClick={nextQuestion}
        disabled={index === questions.length - 1}
      >
        Next
      </button>
    </>
  );
};

export default App;
