import "../style/quizPublished.css";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";

const QuizPublished = ({ setShareLink, quizId }) => {
  const link = `${window.location.origin}/quizz/${quizId}`;

  const handleLinkCopy = () => {
    navigator.clipboard.writeText(link).then(() => {
      toast.success("Link copied to clipboard");
    });
  };

  return (
    <>
      <div className="quiz-publish-body">
        <div className="quiz-publish-subBody">
          <div className="quiz-publish-container">
            <h1
              style={{
                textAlign: "center",
                fontSize: "40px",
                marginBottom: "0px",
                color: "#474444",
              }}
            >
              Congrats your Quiz is Published!
            </h1>

            <div className="quiz-publish-input">{link}</div>
            <button className="share-link" onClick={handleLinkCopy}>
              Share
            </button>
            <button
              className="share-link-x"
              onClick={() => setShareLink(false)}
            >
              X
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default QuizPublished;
