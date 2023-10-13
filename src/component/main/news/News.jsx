import { useState } from "react";
import "./News.scss";

const News = () => {
  const getLocalData = () => {
    const data = localStorage.getItem("post");
    return JSON.parse(data);
  };
  const [post] = useState(getLocalData());

  return (
    <section className="news">
      <h2>News</h2>
      <div className="postWrap">
        {post.map((item, idx) => {
          if (idx >= 3) return null;
          else
            return (
              <article key={idx}>
                <h2>{item.title}</h2>
                <span>{item.content}</span>
              </article>
            );
        })}
      </div>
    </section>
  );
};

export default News;
