import React, { useEffect } from "react";
import "../modal/Modal.scss";

const Modal = ({ children, setIsModal }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <aside className="modal">
      <div className="con">{children}</div>
      <span onClick={() => setIsModal(false)}>close</span>
    </aside>
  );
};

export default Modal;
