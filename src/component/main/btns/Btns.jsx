import React from "react";
import { useRef, useEffect, useState } from "react";
import "./Btns.scss";
import Anime from "../../../asset/Anime";

const Btns = () => {
  const refBtns = useRef(null); //btns와 구분을 위해 refBtns로 명명
  let pos = useRef([]);

  const [num, setNum] = useState(0);

  const getPos = () => {
    pos.current = [];
    const secs = document.body.querySelectorAll(".myScroll");

    for (let sec of secs) {
      pos.current.push(sec.offsetTop);
    }
    setNum(pos.current.length);
  };

  const activation = () => {
    const btns = refBtns.current.querySelectorAll("li");
    const scroll = window.scrollY;

    pos.current.forEach((item, idx) => {
      if (scroll >= item) {
        for (let btn of btns) {
          btn.classList.remove("on");
        }
        btns[idx].classList.add("on");
      }
    });
  };

  useEffect(() => {
    getPos();

    window.addEventListener("resize", getPos);
    window.addEventListener("scroll", activation);

    return () => {
      window.removeEventListener("resize", getPos);
      window.removeEventListener("scroll", activation);
    };
  }, []);

  return (
    <ul className="scrollNavi" ref={refBtns}>
      {Array(num)
        .fill()
        .map((item, idx) => {
          return (
            <li
              key={idx}
              onClick={() => {
                new Anime(window, {
                  prop: "scroll",
                  value: pos.current[idx],
                  duration: 500,
                });
              }}
            ></li>
          );
        })}
      {/* <li
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
      ></li> */}
    </ul>
  );
};

export default Btns;

/*
  스크롤 모션 작업 단계
  1. 컴포넌트 마운트시 각가의 버튼 클릭시 이동해야되는 세로 색션의 위치값들을 배열로 저장하는 함수 호출
  2. 각 세로버튼 클릭시 클릭한 버튼의 순번에 맞는 배열의 위치값을 anime를 활용해서 세로 스크롤 모션 이동
 */
