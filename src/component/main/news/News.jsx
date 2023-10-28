import { useEffect, useState, useCallback, useMemo } from "react";
import "./News.scss";

const News = () => {
  const dummyData = useMemo(() => {
    // useMemo는 특정 함수가 리턴해주는 값만 메모이제이션 가능하므로 dummyData에 담길 값 자체를 함수가 리턴하게 처리하고 해당 함수를 useMemo의 인수로 전달한 다음에 의존성 배열을 비워놓음
    // 실제로는 useRef를 통해 참조 객체에 담는 게 더 효율적
    return [
      {
        title: "title4",
        content:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta, iure?4",
        date: new Date(),
      },
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
  }, []);
  // 프로젝트가 처음 구동되면 무조건 Main페이지 이후 Community 페이지로 넘어가는 구조
  // 해당 페이지에 있는 함수가 처음 구동될 시 로컬 저장소에 값이 없으므로 저장소 값이 없을 때 빈배열이 반환되는 구문을 추가

  const getLocalData = useCallback(() => {
    const data = localStorage.getItem("post");
    if (data) return JSON.parse(data);
    else return dummyData;
  }, [dummyData]);

  const [post, setPost] = useState(getLocalData());

  useEffect(() => {
    setPost(getLocalData);
  }, [getLocalData]);

  return (
    <section className="news myScroll">
      <div className="top">
        <p>ABOUT US</p>
        <h1>News Page</h1>
      </div>

      <div className="postWrap">
        {post.map((item, idx) => {
          if (idx >= 4) return null;
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
