import React from 'react';
import PropTypes from 'prop-types';
import './Modal.scss';

function Modal({ item, onClose }) {
  const { title, link, description, content } = item;

  return (
    <div className="modal">
      <div className="modal__backdrop" onClick={onClose} />
      <dialog className="modal__dialog">
        <button className="modal__close" onClick={onClose}>
          &times;
        </button>
        <h2>{title}</h2>
        <a className="button modal__action" target="_blank" rel="noopener noreferrer" href={link}>
          Read Full Story...
        </a>
        <div dangerouslySetInnerHTML={{ __html: description }} />
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </dialog>
    </div>
  );
}

Modal.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string,
    link: PropTypes.string,
    description: PropTypes.string,
    content: PropTypes.string,
  }).isRequired,
  onClose: PropTypes.func,
};

export default Modal;
