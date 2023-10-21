import { useEffect, useState } from "react";
import "./News.scss";

const News = () => {
  const dummyData = [
    {
      title: "title3",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta, iure?3",
      date: new Date(),
    },
    {
      title: "title2",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta, iure?2",
      date: new Date(),
    },
    {
      title: "title1",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta, iure?1",
      date: new Date(),
    },
  ];

  // 프로젝트가 처음 구동되면 무조건 Main페이지 이후 Community 페이지로 넘어가는 구조
  // 해당 페이지에 있는 함수가 처음 구동될 시 로컬 저장소에 값이 없으므로 저장소 값이 없을 때 빈배열이 반환되는 구문을 추가
  const getLocalData = () => {
    const data = localStorage.getItem("post");
    if (data) return JSON.parse(data);
    else return dummyData;
  };
  const [post, setPost] = useState(getLocalData());

  useEffect(() => {
    setPost(getLocalData);
  }, []);

  return (
    <section className="news myScroll">
      <div className="top">
        <p>ABOUT US</p>
        <h1>News Page</h1>
      </div>

      <div className="postWrap">
        {post.map((item, idx) => {
          if (idx >= 3) return null;
          else
            return (
              <article key={idx}>
                <h2>{item.title}</h2>
                <p>{item.content}</p>
              </article>
            );
        })}
      </div>
    </section>
  );
};

export default News;
