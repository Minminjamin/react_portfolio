import React from "react";
import { NavLink, Link } from "react-router-dom";
import "./Menu.scss";
import { AnimatePresence, motion } from "framer-motion";
import { useSelector } from "react-redux";

const Menu = () => {
  const { isOpen } = useSelector((store) => store.menu);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.aside
          className="mainMenu"
          initial={{ x: "-100%" }}
          animate={{ x: "0%" }}
          exit={{ x: "-100%" }}
          transition={{ duration: 0.7 }}
        >
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
        </motion.aside>
      )}
    </AnimatePresence>
  );
};

export default Menu;
