import React from 'react';
import ReactModal from 'react-modal';
import clsx from 'clsx';

import './Modal.css';

ReactModal.setAppElement('#root');

export type ModalProps = ReactModal.Props;

const Modal: React.FC<ModalProps> = (props) => {
  const { children, className, ...modalProps } = props;
  return (
    <ReactModal
      {...modalProps}
      className={clsx('modal', className)}
      overlayClassName="modal-overlay"
    >
      {children || 'Example Modal'}
    </ReactModal>
  );
};

export default Modal;
