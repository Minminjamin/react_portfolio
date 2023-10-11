import React from "react";
import Layout from "../../common/layout/Layout";
import "./Gallery.scss";
import { useState, useEffect, useRef } from "react";
import Masonry from "react-masonry-component";
import Modal from "../../common/modal/Modal";

const Gallery = () => {
  const [pics, setPics] = useState([]);
  const [loader, setLoader] = useState(true);
  const [fix, setFix] = useState(false);
  const [isUser, setIsUser] = useState(true);
  const [activeUrl, setActiveUrl] = useState("");
  const [open, setOpen] = useState(false);

  let count = 0;

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
  };

  const onHanldeSubmit = (e) => {
    e.preventDefault();
    setIsUser(false);

    const btns = btnSet.current.querySelectorAll("button");
    btns.forEach((btn) => btn.classList.remove("on"));

    if (search.current.value.trim() === "") {
      return alert("검색어를 입력하세요");
    }
    fetchData({ type: "search", tags: search.current.value });
    search.current.value = "";
  };

  const onHanldeClickMy = (e) => {
    setIsUser(true);
    if (e.target.classList.contains("on")) return;
    const btns = btnSet.current.querySelectorAll("button");
    btns.forEach((btn) => btn.classList.remove("on"));
    e.target.classList.add("on");
    fetchData({ type: "user", id: myId });
  };

  const onHandleClickInterset = (e) => {
    setIsUser(false);
    if (e.target.classList.contains("on")) return;
    const btns = btnSet.current.querySelectorAll("button");
    btns.forEach((btn) => btn.classList.remove("on"));
    e.target.classList.add("on");

    fetchData({ type: "interest" });
  };

  const onHanldeProfile = (e) => {
    if (isUser) return;

    //fetchData가 실행이 되면 다시 User type갤러리로 변경되므로 다시 IsUser값을 true로 변경
    fetchData({ type: "user", id: e.owner });
    setIsUser(true);
  };
  useEffect(() => {
    console.log(fetchData({ type: "user", id: myId }));
    // fetchData({ type: "search", tags: "landscape" });
    fetchData({ type: "user", id: myId });
    // fetchData({ type: "user" });
  }, []);

  return (
    <>
      <Layout title={"Gallery"}>
        <div className="searchBox">
          <form onSubmit={onHanldeSubmit}>
            <input
              ref={search}
              type="text"
              placeholder="검색어를 입력하세요."
            />
            <button>검색</button>
          </form>
        </div>

        <div className="btnSet" ref={btnSet}>
          <button className="on" onClick={onHanldeClickMy}>
            나의 갤러리 호출
          </button>
          <button onClick={onHandleClickInterset}>interest 갤러리</button>
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
                    onClick={(e) => {
                      setActiveUrl(e.target.getAttribute("alt"));
                      setOpen(true);
                    }}
                  />
                  <h2>{item.title}</h2>

                  <div className="profile">
                    <img
                      src={`http://farm${item.farm}.staticflickr.com/${item.server}/buddyicons/${item.owner}.jpg`}
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
                    <span onClick={onHanldeProfile}>{item.owner}</span>
                  </div>
                </div>
              </article>
            ))}
          </Masonry>
        </div>
      </Layout>

      {open && (
        <Modal setIsModal={setOpen}>
          <img src={activeUrl} alt="img" />
        </Modal>
      )}
    </>
  );
};

export default Gallery;
