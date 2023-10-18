import React from "react";
import { NavLink, Link } from "react-router-dom";
import "./Menu.scss";

const Menu = () => {
  return (
    <aside className="mainMenu">
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
    </aside>
  );
};

export default Menu;
