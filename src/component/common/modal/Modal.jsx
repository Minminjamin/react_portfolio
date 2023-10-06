import React from "react";

const Modal = ({ children, setIsModal }) => {
  return (
    <aside className="modal">
      {children}
      <span onClick={() => setIsModal(false)}>close</span>
    </aside>
  );
};

export default Modal;
