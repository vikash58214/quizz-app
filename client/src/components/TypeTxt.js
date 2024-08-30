import React from "react";

const TypeTxt = ({
  checked,
  handleCorrectChange,
  value,
  index,
  handleInputChange,
  selectedOption,
}) => {
  const quizzTypeObj = JSON.parse(localStorage.getItem("quizNameAndType"));
  const quizzType = quizzTypeObj.QuizzType;
  return (
    <div>
      {quizzType === "qna" && (
        <input
          type="radio"
          checked={checked}
          name="correctOption"
          onChange={() => handleCorrectChange(index)}
        />
      )}

      <input
        className="add-options-input"
        type="text"
        placeholder={selectedOption}
        onChange={(e) => {
          handleInputChange(index, e, "value");
        }}
        value={value}
      />
    </div>
  );
};

export default TypeTxt;
