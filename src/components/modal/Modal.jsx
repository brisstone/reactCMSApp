// @src/components/Modal.jsx

import React from "react";
import styles from "./modal.css";
import { RiCloseLine } from "react-icons/ri";

const Modal = ({ setIsOpen, error, sucesss, color }) => {
  return (
    <>
      <div className="darkBG" onClick={() => setIsOpen(false)} />
      <div className="centered">
        <div className="modal" style={{backgroundColor: color}}>
          <div className="modalHeader">
            <h5 className="heading" style={{color: "color", backgroundColor: "white"}}>Response</h5>
          </div>
          <button className="closeBtn" onClick={() => setIsOpen(false)}>
            <RiCloseLine style={{ marginBottom: "-3px" }} />
          </button>
          <div className="modalContent" style={{color: "white", fontWeight: "800"}}>
            {sucesss}
          </div>
          <div className="modalActions">
            <div className="actionsContainer" style={{color: "white", fontWeight: "800"}}>
                {error}
              <button className="deleteBtn" onClick={() => setIsOpen(false)}>
                Okay
              </button>
          
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;