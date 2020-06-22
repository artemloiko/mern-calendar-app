import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Input from 'components/Input/Input';
import TextField from 'components/TextField/TextField';
import Modal from 'components/Modal/Modal';
import Button from 'components/Button/Button';
import Spinner from 'components/Spinner/Spinner';

import { RootState } from 'app/store';
import { saveEvent } from 'features/events/eventsSlice';

type AddEventModalProps = {
  isOpen: boolean;
  closeModal: () => void;
};

function convertTimeToMinutesFromEightAM(time: string): number {
  const [hours, minutes] = time.split(':');
  const hoursFromEight = parseInt(hours) - 8;
  return hoursFromEight * 60 + parseInt(minutes);
}

const AddEventModal: React.FC<AddEventModalProps> = ({ isOpen, closeModal }) => {
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [title, setTitle] = useState('');
  const [validationError, setValidationError] = useState('');

  const dispatch = useDispatch();
  const events = useSelector((state: RootState) => state.events);

  const handleClose = () => {
    setValidationError('');
    closeModal();
  };

  const closeAndResetForm = () => {
    setTitle('');
    setStart('');
    setEnd('');
    handleClose();
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const startTime = convertTimeToMinutesFromEightAM(start);
    const endTime = convertTimeToMinutesFromEightAM(end);
    const duration = endTime - startTime;
    if (duration < 1) {
      setValidationError("Start can't be later then end time");
      return;
    }
    dispatch(
      saveEvent({ title, duration, start: startTime }, () => {
        alert('Event added!');
        closeAndResetForm();
      }),
    );
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={handleClose}>
      <form onSubmit={handleSubmit}>
        <TextField label="Title" htmlFor="title">
          <Input
            placeholder="Skype meeting"
            id="title"
            required
            value={title}
            onChange={(e) => setTitle(e.currentTarget.value)}
          ></Input>
        </TextField>
        <TextField label="Start" htmlFor="start">
          <Input
            id="start"
            type="time"
            min="08:00"
            max="16:59"
            required
            value={start}
            onChange={(e) => setStart(e.currentTarget.value)}
          ></Input>
        </TextField>
        <TextField label="End" htmlFor="duration">
          <Input
            id="duration"
            type="time"
            min="08:01"
            max="17:00"
            required
            value={end}
            onChange={(e) => setEnd(e.currentTarget.value)}
          ></Input>
        </TextField>
        {validationError && <p className="error-message">{validationError}</p>}
        <Button disabled={events.isSyncing}>{events.isSyncing ? <Spinner /> : 'Add event'}</Button>
      </form>
    </Modal>
  );
};
export default AddEventModal;
