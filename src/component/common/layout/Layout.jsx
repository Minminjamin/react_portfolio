import React from "react";
import styles from "../layout/Layout.module.scss";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";

const Layout = ({ title, children, styleName }) => {
  const [isOn, setIsOn] = useState(false);

  const frame = useRef(null);
  const tit = useRef(null);

  const splitText = (ref, gap = 0.1, delay = 0) => {
    let count = 0;
    let tags = "";

    for (let letter of ref.current.innerText) {
      tags += `<span style='transition-delay:${gap * count}s'>${letter}</span>`;
      count++;
    }
    ref.current.innerText = " ";
    ref.current.innerHTML = tags;
  };

  useEffect(() => {
    splitText(tit, 0.1, 1);
    setTimeout(() => setIsOn(true), 300);
  }, []);

  return (
    <section
      ref={frame}
      className={clsx(styles.layout, styleName, isOn ? styles.on : " ")}
    >
      <figure></figure>

      <div className={clsx(styles.content, styleName)}>
        <h1 ref={tit}>{title}</h1>
        {children}
      </div>
    </section>
  );
};

export default Layout;
