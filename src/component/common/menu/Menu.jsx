import React, { useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import "./Menu.scss";
import { AnimatePresence, motion } from "framer-motion";
import { useGlobalData } from "../../../hooks/useGlobalContext";

// import { useDispatch, useSelector } from "react-redux";
// import { close } from "../../../redux/menuSlice";

const Menu = () => {
  const { menuOpen, setMenuOpen } = useGlobalData();

  useEffect(() => {
    //브라우저가 1000px이상 폭이 될때 setMeunuOpen(false) 로 메뉴를 닫는 핸들러 함수 정의
    const closeMenu = () => {
      const wid = window.innerHeight;
      if (wid >= 1000) setMenuOpen(false);
    };

    //윈도우 전역 객체에 resize 이벤트 핸들러 연결
    window.addEventListener("resize", closeMenu);

    //해당 컴포넌트 언마운트시 이벤트 핸들러 제거
    return () => window.removeEventListener("resize", closeMenu);
  }, []);

  return (
    <AnimatePresence>
      {menuOpen && (
        <motion.aside
          className="mainMenu"
          initial={{ x: "-100%" }}
          animate={{ x: "0%" }}
          exit={{ x: "-100%" }}
          transition={{ duration: 0.7 }}
          onClick={() => setMenuOpen(false)}
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

/*
모바일 화면에서 모바일 메뉴 패널이 열려있는 상태에서 브라우저를 데스크탑 버전으로 리사이즈시 모바일 패널 그대로 남아있는 현상 해결
  - 원인 모바일 패널은 햄버거 버튼이나 모바일 패널을 클릭해야지만 닫히도록 되어 있는데 모바일 패널이 열려있는 상태에서 리사이즈해서 늘리면 버튼이 사라지기 때문에 닫히지 않음
  - 해결 방법
  - 모바일 패널 컴포넌트에서 윈도우 객체에 리사이즈 이벤트를 연결해서 브라우저가 1000px이상 들어나면 자동으로 패널 닫히도록 처리
*/
