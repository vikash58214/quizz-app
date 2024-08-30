import React from "react";

const OptionTxtImg = ({ text, imgSrc, onClick, isSelected }) => {
  return (
    <div
      onClick={onClick}
      style={{
        border: isSelected ? "2px solid blue" : "1px solid grey",
        cursor: "pointer",
        padding: "10px",
        margin: "5px",
      }}
    >
      <p>{text}</p>
      <img
        src={imgSrc}
        alt="Option"
        style={{ maxWidth: "100%", maxHeight: "100px" }}
      />
    </div>
  );
};

export default OptionTxtImg;
