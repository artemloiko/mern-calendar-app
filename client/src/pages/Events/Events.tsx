import React from 'react';
import { RouteComponentProps } from '@reach/router';
import Page from 'components/Page/Page';
import Button from 'components/Button/Button';
import EventsList, { Event } from 'components/EventGrid/EventGrid';

const events: Event[] = [
  {
    _id: '5eef2368dee12456b941eaf8',
    start: 0,
    duration: 30,
    title: 'Exercises',
  },
  {
    _id: '5eef2368dee12456b941eaf9',
    start: 35,
    duration: 30,
    title: 'Travel to work',
  },
  {
    _id: '5eef2368dee12456b941eafa',
    start: 35,
    duration: 30,
    title: 'Plan day',
  },
  {
    _id: '5eef2368dee12456b941eafb',
    start: 60,
    duration: 15,
    title: "Review yesterday's commits",
  },
  {
    _id: '5eef2368dee12456b941eafc',
    start: 100,
    duration: 15,
    title: 'Code review',
  },
  {
    _id: '5eef2368dee12456b941eafd',
    start: 180,
    duration: 90,
    title: 'Have lunch with John',
  },
  {
    _id: '5eef2368dee12456b941eafe',
    start: 360,
    duration: 30,
    title: 'Skype call',
  },
  {
    _id: '5eef2368dee12456b941eaff',
    start: 370,
    duration: 45,
    title: 'Follow up with designer',
  },
  {
    _id: '5eef2368dee12456b941eb00',
    start: 405,
    duration: 30,
    title: 'Push up branch',
  },
  {
    _id: '5eef2368dee12456b941eb00s',
    start: 510,
    duration: 30,
    title: 'Go home',
  },
];

const Events: React.FC<RouteComponentProps> = () => {
  return (
    <Page
      contentClass="container"
      headerControls={
        <>
          <Button className="header__control">Export</Button>
        </>
      }
    >
      <EventsList events={events}></EventsList>
    </Page>
  );
};

export default Events;
