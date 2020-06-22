import React, { useEffect } from 'react';
import { RouteComponentProps } from '@reach/router';
import Page from 'components/Page/Page';
import Button from 'components/Button/Button';
import EventsList from 'components/EventGrid/EventGrid';
import { useDispatch, useSelector } from 'react-redux';
import { loadEvents } from 'features/events/eventsSlice';
import { RootState } from 'app/store';
import Spinner from 'components/Spinner/Spinner';
import { useModal } from 'hooks/useModal';
import AddEventModal from './components/AddEventModal/AddEventModal';

const Events: React.FC<RouteComponentProps> = () => {
  const dispatch = useDispatch();
  const events = useSelector((state: RootState) => state.events);

  useEffect(() => {
    dispatch(loadEvents());
  }, [dispatch]);

  const [isAddEventModalOpen, handleAddEventModalOpen, handleAddEventModalClose] = useModal();

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
      {events.isLoading ? <Spinner /> : <EventsList events={events.list}></EventsList>}
      <AddEventModal
        isOpen={isAddEventModalOpen}
        closeModal={handleAddEventModalClose}
      ></AddEventModal>
    </Page>
  );
};

export default Events;
