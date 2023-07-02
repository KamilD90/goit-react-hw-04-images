import React from 'react';
import css from './Modal.module.css';

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: true };
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = event => {
    if (event.keyCode === 27) {
      this.closeModal();
    }
  };

  closeModal = () => {
    this.setState({ isOpen: false });
    this.props.onClose();
  };

  render() {
    const { isOpen } = this.state;
    if (!isOpen) {
      return null;
    }

    return (
      <div className={css.Overlay} onClick={this.closeModal}>
        <div className={css.Modal} onClick={e => e.stopPropagation()}>
          {this.props.children}
        </div>
      </div>
    );
  }
}
export default Modal;
