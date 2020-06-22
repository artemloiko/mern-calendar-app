import React, { useMemo } from 'react';
import clsx from 'clsx';
import { Event } from 'utils/api';

import './EventGrid.css';

const HOURS_PER_DAY = 9;
const HALF_HOURS_PER_DAY = HOURS_PER_DAY * 2;
const MINUTES_PER_DAY = HOURS_PER_DAY * 60;
const AXES_RATIO = 2;

interface DrawableEvent extends Event {
  overlapDepth: number;
  overlapPosition: number;
}

// i assume that we got sorted events from server
export function calculateDrawableEvents(events: Event[]): DrawableEvent[] {
  const hashmapOfEventsByMinutes: DrawableEvent[][] = new Array(MINUTES_PER_DAY);
  const pushEventToHash = (event: DrawableEvent) => {
    const { start, duration } = event;
    for (let i = start; i < duration + start; i++) {
      if (Array.isArray(hashmapOfEventsByMinutes[i])) hashmapOfEventsByMinutes[i].push(event);
      else hashmapOfEventsByMinutes[i] = [event];
    }
  };

  const drawableEvents: DrawableEvent[] = events.map((event) => {
    const drawableEvent = {
      ...event,
      overlapDepth: 1,
      overlapPosition: 0,
    };
    pushEventToHash(drawableEvent);
    return drawableEvent;
  });

  hashmapOfEventsByMinutes.forEach((events) => {
    const sortedByPosition = events.sort(
      (eventA, eventB) => eventA.overlapPosition - eventB.overlapPosition,
    );
    sortedByPosition.forEach((event, eventIndex) => {
      event.overlapDepth = Math.max(event.overlapDepth, events.length);
      event.overlapPosition = Math.max(event.overlapPosition, eventIndex);
    });
  });

  return drawableEvents;
}

// prettier-ignore
const timelineValues = ['8:00', '8:30', '9:00', '9:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00'];

type EventGridProps = {
  events: Event[];
  handleEventClick: (ev: Event) => void;
};

const EventGrid: React.FC<EventGridProps> = ({ events, handleEventClick }) => {
  const drawableEvents = useMemo(() => calculateDrawableEvents(events), [events]);

  const openEventModal = (eventId: string) => {
    handleEventClick(events.find((event) => event._id === eventId)!);
  };

  return (
    <div className="event-grid__wrapper">
      <div
        className="event-grid__timeline"
        style={{
          height: MINUTES_PER_DAY * AXES_RATIO,
        }}
      >
        {timelineValues.map((time, i) => (
          <div
            className={clsx('timeline-time', i % 2 ? 'timeline-time_half' : null)}
            key={time}
            style={{ height: (MINUTES_PER_DAY * AXES_RATIO) / HALF_HOURS_PER_DAY }}
          >
            {time}
          </div>
        ))}
      </div>
      <div
        className="event-grid"
        style={{
          height: MINUTES_PER_DAY * AXES_RATIO,
        }}
      >
        {drawableEvents.map(({ _id, title, start, duration, overlapDepth, overlapPosition }) => {
          return (
            <button
              key={_id}
              className="event-grid__elem"
              style={{
                top: start * AXES_RATIO,
                height: duration * AXES_RATIO,
                width: `calc(100% / ${overlapDepth})`,
                left: `calc((100% / ${overlapDepth}) * ${overlapPosition})`,
              }}
              onClick={() => openEventModal(_id)}
            >
              {title}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default EventGrid;
