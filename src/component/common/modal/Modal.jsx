import React, { useEffect } from "react";
import "../modal/Modal.scss";
import { close } from "../../../redux/modalSlice";
import { useDispatch } from "react-redux";

const Modal = ({ children }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const dispatch = useDispatch();

  return (
    <aside className="modal">
      <div className="con">{children}</div>
      <span onClick={() => dispatch(close())}>close</span>
    </aside>
  );
};

export default Modal;
