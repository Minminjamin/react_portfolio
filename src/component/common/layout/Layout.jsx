import React from "react";
import styles from "../layout/Layout.module.scss";
import clsx from "clsx";

const Layout = (props) => {
  return (
    <section className={clsx(styles.layout)}>
      <figure></figure>

      <div className={clsx(styles.content)}>
        <h1>Sub Page Title</h1>
        {props.children}
      </div>
    </section>
  );
};

export default Layout;
