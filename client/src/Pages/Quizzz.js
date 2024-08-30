import React, { useEffect, useState } from "react";
import "../style/quizzz.css";
import OptionTxt from "../components/OptionTxt";
import OptionImg from "../components/OptionImg";
import OptionTxtImg from "../components/OptionTxtImg";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";

const Quizzz = () => {
  const navigate = useNavigate();
  const { quizzID } = useParams();
  const [quizz, setQuizz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(null);

  const fetchQuizz = async () => {
    try {
      const response = await axios.get(
        `https://quizz-server-o2rw.onrender.com/getQuizz/${quizzID}`
      );
      if (response.status === 200) {
        setQuizz(response.data);
        const initialTimer =
          response.data.questions[0].timer === "OFF"
            ? null
            : parseInt(response.data.questions[0].timer) / 1000;
        setTimer(initialTimer);
      } else {
        console.log("Error in fetching quiz data");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchQuizz();
  }, [quizzID]);

  useEffect(() => {
    let interval = null;
    if (timer && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      handleNextQuestion();
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleOptionSelect = (index) => {
    setSelectedOption(index);
  };

  const handleNextQuestion = () => {
    if (selectedOption !== null) {
      const currentQuestion = quizz.questions[currentQuestionIndex];
      const isCorrect = currentQuestion.options[selectedOption].correct;
      if (isCorrect) {
        setScore((prevScore) => prevScore + 1);
      }
    }
    setSelectedOption(null);
    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex < quizz.questions.length) {
      setCurrentQuestionIndex(nextIndex);
      const nextTimer =
        quizz.questions[nextIndex].timer === "OFF"
          ? null
          : parseInt(quizz.questions[nextIndex].timer) / 1000;
      setTimer(nextTimer);
    } else {
      console.log("Quiz completed. Final Score:", score);
    }
  };

  const handleSubmitQuiz = () => {
    if (selectedOption !== null) {
      const currentQuestion = quizz.questions[currentQuestionIndex];
      const isCorrect = currentQuestion.options[selectedOption].correct;
      if (isCorrect) {
        const updatedScore = score + 1;
        setScore(updatedScore);

        if (quizz.quizType === "qna") {
          navigate("/completed", { state: { score: updatedScore } });
        } else {
          navigate("/pollCompleted");
        }
      } else {
        if (quizz.quizType === "qna") {
          navigate("/completed", { state: { score: score } });
        } else {
          navigate("/pollCompleted");
        }
      }
    } else {
      if (quizz.quizType === "qna") {
        navigate("/completed", { state: { score: score } });
      } else {
        navigate("/pollCompleted");
      }
    }
  };

  if (!quizz) {
    return <div>Loading...</div>;
  }

  const currentQuestion = quizz.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === quizz.questions.length - 1;

  return (
    <div className="quizz-body">
      <div className="quizz-subBody">
        <div className="qn-timer">
          <p>
            {currentQuestionIndex + 1}/{quizz.questions.length}
          </p>
          <p style={{ color: "red" }}>
            {timer !== null ? `${timer}s` : "No Timer"}
          </p>
        </div>
        <h1 style={{ textAlign: "center", color: "#474444" }}>
          {currentQuestion.question}
        </h1>
        <div className="options-container">
          {currentQuestion.options.map((option, index) => {
            switch (currentQuestion.selectedOption) {
              case "text":
                return (
                  <div key={index} onClick={() => handleOptionSelect(index)}>
                    <OptionTxt
                      text={option.value}
                      isSelected={index === selectedOption}
                    />
                  </div>
                );
              case "Image URL":
                return (
                  <div key={index} onClick={() => handleOptionSelect(index)}>
                    <OptionImg
                      src={option.value}
                      isSelected={index === selectedOption}
                    />
                  </div>
                );
              case "txtImg":
                return (
                  <div key={index} onClick={() => handleOptionSelect(index)}>
                    <OptionTxtImg
                      text={option.value}
                      imgSrc={option.value2}
                      isSelected={index === selectedOption}
                    />
                  </div>
                );
              default:
                return null;
            }
          })}
        </div>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          {isLastQuestion ? (
            <button className="quizzz-nxt-btn" onClick={handleSubmitQuiz}>
              SUBMIT
            </button>
          ) : (
            <button className="quizzz-nxt-btn" onClick={handleNextQuestion}>
              NEXT
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quizzz;
