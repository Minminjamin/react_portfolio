import clsx from "clsx";
import React from "react";
import styles from "./Header.module.scss";
import { Link, NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className={clsx(styles.header)}>
      <h1>
        <Link to="/">LOGO</Link>
      </h1>

      <ul>
        <li>
          <NavLink to="/department">Department</NavLink>
        </li>
        <li>
          <NavLink to="/gallery">Gallery</NavLink>
        </li>
        <li>
          <NavLink to="/youtube">Youtube</NavLink>
        </li>
        <li>
          <NavLink to="/members"> Members</NavLink>
        </li>
        <li>
          <NavLink to="/contact"> Contact</NavLink>
        </li>
      </ul>
    </header>
  );
};

export default Header;
