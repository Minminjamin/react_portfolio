import React from "react";
import styles from "../layout/Layout.module.scss";
import clsx from "clsx";

const Layout = ({ title, children, styleName }) => {
  return (
    <section className={clsx(styles.layout, styleName)}>
      <figure></figure>

      <div className={clsx(styles.content)}>
        <h1>{title}</h1>
        {children}
      </div>
    </section>
  );
};

export default Layout;