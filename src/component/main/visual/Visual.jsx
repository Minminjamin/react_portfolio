import React from "react";
import "./Visual.scss";
import { useSelector } from "react-redux";

const Visual = () => {
  const { data } = useSelector((store) => store.youtube);

  return (
    <section className="visual">
      <div className="left">
        <p>Video</p>
        <h2>The whole world in one this page</h2>
        <p>
          Senectus et netus et malesuada. Nunc pulvinar sapien et ligula
          ullamcorper malesuada proin.
        </p>
      </div>

      <div className="right">
        {data.map((item, idx) => {
          if (idx >= 4) return;
          return (
            <article key={idx}>
              <img
                src={item.snippet.thumbnails.standard.url}
                alt={item.title}
                // onClick={() => setIndex(idx)}
              />
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default Visual;
