//

import React from "react";
import Layout from "../../common/layout/Layout";
import "./Gallery.scss";
import { useState, useRef } from "react";
import Masonry from "react-masonry-component";
import Modal from "../../common/modal/Modal";
import { BiSearchAlt } from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux";
import { fetchFlickr } from "../../../redux/flickrSlice";
import { open } from "../../../redux/modalSlice";

const Gallery = () => {
  const [isUser, setIsUser] = useState(true);
  const [activeUrl, setActiveUrl] = useState("");

  const dispatch = useDispatch();

  const pics = useSelector((store) => store.flickr.data);

  const search = useRef(null);
  const btnSet = useRef(null);

  const myId = "199348831@N08";

  //submit이벤트 발생시 실행할 함수
  const onHanldeSubmit = (e) => {
    e.preventDefault();
    setIsUser(false);

    const btns = btnSet.current.querySelectorAll("button");
    btns.forEach((btn) => btn.classList.remove("on"));

    if (search.current.value.trim() === "") {
      return alert("검색어를 입력하세요");
    }
    dispatch(fetchFlickr({ type: "search", tags: search.current.value }));
    search.current.value = "";
  };

  //myGallery 클릭 이벤트 발생시 실행할 함수
  const onHanldeClickMy = (e) => {
    setIsUser(true);
    if (e.target.classList.contains("on")) return;
    const btns = btnSet.current.querySelectorAll("button");
    btns.forEach((btn) => btn.classList.remove("on"));
    e.target.classList.add("on");
    dispatch(fetchFlickr({ type: "user", id: myId }));
  };

  //Interest Gallery 클릭 이벤트 발생시 실행할 함수
  const onHandleClickInterset = (e) => {
    setIsUser(false);
    if (e.target.classList.contains("on")) return;
    const btns = btnSet.current.querySelectorAll("button");
    btns.forEach((btn) => btn.classList.remove("on"));
    e.target.classList.add("on");
    dispatch(fetchFlickr({ type: "interest" }));
  };

  //profile 아이디 클릭시 실행할 함수
  const onHanldeProfile = (e) => {
    if (isUser) return;

    //fetchData가 실행이 되면 다시 User type갤러리로 변경되므로 다시 IsUser값을 true로 변경
    dispatch(fetchFlickr({ type: "user", id: e.target.innerText }));
    setIsUser(true);
  };

  const sliceTxt = (text, num) => {
    if (text.length > num) {
      return text.substr(0, num) + "...";
    } else {
      return text;
    }
  };

  return (
    <>
      <Layout title={"Gallery"}>
        <div className="topBox">
          <div className="title">
            <h2>
              Lorem ipsum <b>dolor sit</b> amet.
            </h2>
            <p>@INSTARGRAM</p>
          </div>

          <div className="searchBox">
            <label>🔎 SEARCH IMAGE</label>
            <form onSubmit={onHanldeSubmit}>
              <input
                ref={search}
                type="text"
                placeholder="검색어를 입력하세요."
              />
              <button>검색</button>
            </form>
          </div>
        </div>

        <div className="btnSet" ref={btnSet}>
          <button className="on" onClick={onHanldeClickMy}>
            나의 갤러리 호출
          </button>
          <button onClick={onHandleClickInterset}>interest 갤러리</button>
        </div>

        <div className="picFrame">
          <Masonry
            elementType={"div"}
            options={{ transitionDuration: "0.5s" }}
            disableImagesLoaded={false}
            updateOnEachImageLoad={false}
            className="mesonry" // default false and works only if disableImagesLoaded is false
          >
            {pics.length !== 0 &&
              pics.map((item, index) => (
                <article key={index}>
                  <div className="inner">
                    <div className="pic">
                      <img
                        src={`https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_m.jpg`}
                        alt={`https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_b.jpg`}
                        className="galleryImg"
                      />
                      <BiSearchAlt
                        className="search"
                        onClick={(e) => {
                          setActiveUrl(
                            `https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_b.jpg`
                          );
                          dispatch(open());
                        }}
                      />
                    </div>

                    <div className="lower">
                      <h3>{sliceTxt(item.title, 25)}</h3>
                      <div className="profile">
                        <img
                          src={`http://farm${item.farm}.staticflickr.com/${item.server}/buddyicons/${item.owner}.jpg`}
                          alt={item.owner}
                          onError={(e) => {
                            console.log(e.target);

                            e.target.setAttribute(
                              "src",
                              "https://www.flickr.com/images/buddyicon.gif"
                            );
                          }}
                        />
                        <span onClick={onHanldeProfile}>{item.owner}</span>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
          </Masonry>
        </div>
      </Layout>

      {/* {isModal && ( */}
      <Modal>
        <img src={activeUrl} alt="img" />
      </Modal>
      {/* )} */}
    </>
  );
};

export default Gallery;

/*
  클릭한 버튼을 또 클릭했을 때 같은 데이터를 불필요하게 또다시 fetching 요청하지 않도록 클릭한 버튼에 on이 붙어있을 때 함수 호출을 강제 중지

  현재 출력되는 갤러리 방식이 user type 갤러리 일 때 같은 사용자의 갤러리가 보이는 형태이므로 사용자 아이디를 클릭하게되면 같은 데이터 요청을 보내게 됨
  --사용자 타입의 갤러리를 호출할 때마다 IsUser state 값을 true로 변경해서 이벤트가 발생할 때마다 IsUser 값이 ture 사용자 아이디 클릭 이벤트 핸들러 제거
*/
