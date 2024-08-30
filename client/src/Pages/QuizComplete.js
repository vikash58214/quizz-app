import React from "react";
import img1 from "../assets/congoImg.png";
import { useLocation } from "react-router-dom";
import "../style/completedQ.css";

const QuizComplete = () => {
  const location = useLocation();
  const { score } = location.state || { score: 0 };
  return (
    <div className="completed-body">
      <div className="completed-subBody">
        <h1 style={{ color: "#474444" }}>Congrats Quiz is completed</h1>
        <div className="img">
          <img style={{ width: "100%" }} src={img1} alt="img" />
        </div>
        <div className="score">
          <span style={{ color: "#474444" }}>Your Score is </span>
          <span style={{ color: "green" }}>{score}</span>
        </div>
      </div>
    </div>
  );
};

export default QuizComplete;
