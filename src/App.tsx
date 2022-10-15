import { SyntheticEvent, useState } from "react";
// Interface
import QuestionData from "./interface";
// Components
import StartView from "./components/StartView";
import Question from "./components/Question";
// Style
import "./style.css";

interface SelectedAnswers {
  [x: number]: {
    answer: string | null;
    correct: boolean | string;
    correct_answer: string;
  };
  correctCount: number;
}

function App() {
  const [questions, setQuestions] = useState<Array<QuestionData>>([]);
  const [selectedAnswers, setSelectedAnswers] = useState<SelectedAnswers>({
    correctCount: 0,
  });
  const [finished, setFinished] = useState(false);
  const [error, setError] = useState("");

  async function startQuiz() {
    const res = await fetch(
      "https://opentdb.com/api.php?amount=5&type=multiple"
    );
    const data = await res.json();
    setQuestions(data.results);
  }

  function changeAnswer(event: SyntheticEvent, index: number) {
    const { textContent } = event.target as HTMLElement;

    const newSelectedAnswers: SelectedAnswers = {
      ...selectedAnswers,
      [index]: {
        answer: textContent,
        correct: "pending",
        correct_answer: "",
      },
    };

    setSelectedAnswers(newSelectedAnswers);
    setError("");
  }

  function checkAnswers() {
    if (Object.keys(selectedAnswers).length < 6) {
      return setError("Please answer all the questions!");
    }
    for (let i = 0; i < 5; i++) {
      setSelectedAnswers((prev) => ({
        ...prev,
        [i]: {
          ...prev[i],
          correct_answer: questions[i].correct_answer,
          correct:
            selectedAnswers[i].answer === questions[i].correct_answer
              ? true
              : false,
        },
        correctCount:
          selectedAnswers[i].answer === questions[i].correct_answer
            ? prev.correctCount + 1
            : prev.correctCount,
      }));
    }
    setFinished(true);
  }

  function playAgain() {
    setQuestions([]);
    setSelectedAnswers({
      correctCount: 0,
    });
    setFinished(false);
  }

  return (
    <div className="container">
      {questions.length > 0 ? (
        <div className="questions-container">
          {questions.map((question, index) => (
            <Question
              key={index}
              questionData={question}
              selectedAnswer={selectedAnswers[index]}
              changeAnswer={(event: SyntheticEvent) =>
                changeAnswer(event, index)
              }
              finished={finished}
            />
          ))}
          {!finished ? (
            <>
              <button className="button check__button" onClick={checkAnswers}>
                Check answers
              </button>
              {error && error}
            </>
          ) : (
            <div className="finished-container">
              <span className="finished__text">
                You scored {selectedAnswers.correctCount}/5 correct answers
              </span>
              <button className="button" onClick={playAgain}>
                Play again
              </button>
            </div>
          )}
        </div>
      ) : (
        <StartView startQuiz={startQuiz} />
      )}
    </div>
  );
}

export default App;
