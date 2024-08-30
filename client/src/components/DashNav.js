import React from "react";
import "../style/dashNav.css";
import { useNavigate } from "react-router-dom";

const DashNav = ({ handleCreateQuiz, navToAnalytics, navToDashBoard }) => {
  const navigate = useNavigate();
  const logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userID");
    localStorage.removeItem("quizNameAndType");
    navigate("/login");
  };

  return (
    <div className="dashnav-body">
      <div className="dashnav-subBody">
        <div>
          <h1>QUIZZIE</h1>
        </div>
        <div className="dashNavBtn-container">
          <button className="navBtn" onClick={() => navToDashBoard()}>
            dashboard
          </button>
          <button className="navBtn" onClick={() => navToAnalytics()}>
            analytics
          </button>
          <button className="navBtn" onClick={() => handleCreateQuiz()}>
            create quizz
          </button>
        </div>
        <div className="logoutBtn-Div">
          <button className="logout-btn" onClick={logOut}>
            LOGOUT
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashNav;
