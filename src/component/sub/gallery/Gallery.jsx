import React from "react";
import Layout from "../../common/layout/Layout";
import "./Gallery.scss";
import { useState, useRef } from "react";
import Masonry from "react-masonry-component";
import Modal from "../../common/modal/Modal";
import { BiSearchAlt } from "react-icons/bi";
import { useFlickrQuery } from "../../../hooks/useFlickr";
import { useGlobalData } from "../../../hooks/useGlobalContext";
import SubTitle from "../../common/subTitle/SubTitle";

const Gallery = () => {
  const [isUser, setIsUser] = useState(true);
  const [activeUrl, setActiveUrl] = useState("");
  const [opt, setOpt] = useState({ type: "user", id: "199348831@N08" });
  // const dispatch = useDispatch();

  const { setModalOpen } = useGlobalData();

  const search = useRef(null);
  const btnSet = useRef(null);

  const myId = "199348831@N08";

  const { data: pics, isSuccess } = useFlickrQuery(opt);

  //submit이벤트 발생시 실행할 함수
  const onHanldeSubmit = (e) => {
    e.preventDefault();
    setIsUser(false);

    const btns = btnSet.current.querySelectorAll("button");
    btns.forEach((btn) => btn.classList.remove("on"));

    if (search.current.value.trim() === "") {
      return alert("검색어를 입력하세요");
    }
    setOpt({ type: "search", tags: search.current.value });
    search.current.value = "";
  };

  //myGallery 클릭 이벤트 발생시 실행할 함수
  const onHanldeClickMy = (e) => {
    setIsUser(true);
    if (e.target.classList.contains("on")) return;
    const btns = btnSet.current.querySelectorAll("button");
    btns.forEach((btn) => btn.classList.remove("on"));
    e.target.classList.add("on");
    setOpt({ type: "user", id: myId });
  };

  //Interest Gallery 클릭 이벤트 발생시 실행할 함수
  const onHandleClickInterset = (e) => {
    setIsUser(false);
    if (e.target.classList.contains("on")) return;
    const btns = btnSet.current.querySelectorAll("button");
    btns.forEach((btn) => btn.classList.remove("on"));
    e.target.classList.add("on");
    setOpt({ type: "interest" });
  };

  //profile 아이디 클릭시 실행할 함수
  const onHanldeProfile = (e) => {
    if (isUser) return;

    //fetchData가 실행이 되면 다시 User type갤러리로 변경되므로 다시 IsUser값을 true로 변경
    setOpt({ type: "user", id: e.target.innerText });
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
          <SubTitle
            description={"Search and Watch Image"}
            title={"Gallery Image"}
          />

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
              My Gallery
            </button>
            <button onClick={onHandleClickInterset}>Interest Gallery</button>
          </div>
        </div>

        <div className="picFrame">
          <Masonry
            elementType={"div"}
            options={{ transitionDuration: "0.5s" }}
            disableImagesLoaded={false}
            updateOnEachImageLoad={false}
            className="mesonry" // default false and works only if disableImagesLoaded is false
          >
            {isSuccess &&
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
                          setModalOpen(true);
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

/*
## 상황

- Youtube.js 컴포넌트를 작업을 하면서 비동기 데이터를 redux-toolkit을 이용해 전역 데이터를 관리하는 게 익숙해서 flickr도 시도해봄

## 데이터 변경 issue

- flickr 데이터를 가져온 다음에 버튼을 클릭하거나 검색어 입력 등의 이벤트가 발생할 때마다 실시간으로 전역 store 데이터를 변경 요청해야 되는 게 많이 어려웠음
- 이벤트가 발생할 때마다 생성된 action 객체를 계속해서 dispatch로 reducer에 데이터 변경 요청을 하도록 처리

## 내 아이디 클릭

- 내 갤러리의 아이디를 클릭해서 나타나는 user 타입의 갤러리 렌더링 시 중복 데이터 호출이 일어남
- user 타입의 갤러리가 렌더링 될 때만 state 값 변경, state에 따라서 사용자 아이디의 클릭 이벤트를 막음으로써 불필요한  server 데이터의 호출을 방지

## 메뉴를 빠르게 이동시 error가 출력

- 특정 컴포넌트에 시간이 오래 걸리는 연산 작업 후 그 결과물을 state에 미쳐 담기도 전에 컴포너트가 언마운트 되는 경우(메모리 누수)
- 특정 state 값이 true 일 때만 state에 무거운 값이 담기도록 처리해주고 컴포넌트 언마운트 시 해당 값을 false로 변경
- 컴포넌트 언마운트 될 때 쯤 state에 담길 값이 준비되지 않으면 state에 담기는 값 무시
- 컴포넌트에 메모리 누수 콘솔오류가 뜨는 이유(memory leak)
    - errs 스테이트에 값이 담기는 시점이 useDebounce에 의해 0.5초 이후인데 Members 컴포넌트 접속하자마자 0.5초 안에 다른 페이지로 넘어가면 아직 state에 값이 담기지 않았는 데 unmount 된 경우이므로 뜨는 오류
    - 컴포넌트 unmount 시 값을 Mounted 값을 false로 변경해주고 해당 값이 true 일때만 state 변경 처리 */
