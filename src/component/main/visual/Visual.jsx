import React from "react";
import "./Visual.scss";
import { useSelector } from "react-redux";

const Visual = () => {
  const { data } = useSelector((store) => store.youtube);

  return (
    <section className="visual">
      <h2>Visual</h2>
      {data.map((item, idx) => {
        if (idx >= 5) return;
        return (
          <article key={idx}>
            <h2>{item.snippet.title}</h2>
          </article>
        );
      })}
    </section>
  );
};

export default Visual;
