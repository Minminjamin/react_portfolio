import clsx from "clsx";
import React from "react";
import styles from "./Header.module.scss";

const Header = () => {
  return (
    <header className={clsx(styles.header)}>
      <h1>Logo</h1>

      <ul>
        <li>Department</li>
        <li>Gallery</li>
        <li>Youtube</li>
        <li>Members</li>
        <li>Contact</li>
      </ul>
    </header>
  );
};

export default Header;
