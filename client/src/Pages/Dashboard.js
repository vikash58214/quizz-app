import React, { useEffect, useState } from "react";
import DashNav from "../components/DashNav";
import "../style/dashboard.css";
import QuizzCard from "../components/QuizzCard";
import CreateQuiz from "./CreateQuiz";
import QuizStruct from "../components/QuizStruct";
import QuizPublished from "../components/QuizPublished";
import axios from "axios";
import Analytics from "./Analytics";

const Dashboard = () => {
  const [createQuiz, setCreateQuiz] = useState(false);
  const [quizStruct, setQuizStruct] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [quizId, setQuizID] = useState("");
  const [quizs, setQuiz] = useState([]);
  const [shareLink, setShareLink] = useState(false);
  const [userID, setUserID] = useState("");

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "https://quizz-server-o2rw.onrender.com/getUser",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const fetchedUserID = response.data._id;
      setUserID(fetchedUserID);
      localStorage.setItem("userID", response.data._id);
    } catch (error) {
      console.log(error);
    }
  };

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

  const totalQuestion = quizs.reduce((total, quiz) => {
    return total + quiz.questions.length;
  }, 0);

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    if (userID) {
      fetchQuiz();
    }
  }, [userID]);

  const structQuizCancel = () => {
    setQuizStruct(false);
  };

  const handleCreateQuiz = () => {
    setCreateQuiz(true);
  };
  const handleQuizCancel = () => {
    setCreateQuiz(false);
  };
  const navToAnalytics = () => {
    setAnalytics(true);
  };

  const navToDashBoard = () => {
    setAnalytics(false);
  };
  return (
    <>
      <div style={{ display: "flex" }}>
        <DashNav
          handleCreateQuiz={handleCreateQuiz}
          navToAnalytics={navToAnalytics}
          navToDashBoard={navToDashBoard}
        />
        {analytics ? (
          <Analytics />
        ) : (
          <div className="dashboard-body">
            <div className="dashboard-subBody">
              <div className="dashboard-analytics">
                <div className="dashboard-total-quizz">
                  <div>
                    <h1 className="quizz-h1">{quizs.length}</h1>
                    <p className="quizz-p">Quiz created</p>
                  </div>
                </div>
                <div className="dashboard-total-quizz">
                  <div>
                    <h1 className="q-created-h1">{totalQuestion}</h1>
                    <p className="q-created-p">Question Created</p>
                  </div>
                </div>
                <div className="dashboard-total-quizz">
                  <div>
                    <h1 className="impression-h1">0</h1>
                    <p className="impression-p">Quiz Impression</p>
                  </div>
                </div>
              </div>
              <div className="dashboard-trending-body">
                <div>
                  <h2 className="trending-h1">Trending Quizs</h2>
                </div>
                <div className="quizz-card-body">
                  {quizs.map((quiz) => {
                    const formattedDate = new Date(
                      quiz.createdAt
                    ).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    });

                    return (
                      <div key={quiz._id}>
                        <QuizzCard
                          quizName={quiz.quizName}
                          date={formattedDate}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {createQuiz && (
        <CreateQuiz
          setQuizStruct={setQuizStruct}
          setCreateQuiz={setCreateQuiz}
          handleQuizCancel={handleQuizCancel}
        />
      )}
      {quizStruct && (
        <QuizStruct
          setShareLink={setShareLink}
          structQuizCancel={structQuizCancel}
          setQuizID={setQuizID}
          fetchQuiz={fetchQuiz}
        />
      )}
      {shareLink && (
        <QuizPublished
          shareLink={shareLink}
          quizId={quizId}
          setShareLink={setShareLink}
        />
      )}
    </>
  );
};

export default Dashboard;
