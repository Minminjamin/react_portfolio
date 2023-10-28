import React from "react";
import "./SubTittle.scss";

const SubTittle = ({ description, title }) => {
  return (
    <div className="subTitle">
      <p>{description}</p>
      <h2>{title}</h2>
    </div>
  );
};

export default SubTittle;
