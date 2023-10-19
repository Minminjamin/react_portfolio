import React from "react";
import { useRef, useEffect } from "react";
import "./Btns.scss";
import Anime from "../../../asset/Anime";

const Btns = () => {
  const refBtns = useRef(null); //btns와 구분을 위해 refBtns로 명명
  let pos = useRef([]);

  const getPos = () => {
    const secs = document.body.querySelectorAll(".myScroll");

    for (let sec of secs) {
      pos.current.push(sec.offsetTop);
    }
  };

  const activation = () => {
    const btns = refBtns.current.querySelectorAll("li");
    const scroll = window.scrollY;

    if (scroll >= pos.current[0]) {
      for (let btn of btns) btn.classList.remove("on");
      btns[0].classList.add("on");
    }
    if (scroll >= pos.current[1]) {
      for (let btn of btns) btn.classList.remove("on");
      btns[1].classList.add("on");
    }
    if (scroll >= pos.current[2]) {
      for (let btn of btns) btn.classList.remove("on");
      btns[2].classList.add("on");
    }
  };

  useEffect(() => {
    getPos();

    window.addEventListener("scroll", activation);

    return () => {
      window.removeEventListener("scroll", activation);
    };
  }, []);

  return (
    <ul className="scrollNavi" ref={refBtns}>
      <li
        className="on"
        onClick={() => {
          new Anime(window, {
            prop: "scroll",
            value: pos.current[0],
            duration: 500,
          });
        }}
      ></li>
      <li
        onClick={() => {
          new Anime(window, {
            prop: "scroll",
            value: pos.current[1],
            duration: 500,
          });
        }}
      ></li>
      <li
        onClick={() => {
          new Anime(window, {
            prop: "scroll",
            value: pos.current[2],
            duration: 500,
          });
        }}
      ></li>
    </ul>
  );
};

export default Btns;

/*
  스크롤 모션 작업 단계
  1. 컴포넌트 마운트시 각가의 버튼 클릭시 이동해야되는 세로 색션의 위치값들을 배열로 저장하는 함수 호출
  2. 각 세로버튼 클릭시 클릭한 버튼의 순번에 맞는 배열의 위치값을 anime를 활용해서 세로 스크롤 모션 이동
 */
