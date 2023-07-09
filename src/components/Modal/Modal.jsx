import React, {useState, useEffect} from 'react';
import css from './Modal.module.css';

const Modal = ({onClose, children}) => {

  const [isModalOpen, setIsModalOpen]= useState(true);
  

  useEffect(() => {
    const handleKeyDown = event => {
      if (event.keyCode === 27) {
        closeModal();
      }
    };

  document.addEventListener("keydown", handleKeyDown);

  return () => {
    document.removeEventListener("keydown", handleKeyDown);
  };
}, []); 

  const handleKeyDown = event => {
    if (event.keyCode === 27) {
      closeModal();
    }
  };

  const closeModal = () => {
   setIsModalOpen(false);
   onClose ()
  };

  if (!isModalOpen) {
    return null;
  }

    return (
      <div className={css.Overlay} onClick={closeModal}>
        <div className={css.Modal} onClick={e => e.stopPropagation()}>
          {children}
        </div>
      </div>
    );
  };

  export default Modal;
