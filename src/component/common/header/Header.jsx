import React from "react";
import "./Header.scss";
import { Link, NavLink } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { useGlobalData } from "../../../hooks/useGlobalContext";
// import { toggle } from "../../../redux/menuSlice";
// import { useDispatch } from "react-redux";

const Header = ({ isMain }) => {
  const { menuOpen, setMenuOpen, theme, setTheme } = useGlobalData();

  return (
    <header className="header myScroll">
      <h1 className="logo">
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

      <FaBars
        className="bars"
        fontSize={22}
        color={"#333"}
        onClick={() => {
          setMenuOpen(!menuOpen);
        }}
      />

      <span className="btnTheme" onClick={() => setTheme(!theme)}>
        Theme
      </span>
    </header>
  );
};

export default Header;
