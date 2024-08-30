import React, { useState } from "react";
import "../style/quizStruct.css";
import Tab from "./Tab";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TypeTxt from "./TypeTxt";
import TypeTxtAndImg from "./TypeTxtAndImg";
import axios from "axios";

const QuizStruct = ({
  structQuizCancel,
  setShareLink,
  setQuizID,
  fetchQuiz,
}) => {
  const [quizQues, setQuizQues] = useState("");
  const [selectedOption, setSelectedOption] = useState("text");
  const [quiz, setQuiz] = useState([]);
  const [timer, setTimer] = useState("OFF");
  const [options, setOptions] = useState([
    { value: "", value2: "", correct: false },
    { value: "", value2: "", correct: false },
  ]);

  const getQuizName = JSON.parse(localStorage.getItem("quizNameAndType"));
  const handleValidation = () => {
    if (quizQues === "") {
      return false;
    }

    for (let i = 0; i < options.length; i++) {
      if (options[i].value === "") {
        return false;
      }
    }

    return true;
  };

  const handleAddQuizQues = () => {
    if (handleValidation()) {
      setQuiz([
        ...quiz,
        { options, selectedOption: selectedOption, question: quizQues, timer },
      ]);
      setQuizQues("");
      setOptions([
        { value: "", value2: "", correct: false },
        { value: "", value2: "", correct: false },
      ]);
    } else {
      toast.error("Please provide all fields");
    }
  };

  const submitQuiz = async () => {
    if (handleValidation()) {
      if (quizQues.trim() !== "") {
        setQuiz((prevQuiz) => [
          ...prevQuiz,
          {
            options,
            selectedOption: selectedOption,
            question: quizQues,
            timer: timer,
          },
        ]);
      }
      const userID = localStorage.getItem("userID");

      try {
        const response = await axios.post(
          "https://quizz-server-o2rw.onrender.com/createQuiz",
          {
            userId: userID,
            quizName: getQuizName.QuizzName,
            quizType: getQuizName.QuizzType,
            questions: [
              ...quiz,
              {
                options,
                selectedOption: selectedOption,
                question: quizQues,
                timer: timer,
              },
            ],
          }
        );

        if (response.status === 201) {
          setQuizID(response.data.quiz._id);
          fetchQuiz();
          structQuizCancel();
          setShareLink(true);
        } else {
          console.error("Error saving quiz:", response.data.message);
        }
      } catch (error) {
        console.error(
          "Error submitting quiz:",
          error.response ? error.response.data : error.message
        );
      }
    } else {
      toast.error("Please provide all fields");
    }
  };

  const handleTypeChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const addOption = () => {
    if (options.length < 4) {
      setOptions([...options, { value: "", value2: "", correct: false }]);
    }
  };

  const handleInputChange = (index, event, field) => {
    const newOptions = options.map((option, i) => {
      if (i === index) {
        return { ...option, [field]: event.target.value };
      }
      return option;
    });
    setOptions(newOptions);
  };

  const handleCorrectChange = (index) => {
    const newOptions = options.map((option, i) => {
      return { ...option, correct: i === index };
    });
    setOptions(newOptions);
  };

  return (
    <>
      <div className="quiz-struct-body">
        <div className="quiz-struct-subBody">
          <div className="quiz-struct-container">
            <div className="quiz-struct-tab-body">
              <div className="quiz-struct-tab-container">
                <Tab tabCount={1} />
                {quiz.map((_, index) => (
                  <div key={index}>
                    <Tab tabCount={index + 2} />
                  </div>
                ))}
                {quiz.length < 4 && (
                  <button className="quiz-add-btn" onClick={handleAddQuizQues}>
                    +
                  </button>
                )}
              </div>
              <p className="max-5">Max 5 questions</p>
            </div>
            <input
              className="quiz-struct-input"
              type="text"
              placeholder="question"
              value={quizQues}
              onChange={(e) => setQuizQues(e.target.value)}
            />
            <div className="option-type-container">
              <p className="option-p">Option type</p>
              <div className="radio-div">
                <input
                  type="radio"
                  onChange={handleTypeChange}
                  checked={selectedOption === "text"}
                  id="text"
                  name="quizType"
                  value="text"
                />
                <label htmlFor="text">Text</label>
              </div>
              <div className="radio-div">
                <input
                  type="radio"
                  checked={selectedOption === "Image URL"}
                  onChange={handleTypeChange}
                  id="imgUrl"
                  name="quizType"
                  value="Image URL"
                />
                <label htmlFor="imgUrl">Image URL</label>
              </div>
              <div className="radio-div">
                <input
                  type="radio"
                  checked={selectedOption === "txtImg"}
                  onChange={handleTypeChange}
                  id="txtImg"
                  name="quizType"
                  value="txtImg"
                />
                <label htmlFor="txtImg">Text & Image URL</label>
              </div>
            </div>

            <div className="struct-quiz-options-timer">
              <div style={{ width: "50%", marginTop: "30px" }}>
                {selectedOption === "txtImg"
                  ? options.map((option, index) => (
                      <TypeTxtAndImg
                        key={index}
                        selectedOption={selectedOption}
                        checked={option.correct}
                        handleCorrectChange={handleCorrectChange}
                        index={index}
                        handleInputChange={handleInputChange}
                        value1={option.value}
                        value2={option.value2}
                      />
                    ))
                  : options.map((option, index) => (
                      <TypeTxt
                        key={index}
                        selectedOption={selectedOption}
                        checked={option.correct}
                        handleCorrectChange={handleCorrectChange}
                        index={index}
                        handleInputChange={handleInputChange}
                        value={option.value}
                      />
                    ))}
                {options.length < 4 && (
                  <button className="add-option-btn" onClick={addOption}>
                    Add option
                  </button>
                )}
              </div>
              <div className="timer-body">
                <p className="timer-p">Timer</p>
                <button
                  className={
                    timer === "OFF" ? "timer-selected-btn" : "timer-btn"
                  }
                  onClick={() => setTimer("OFF")}
                >
                  OFF
                </button>
                <button
                  className={
                    timer === "5000" ? "timer-selected-btn" : "timer-btn"
                  }
                  onClick={() => setTimer("5000")}
                >
                  5 sec
                </button>
                <button
                  className={
                    timer === "10000" ? "timer-selected-btn" : "timer-btn"
                  }
                  onClick={() => setTimer("10000")}
                >
                  10 sec
                </button>
              </div>
            </div>
            <div className="quiz-struct-btns-container">
              <button className="struct-cancel-btn" onClick={structQuizCancel}>
                Cancel
              </button>
              <button className="struct-createQuiz-btn" onClick={submitQuiz}>
                Create Quiz
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default QuizStruct;
