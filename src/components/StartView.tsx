import React from "react";

interface StartProp {
  startQuiz: any;
}

function StartView({ startQuiz }: StartProp) {
  return (
    <div className="start">
      <h1 className="start__heading">Quizzical</h1>
      <p>Some description if needed</p>
      <button className="button start__button" onClick={startQuiz}>
        Start quiz
      </button>
    </div>
  );
}

export default StartView;
