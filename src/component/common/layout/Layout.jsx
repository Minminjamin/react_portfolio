import React from "react";
import "./Layout.scss";
import { useEffect, useRef } from "react";
import useSplitText from "../../../hooks/useSplitText";

const path = process.env.PUBLIC_URL;

const Layout = ({ title, children, styleName }) => {
  // const [isOn, setIsOn] = useState(false);

  const frame = useRef(null);
  const tit = useRef(null);

  const splitText = useSplitText();

  useEffect(() => {
    splitText(tit, 0.1, 1);
    setTimeout(() => {
      frame.current.classList.add("on");
    }, 300);
  }, [splitText]);

  return (
    <section ref={frame} className={`layout ${title}`}>
      <h1 ref={tit} className="pageTitle">
        {title}
      </h1>
      <div className="bar"></div>

      <figure>
        <img src={`${path}/img/sub_figure.jpg`} alt="banner" />
      </figure>

      <div className="childrenWrap">{children}</div>
    </section>
  );
};

export default Layout;

/*
  Layout.jsx를 만든 이유
  리액트로 개발하는 프로젝트가 대단위 페이지이기 때문에 공통적인 틀안에서 특정 변화점이 생겼을때 유지보수 편하게 하려고 작성.
  리액트의 최소 단위 개발과 재사용가능한 컴포넌트를 위해 변경되는 부분만 props로 전달해서 호출하는 식으로 구현
 */
