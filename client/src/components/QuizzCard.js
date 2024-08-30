import React from "react";
import "../style/quizzCard.css";

const QuizzCard = ({ quizName, date }) => {
  return (
    <div className="quizz-card-bodyy">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <span className="quizzName">{quizName}</span>{" "}
        <span className="quizzNum">4</span>
      </div>
      <div className="quizzDate">Created on : {date}</div>
    </div>
  );
};

export default QuizzCard;
