import React from "react";
import Layout from "../../common/layout/Layout";
import "./Gallery.scss";
import { useState, useEffect, useRef } from "react";
import Masonry from "react-masonry-component";

const Gallery = () => {
  const [pics, setPics] = useState([]);
  const [loader, setLoader] = useState(true);
  const [fix, setFix] = useState(false);
  const [isUser, setIsUser] = useState(true);

  const frame = useRef(null);
  const search = useRef(null);
  const btnSet = useRef(null);

  const myId = "199348831@N08";

  const fetchData = async (opt) => {
    // btns.forEach((btn) => btn.classList.remove("on"));
    setLoader(true);
    frame.current.classList.remove("on");

    let url = "";
    const api_key = process.env.REACT_APP_FLICKR_API_KEY;
    const num = 50;
    const methodInterest = "flickr.interestingness.getList";
    const methodUser = "flickr.people.getPhotos";
    const methodSearch = "flickr.photos.search";

    if (opt.type === "interest") {
      url = `https://www.flickr.com/services/rest/?method=${methodInterest}&api_key=${api_key}&per_page=${num}&nojsoncallback=1&format=json`;
    }
    if (opt.type === "user") {
      url = `https://www.flickr.com/services/rest/?method=${methodUser}&api_key=${api_key}&per_page=${num}&nojsoncallback=1&format=json&user_id=${opt.id}`;
    }
    if (opt.type === "search") {
      url = `https://www.flickr.com/services/rest/?method=${methodSearch}&api_key=${api_key}&per_page=${num}&nojsoncallback=1&format=json&tags=${opt.tags}`;
    }

    const data = await fetch(url);
    const json = await data.json();

    if (json.photos.photo.length === 0) {
      return alert("결과값이 없습니다.");
    }
    setPics(json.photos.photo);

    let count = 0;
    const imgs = frame.current?.querySelectorAll("img");

    imgs.forEach((img, idx) => {
      img.onload = () => {
        ++count;
        console.log("현재 로딩된 img갯수", count);

        if (count === (fix ? imgs.length / 2 - 1 : imgs.length - 2)) {
          console.log("모든 이미지 렌더링 완료");
          setLoader(false);
          frame.current.classList.add("on");
        }
      };
    });
    // if()
    // console.log(json);
  };

  useEffect(() => {
    // fetchData({ type: "search", tags: "landscape" });
    fetchData({ type: "user", id: myId });
    // fetchData({ type: "user" });
  }, []);

  return (
    <Layout title={"Gallery"}>
      <div className="searchBox">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setIsUser(false);

            if (search.current.value.trim() === "") {
              return alert("검색어를 입력하세요");
            }
            fetchData({ type: "search", tags: search.current.value });
            search.current.value = "";
          }}
        >
          <input ref={search} type="text" placeholder="검색어를 입력하세요." />
          <button>검색</button>
        </form>
      </div>

      <div className="btnSet" ref={btnSet}>
        <button
          className="on"
          onClick={(e) => {
            setIsUser(true);
            const btns = btnSet.current.querySelectorAll("button");
            btns.forEach((btn) => btn.classList.remove("on"));
            e.target.classList.add("on");
            fetchData({ type: "user", id: myId });
          }}
        >
          나의 갤러리 호출
        </button>
        <button
          onClick={(e) => {
            setIsUser(false);
            const btns = btnSet.current.querySelectorAll("button");
            btns.forEach((btn) => btn.classList.remove("on"));
            e.target.classList.add("on");

            fetchData({ type: "interest" });
          }}
        >
          interest 갤러리
        </button>
      </div>

      {loader && (
        <img
          className="loading"
          src={`${process.env.PUBLIC_URL}/img/loading.gif`}
          alt="loading"
        />
      )}
      <div className="picFrame" ref={frame}>
        <Masonry
          elementType={"div"}
          options={{ transitionDuration: "0.5s" }}
          disableImagesLoaded={false}
          updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
        >
          {pics.map((item, index) => (
            <article key={index}>
              <div className="inner">
                <img
                  className="pic"
                  src={`https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_m.jpg`}
                  alt={`https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_b.jpg`}
                />
                <h2>{item.title}</h2>

                <div className="profile">
                  <img
                    src={`http://farm${item.farm}.staticflickr.com/${item.server}/buddyicons/${item.owner}ggr.jpg`}
                    alt={item.owner}
                    onError={(e) => {
                      console.log(e.target);
                      setFix(true);
                      e.target.setAttribute(
                        "src",
                        "https://www.flickr.com/images/buddyicon.gif"
                      );
                    }}
                  />
                  <span
                    onClick={() => {
                      //사용자 아이디 클릭시 현재 출력되는 갤러리가 User 타입 갤러리면 이벤트 호출 방지
                      if (isUser) return;

                      //fetchData가 실행이 되면 다시 User type갤러리로 변경되므로 다시 IsUser값을 true로 변경
                      fetchData({ type: "user", id: item.owner });
                      setIsUser(true);
                    }}
                  >
                    {item.owner}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </Masonry>
      </div>
    </Layout>
  );
};

export default Gallery;
