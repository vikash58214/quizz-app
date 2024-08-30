import React, { useEffect, useState } from "react";
import "../style/editQuiz.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditQuiz = () => {
  const navigate = useNavigate();
  const { quizID } = useParams();
  const [questions, setQuestions] = useState([]);

  const fetchQuiz = async () => {
    try {
      const response = await axios.get(
        `https://quizz-server-o2rw.onrender.com/getQuizz/${quizID}`
      );
      setQuestions(response.data.questions);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchQuiz();
  }, []);

  const handleInputChange = (index, e) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].question = e.target.value;
    setQuestions(updatedQuestions);
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        `https://quizz-server-o2rw.onrender.com/updateQuestion/${quizID}`,
        {
          questions: questions,
        }
      );
      window.alert(response.data.message);
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => {
    navigate("/dashboard");
  };
  return (
    <div className="edit-body">
      <div>
        <h1>Update Your Quiz</h1>
        {questions.map((question, index) => (
          <div key={index}>
            <p>Question {index + 1}</p>
            <input
              value={question.question}
              className="edit-input"
              type="text"
              onChange={(e) => handleInputChange(index, e)}
            />
          </div>
        ))}
        <div className="update-btn-container">
          <button className="update" onClick={handleUpdate}>
            Update
          </button>
          <button className="cnl" onClick={() => handleCancel()}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditQuiz;
