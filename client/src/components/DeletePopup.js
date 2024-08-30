import axios from "axios";
import React from "react";

const DeletePopup = ({
  cancelDelete,
  setDeleteQuiz,
  quizId,
  setQuiz,
  quizs,
}) => {
  const handleDelete = async (quizID) => {
    try {
      await axios.delete(
        `https://quizz-server-o2rw.onrender.com/deleteQuiz/${quizID}`
      );

      const updatedQuizs = quizs.filter((quiz) => quiz._id !== quizID);
      setQuiz(updatedQuizs);
      setDeleteQuiz(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="delete-body">
      <div>
        <div className="delete-heading">
          Are you confirm you want to delete ?
        </div>
        <div className="delete-container">
          <button
            onClick={() => {
              handleDelete(quizId);
            }}
          >
            Confirm Delete
          </button>
          <button className="cancel-delete" onClick={cancelDelete}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeletePopup;
