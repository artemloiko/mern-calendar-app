import React from 'react';
import ReactModal from 'react-modal';
import clsx from 'clsx';

import './Modal.css';
import { useKeyboardClick } from 'hooks/useKeyboardClick';

ReactModal.setAppElement('#root');

export type ModalProps = ReactModal.Props & Required<Pick<ReactModal.Props, 'onRequestClose'>>;

const Modal: React.FC<ModalProps> = (props) => {
  const { children, className, onRequestClose, ...modalProps } = props;
  const keyDownHandler = useKeyboardClick(onRequestClose);

  return (
    <ReactModal
      {...modalProps}
      onRequestClose={onRequestClose}
      className={clsx('modal', className)}
      overlayClassName="modal-overlay"
    >
      <div
        className="modal__close"
        tabIndex={0}
        onClick={onRequestClose}
        onKeyDown={keyDownHandler}
      ></div>
      {children}
    </ReactModal>
  );
};

export default Modal;
