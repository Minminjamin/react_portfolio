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
      <h1 ref={tit}>{title}</h1>
      <div className="bar"></div>

      <figure>
        <img src={`${path}/img/sub_figure.jpg`} />
      </figure>

      <div className="childrenWrap">{children}</div>
    </section>
  );
};

export default Layout;
