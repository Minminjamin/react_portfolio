import React from "react";
import "./SubTitle.scss";

const SubTittle = ({ description, title }) => {
  return (
    <div className="subTitle">
      <p>{description}</p>
      <h2>{title}</h2>
    </div>
  );
};

export default SubTittle;
