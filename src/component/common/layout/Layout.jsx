import React from "react";
import styles from "../layout/Layout.module.scss";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";

// 정리, 컴포넌트가 마운트되면 움직이는 모션을 보여주기 위해 일단 opacity 0을 줌.
// 마운트 되면 style.on을 추가, 즉 opacity가 1이 되면서 모션이 보임
const Layout = ({ title, children, styleName }) => {
  const [isOn, setIsOn] = useState(false); //컴포넌트를 변경할 state

  // 가상돔 요소를 document.querySelector를 쓰지 않고ㅜ 실시간으로 참조하고 싶을 때
  // 빈 참조객체를 useRef로 변경

  const frame = useRef(null);

  useEffect(() => {
    // 컴포넌트 마운트시 IsOn을 true로 변경
    // IsOn을 useRef가 아닌 state로 변경해야 하는 이유
    // useRef 값을 변경해도 리액트는 변경점을 인지 못해서 재렌더링이 안되기 때문에
    setIsOn(true);
  }, []);

  return (
    // 참조할 가장 돔을 ref 연결
    <section
      ref={frame}
      // IsOn state가 true 일 때만 on클래스명 적용
      className={clsx(styles.layout, styleName, isOn ? styles.on : " ")}
    >
      <figure></figure>

      <div className={clsx(styles.content, styleName)}>
        <h1>{title}</h1>
        {children}
      </div>
    </section>
  );
};

export default Layout;
