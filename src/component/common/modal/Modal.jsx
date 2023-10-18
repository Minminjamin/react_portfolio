import React, { useEffect } from "react";
import "../modal/Modal.scss";
import { close } from "../../../redux/modalSlice";
import { useDispatch, useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";

const Modal = ({ children }) => {
  const dispatch = useDispatch();
  const { isOpen } = useSelector((state) => state.modal);

  useEffect(() => {
    isOpen
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "auto");
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.aside
            className="modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="con">{children}</div>
            <span onClick={() => dispatch(close())}>close</span>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default Modal;
