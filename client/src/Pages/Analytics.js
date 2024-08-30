import React, { useEffect, useState } from "react";
import "../style/analytics.css";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import DeletePopup from "../components/DeletePopup";
import { useNavigate } from "react-router-dom";

const Analytics = () => {
  const navigate = useNavigate();
  const [quizs, setQuiz] = useState([]);
  const [deleteQuiz, setDeleteQuiz] = useState(false);
  const [quizId, setQuizId] = useState("");

  const userID = localStorage.getItem("userID");

  const fetchQuiz = async () => {
    try {
      const response = await axios.get(
        `https://quizz-server-o2rw.onrender.com/allQuiz/${userID}`
      );
      setQuiz(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchQuiz();
  }, []);

  const handleDelete = (quizID) => {
    setQuizId(quizID);
    setDeleteQuiz(true);
  };
  const cancelDelete = () => {
    setDeleteQuiz(false);
  };

  const copyLink = (quizID) => {
    const link = `${window.location.origin}/quizz/${quizID}`;
    navigator.clipboard.writeText(link).then(() => {
      toast.success("LInk copied to clipBoard");
    });
  };

  const editQuiz = (quizID) => {
    navigate(`/edit-quiz/${quizID}`);
  };

  return (
    <>
      <div className="analytics-body">
        <div className="analytics-subBody">
          <div>Quiz Analysis</div>
          <div>
            <table>
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Quiz Name</th>
                  <th>Created on</th>
                  <th>Impression</th>
                  <th>Edit</th>
                  <th>Quiz</th>
                </tr>
              </thead>
              <tbody>
                {quizs.map((quiz, index) => {
                  const formattedDate = new Date(
                    quiz.createdAt
                  ).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  });
                  return (
                    <tr key={quiz._id}>
                      <td>{index + 1}</td>
                      <td>{quiz.quizName}</td>
                      <td>{formattedDate}</td>
                      <td>345</td>
                      <td>
                        <span
                          className="edit-icon"
                          onClick={() => editQuiz(quiz._id)}
                        >
                          ✏️
                        </span>
                        <span
                          className="delete-icon"
                          onClick={() => handleDelete(quiz._id)}
                        >
                          🗑️
                        </span>
                        <span
                          className="share-icon"
                          onClick={() => copyLink(quiz._id)}
                        >
                          🔗
                        </span>
                      </td>
                      <td>Question Wise Analysis</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <ToastContainer />
      {deleteQuiz && (
        <DeletePopup
          cancelDelete={cancelDelete}
          setDeleteQuiz={setDeleteQuiz}
          quizId={quizId}
          quizs={quizs}
          setQuiz={setQuiz}
        />
      )}
    </>
  );
};

export default Analytics;
