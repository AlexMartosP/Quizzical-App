interface AnswerProps {
  answer: string;
  selectedAnswer: {
    answer: string | null;
    correct: string | boolean;
  };
  changeAnswer: any;
  finished: boolean;
  correctAnswer: string;
}

function Answer({
  answer,
  selectedAnswer,
  changeAnswer,
  finished,
  correctAnswer,
}: AnswerProps) {
  let styles;

  if (finished) {
    if (
      (selectedAnswer.correct === true && answer === selectedAnswer.answer) ||
      (selectedAnswer.correct === false && answer === correctAnswer)
    ) {
      styles = {
        backgroundColor: "#94d7a2",
        borderColor: "#94d7a2",
      };
    } else if (
      selectedAnswer?.correct === false &&
      answer === selectedAnswer?.answer
    ) {
      styles = {
        backgroundColor: "#f8bcbc",
        borderColor: "#f8bcbc",
        color: "#29326494",
      };
    }
  }

  return (
    <button
      className={`answer ${
        selectedAnswer?.answer === answer ? "selected" : ""
      }`}
      onClick={changeAnswer}
      disabled={finished ? true : false}
      style={styles}
    >
      {answer}
    </button>
  );
}

export default Answer;
