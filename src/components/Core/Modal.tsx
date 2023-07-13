import React, { PropsWithChildren } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  className?: string,
}

const ModalContainer: React.FC<PropsWithChildren<ModalProps>> = (props) => {
  return (
    <div
      className={
        "block fixed top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2 p-6 bg-white shadow-lg rounded-md drop-shadow-md " +
        (props?.className ?? "")
      }
    >
      {props.children}
    </div>
  );
};

const ModalOverlay: React.FC = () => {
  return (
    <div className="block fixed top-0 left-0 z-40 w-full h-full bg-black opacity-70"></div>
  );
};

const Modal: React.FC<PropsWithChildren<ModalProps>> = (props) => {
  return (
    <>
      {createPortal(
        <ModalContainer className={props?.className}>
          {props.children}
        </ModalContainer>,
        document.getElementById("modal-container-root")!
      )}
      {createPortal(
        <ModalOverlay />,
        document.getElementById("modal-overlay-root")!
      )}
    </>
  );
};

export default Modal;
