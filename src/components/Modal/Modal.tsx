import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import "./Modal.scss";

interface ModalProps {
  item: FeedItem;
  onClose: () => void;
}

function Modal({ item, onClose }: ModalProps) {
  const { title, link, description, content } = item;
  const closeButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeButton.current?.focus();
  }, []);

  return createPortal(
    <div className="modal">
      <div className="modal__backdrop" onClick={onClose} />
      <dialog
        className="modal__dialog"
        aria-label={title}
        role="alertdialog"
        aria-modal="true"
        open
        onKeyUp={(e) => {
          if (e.key === "Escape") {
            e.preventDefault();
            onClose();
          }
        }}
      >
        <h2 className="modal__header">{title}</h2>
        <button type="button" className="modal__close" onClick={onClose} ref={closeButton}>
          &times;
        </button>
        <a className="button modal__action" target="_blank" rel="noopener noreferrer" href={link}>
          Read Full Story
        </a>
        {description !== content && <div dangerouslySetInnerHTML={{ __html: description }} />}
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </dialog>
    </div>,
    document.body
  );
}

export default Modal;
