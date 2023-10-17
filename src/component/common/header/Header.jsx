import clsx from "clsx";
import React from "react";
import "./Header.scss";
import { Link, NavLink } from "react-router-dom";
import { FaBars } from "react-icons/fa";

const Header = ({ isMain }) => {
  return (
    <header className="header">
      <h1>
        <Link to="/">LOGO</Link>
      </h1>

      <ul>
        <li>
          <NavLink to="/department" activeClassName="active">
            Department
          </NavLink>
        </li>
        <li>
          <NavLink to="/community" activeClassName="active">
            Community
          </NavLink>
        </li>
        <li>
          <NavLink to="/gallery" activeClassName="active">
            Gallery
          </NavLink>
        </li>
        <li>
          <NavLink to="/youtube" activeClassName="active">
            Youtube
          </NavLink>
        </li>
        <li>
          <NavLink to="/members" activeClassName="active">
            Members
          </NavLink>
        </li>
        <li>
          <NavLink to="/contact" activeClassName="active">
            Contact
          </NavLink>
        </li>
      </ul>

      <FaBars className="bars" fontSize={22} color={"#333"} />
    </header>
  );
};

export default Header;
