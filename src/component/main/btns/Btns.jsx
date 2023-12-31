import React from "react";
import { useRef, useEffect, useState } from "react";
import "./Btns.scss";
import Anime from "../../../asset/Anime";
import { useThrottle } from "../../../hooks/useThrottle";

const Btns = () => {
  //ul요소를 담을 참조객체 생성
  const refBtns = useRef(null); //btns와 구분을 위해 refBtns로 명명

  //새로위치값이 배열로 담길 참조객체 생성
  let pos = useRef([]);

  const [num, setNum] = useState(0);

  //컴포넌트 마운트시 myScroll클래스의 모든 섹션의 세로위치값을 배열에 저장하는 함수
  const getPos = () => {
    pos.current = [];
    const secs = document.body.querySelectorAll(".myScroll");

    for (let sec of secs) {
      pos.current.push(sec.offsetTop);
    }
    setNum(pos.current.length);
  };

  // 브라우저 리사이즈 시 세로 위치값을 개선하는 함수
  const modifyPos = () => {
    let activeIdx = 0;
    const lis = refBtns.current.querySelectorAll("li");

    lis.forEach((li, idx) => {
      li.classList.contains("on") && (activeIdx = idx);
    });

    window.scrollTo(0, pos.current[activeIdx]);
  };

  //컴포넌트 마운트시 myScroll클래스의 모든 섹션의 세로위치값을 배열에 저장하는 함수
  const activation = () => {
    //컴포넌트 언마운트시 queryselector앞에 null오류가 뜰때에는
    //해결방법 - 해당값이 없을때 return 으로 강제 함수 종료

    if (!refBtns.current) return;
    const btns = refBtns.current.querySelectorAll("li");
    const scroll = window.scrollY;

    pos.current.forEach((item, idx) => {
      if (scroll >= item - window.innerHeight / 2) {
        for (let btn of btns) {
          btn.classList.remove("on");
        }
        btns[idx].classList.add("on");
      }
    });
  };

  const throttledActivation = useThrottle(activation);
  const throttledGetPos = useThrottle(getPos);

  useEffect(() => {
    getPos();
    modifyPos();

    window.addEventListener("resize", throttledGetPos);
    window.addEventListener("resize", modifyPos);
    window.addEventListener("scroll", throttledActivation);

    return () => {
      window.removeEventListener("resize", throttledGetPos);
      window.removeEventListener("resize", modifyPos);
      window.removeEventListener("scroll", throttledActivation);
      window.scrollTo(0, 0);
    };
  }, [throttledGetPos, throttledActivation]);

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
    </ul>
  );
};

export default Btns;

/*
  스크롤 모션 작업 단계
  1. 컴포넌트 마운트시 각가의 버튼 클릭시 이동해야되는 세로 색션의 위치값들을 배열로 저장하는 함수 호출
  2. 각 세로버튼 클릭시 클릭한 버튼의 순번에 맞는 배열의 위치값을 anime를 활용해서 세로 스크롤 모션 이동
 */
