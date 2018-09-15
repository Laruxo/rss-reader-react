import React from 'react';
import PropTypes from 'prop-types';
import '../styles/Modal.scss';

export default function Modal(props) {
  if (!props.item) {
    return null;
  }

  const {title, link, description, content} = props.item;

  return (
    <div className="modal">
      <div className="modal__backdrop" onClick={() => props.onClose()}/>
      <dialog className="modal__dialog">
        <a className="modal__close" onClick={() => props.onClose()}>&times;</a>
        <h2>{title}</h2>
        <a className="button modal__action" target="_blank"
           href={link}>Read Full Story...</a>
        <div dangerouslySetInnerHTML={{__html: description}}/>
        <div dangerouslySetInnerHTML={{__html: content}}/>
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
  }),
  onClose: PropTypes.func,
};
