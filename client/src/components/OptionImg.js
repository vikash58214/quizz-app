import React from "react";

const OptionImg = ({ src, onClick, isSelected }) => {
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
      <img
        src={src}
        alt="Option"
        style={{ maxWidth: "100%", maxHeight: "100px" }}
      />
    </div>
  );
};

export default OptionImg;
