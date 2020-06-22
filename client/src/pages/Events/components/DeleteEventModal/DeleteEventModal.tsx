import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Modal from 'components/Modal/Modal';
import Button from 'components/Button/Button';
import Spinner from 'components/Spinner/Spinner';

import { RootState } from 'app/store';
import { Event } from 'utils/api';
import { removeEvent } from 'features/events/eventsSlice';

import './DeleteEventModal.css';

type DeleteEventModalProps = {
  isOpen: boolean;
  closeModal: () => void;
  eventToDelete?: Event;
};

const DeleteEventModal: React.FC<DeleteEventModalProps> = ({
  isOpen,
  closeModal,
  eventToDelete,
}) => {
  const dispatch = useDispatch();
  const events = useSelector((state: RootState) => state.events);

  const handleDeleteButtonClick = () => {
    if (!eventToDelete) {
      closeModal();
      return;
    }

    dispatch(
      removeEvent(eventToDelete, () => {
        alert('Event deleted!');
        closeModal();
      }),
    );
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={closeModal}>
      <div className="delete-modal">
        <h2 className="delete-modal__heading">You sure you want delete this event?</h2>
        <p className="delete-modal__event">{eventToDelete?.title}</p>
        <Button
          className="delete-modal__button"
          disabled={events.isSyncing}
          onClick={handleDeleteButtonClick}
        >
          {events.isSyncing ? <Spinner /> : 'Yes, delete event!'}
        </Button>
      </div>
    </Modal>
  );
};
export default DeleteEventModal;
