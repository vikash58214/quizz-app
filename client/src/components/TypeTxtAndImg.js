import React from "react";

const TypeTxtAndImg = ({
  checked,
  handleCorrectChange,
  value1,
  value2,
  index,
  handleInputChange,
}) => {
  const quizzTypeObj = JSON.parse(localStorage.getItem("quizNameAndType"));
  const quizzType = quizzTypeObj.QuizzType;
  return (
    <div style={{ width: "500px", display: "flex" }}>
      {quizzType === "qna" && (
        <input
          type="radio"
          name="correctOption"
          checked={checked}
          onChange={() => handleCorrectChange(index)}
        />
      )}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <input
          style={{ width: "220px" }}
          className="add-options-input"
          type="text"
          placeholder="Text"
          onChange={(e) => {
            handleInputChange(index, e, "value");
          }}
          value={value1}
        />
        <input
          style={{ width: "220px" }}
          className="add-options-input"
          type="text"
          placeholder="Image URL"
          onChange={(e) => {
            handleInputChange(index, e, "value2");
          }}
          value={value2}
        />
      </div>
    </div>
  );
};

export default TypeTxtAndImg;
