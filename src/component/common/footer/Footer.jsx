import React from "react";
import { NavLink } from "react-router-dom";
import "../footer/Footer.scss";

const Footer = () => {
  return (
    <footer>
      <h1>Portfolio</h1>

      <ul>
        <li>
          <NavLink to="/department" activeClassName="active">
            Department
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
          <NavLink to="members" activeClassName="active">
            Members
          </NavLink>
        </li>
        <li>
          <NavLink to="contact" activeClassName="active">
            Contact
          </NavLink>
        </li>
      </ul>

      <span>ⓒ 2023. Portfolio. All rights reserved.</span>
      <div className="underLine"></div>
    </footer>
  );
};

export default Footer;
