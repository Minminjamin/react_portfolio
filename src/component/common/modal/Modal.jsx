import React, { useEffect } from "react";
import "./Modal.scss";
import { AnimatePresence, motion } from "framer-motion";
import { useGlobalData } from "../../../hooks/useGlobalContext";

const Modal = ({ children }) => {
  const { modalOpen, setModalOpen } = useGlobalData();

  useEffect(() => {
    modalOpen
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "auto");
  }, [modalOpen]);

  return (
    <AnimatePresence>
      {modalOpen && (
        <>
          <motion.aside
            className="modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="con">{children}</div>
            <span onClick={() => setModalOpen(false)}>close</span>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default Modal;
