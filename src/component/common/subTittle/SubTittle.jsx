import React from "react";
import "./SubTittle.scss";

const SubTittle = ({ description, title }) => {
  return (
    <div className="subTitle">
      <p>{description}</p>
      <h1>{title}</h1>
    </div>
  );
};

export default SubTittle;
