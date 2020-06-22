import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from '@reach/router';

import Page from 'components/Page/Page';
import Button from 'components/Button/Button';
import EventsList from 'components/EventGrid/EventGrid';
import Spinner from 'components/Spinner/Spinner';

import AddEventModal from './components/AddEventModal/AddEventModal';
import DeleteEventModal from './components/DeleteEventModal/DeleteEventModal';

import { Event } from 'utils/api';
import { RootState } from 'app/store';
import { useModal } from 'hooks/useModal';
import { loadEvents } from 'features/events/eventsSlice';

const Events: React.FC<RouteComponentProps> = () => {
  const dispatch = useDispatch();
  const events = useSelector((state: RootState) => state.events);

  useEffect(() => {
    dispatch(loadEvents());
  }, [dispatch]);

  const [isAddEventModalOpen, handleAddEventModalOpen, handleAddEventModalClose] = useModal();
  const [isDeleteEventOpen, handleDeleteEventOpen, handleDeleteEventClose] = useModal();

  const [curEvent, setCurEvent] = useState<Event>();
  const openDeleteModalWithEvent = (event: Event) => {
    setCurEvent(event);
    handleDeleteEventOpen();
  };

  return (
    <Page
      contentClass="container"
      headerControls={
        <>
          <Button className="header__control" onClick={handleAddEventModalOpen}>
            Add Event
          </Button>
          <Button className="header__control">Export</Button>
        </>
      }
    >
      {events.isLoading ? (
        <Spinner />
      ) : (
        <EventsList events={events.list} handleEventClick={openDeleteModalWithEvent}></EventsList>
      )}
      <AddEventModal
        isOpen={isAddEventModalOpen}
        closeModal={handleAddEventModalClose}
      ></AddEventModal>
      <DeleteEventModal
        isOpen={isDeleteEventOpen}
        closeModal={handleDeleteEventClose}
        eventToDelete={curEvent}
      ></DeleteEventModal>
    </Page>
  );
};

export default Events;
