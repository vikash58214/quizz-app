import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../style/createQuiz.css";

const CreateQuiz = ({ handleQuizCancel, setCreateQuiz, setQuizStruct }) => {
  const [quizType, setQuizType] = useState("");
  const [quizName, setQuizName] = useState("");

  const handleValidation = () => {
    if (quizName === "" || quizType === "") {
      return false;
    } else {
      return true;
    }
  };

  const goToQuizStruct = () => {
    if (handleValidation()) {
      localStorage.setItem(
        "quizNameAndType",
        JSON.stringify({
          QuizzName: quizName,
          QuizzType: quizType,
        })
      );
      setCreateQuiz(false);
      setQuizStruct(true);
    } else {
      toast.error("Please select quiz name and type");
    }
  };

  const handleQuiztype = (quizValue) => {
    setQuizType(quizValue);
  };

  return (
    <>
      <div className="create-quiz-body">
        <div className="create-quiz-subBody">
          <div className="create-quiz-container">
            <input
              className="createQuiz-input"
              type="text"
              placeholder="Quiz name"
              value={quizName}
              onChange={(e) => {
                setQuizName(e.target.value);
              }}
            />
            <div className="quiz-midDiv">
              <p style={{ color: "gray", fontSize: "larger" }}>Quiz Type</p>
              <button
                className={
                  quizType === "qna"
                    ? "quizz-type-selected-option"
                    : "quizz-type-option"
                }
                onClick={() => handleQuiztype("qna")}
              >
                Q&A
              </button>
              <button
                className={
                  quizType === "poll"
                    ? "quizz-type-selected-option"
                    : "quizz-type-option"
                }
                onClick={() => handleQuiztype("poll")}
              >
                Poll Type
              </button>
            </div>
            <div className="quiz-bottom-div">
              <button
                onClick={() => handleQuizCancel()}
                className="quiz-cancel"
              >
                Cancel
              </button>
              <button
                className="quiz-continue"
                onClick={() => goToQuizStruct()}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default CreateQuiz;
