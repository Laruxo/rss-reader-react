import React from 'react';
import PropTypes from 'prop-types';
import '../styles/Modal.scss';

export default class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true,
    };
  }

  close() {
    this.setState({
      visible: false,
    });
  }

  componentDidMount() {
    this.setState({
      visible: true,
    });
  }

  render() {
    if (!this.props.item || !this.state.visible) {
      return null;
    }

    return (
      <div className="modal">
        <div className="modal__backdrop" onClick={() => this.close()}/>
        <dialog className="modal__dialog">
          <a className="modal__close" onClick={() => this.close()}>&times;</a>
          <h2>{this.props.item.title}</h2>
          <a className="button modal__action" target="_blank"
            href={this.props.item.link}>Read Full Story...</a>
          <p>{this.props.item.description}</p>
          <p>{this.props.item.content}</p>
        </dialog>
      </div>
    );
  }
}

Modal.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string,
    link: PropTypes.string,
    content: PropTypes.string,
    description: PropTypes.string,
  }),
};
