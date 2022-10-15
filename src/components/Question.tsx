import { useEffect, useState } from "react";
import { decode } from "html-entities";
import Answer from "./Answer";
import QuestionData from "../interface";

interface QuestionProps {
  questionData: QuestionData;
  selectedAnswer: {
    answer: string | null;
    correct: string | boolean;
  };
  changeAnswer: any;
  finished: boolean;
}

function Question({
  questionData,
  selectedAnswer,
  changeAnswer,
  finished,
}: QuestionProps) {
  const [answers, setAnswers] = useState<string[]>([]);

  useEffect(() => {
    const newAnswers = [...questionData.incorrect_answers];
    const randomIndex = Math.floor(Math.random() * 4);

    newAnswers.splice(randomIndex, 0, questionData.correct_answer);

    setAnswers(newAnswers);
  }, []);

  return (
    <div className="question">
      <h2 className="question-title">{decode(questionData.question)}</h2>
      <div className="answers-list">
        {answers.map((answer, index) => (
          <Answer
            key={index}
            answer={answer}
            selectedAnswer={selectedAnswer}
            changeAnswer={changeAnswer}
            finished={finished}
            correctAnswer={questionData.correct_answer}
          />
        ))}
      </div>
    </div>
  );
}

export default Question;
