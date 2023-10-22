import React from "react";
import { useHistory } from "react-router-dom";
import "./Welcome.scss";
const Welcome = () => {
  const history = useHistory();

  return (
    <figure className="welcome">
      <div className="txt">
        <h1>Grow your business.</h1>
        <p>Give your business a boost with a beautifully crafted homepage.</p>
        <button onClick={() => history.push(`/department`)}>LEARN MORE</button>
      </div>
    </figure>
  );
};

export default Welcome;
