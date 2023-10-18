import React from "react";
import styles from "../layout/Layout.module.scss";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import useSplitText from "../../../hooks/useSplitText";

const path = process.env.PUBLIC_URL;

const Layout = ({ title, children, styleName }) => {
  const [isOn, setIsOn] = useState(false);

  const frame = useRef(null);
  const tit = useRef(null);

  const splitText = useSplitText();

  useEffect(() => {
    splitText(tit, 0.1, 1);
    setTimeout(() => setIsOn(true), 300);
  }, []);

  return (
    <section
      ref={frame}
      className={clsx(styles.layout, styleName, title, isOn ? styles.on : " ")}
    >
      <figure>
        <img src={`${path}/img/banner.jpg`} />
      </figure>

      <div className={clsx(styles.content, styleName)}>
        <h1 ref={tit}>{title}</h1>
        {children}
      </div>
    </section>
  );
};

export default Layout;
