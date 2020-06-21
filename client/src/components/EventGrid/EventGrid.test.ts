import { calculateDrawableEvents } from './EventGrid';

describe('Test function calculateDrawableEvents', () => {
  test('Should return 0 overlaps when no overlaps', () => {
    const events = [
      { _id: '1', title: 'T', start: 0, duration: 2 },
      { _id: '2', title: 'T', start: 2, duration: 2 },
      { _id: '3', title: 'T', start: 4, duration: 2 },
      { _id: '4', title: 'T', start: 6, duration: 2 },
    ];
    const expectedOverlapsDepths = [1, 1, 1, 1];
    const expectedOverlapsPositions = [0, 0, 0, 0];

    const drawableEvents = calculateDrawableEvents(events);
    const overlapsDepths = drawableEvents.map((event) => event.overlapDepth);
    const overlapsPositions = drawableEvents.map((event) => event.overlapPosition);

    expect(overlapsDepths).toEqual(expectedOverlapsDepths);
    expect(overlapsPositions).toEqual(expectedOverlapsPositions);
  });

  test('Should return correct overlaps for parallel overlaps', () => {
    const events = [
      { _id: '1', title: 'T', start: 0, duration: 8 },
      { _id: '2', title: 'T', start: 2, duration: 2 },
      { _id: '3', title: 'T', start: 4, duration: 2 },
      { _id: '4', title: 'T', start: 6, duration: 2 },
    ];
    const expectedOverlapsDepths = [2, 2, 2, 2];
    const expectedOverlapsPositions = [0, 1, 1, 1];

    const drawableEvents = calculateDrawableEvents(events);
    const overlapsDepths = drawableEvents.map((event) => event.overlapDepth);
    const overlapsPositions = drawableEvents.map((event) => event.overlapPosition);

    expect(overlapsDepths).toEqual(expectedOverlapsDepths);
    expect(overlapsPositions).toEqual(expectedOverlapsPositions);
  });

  test('Should return correct overlaps depths for deep overlaps', () => {
    const events = [
      { _id: '1', title: 'T', start: 0, duration: 8 },
      { _id: '2', title: 'T', start: 2, duration: 4 },
      { _id: '3', title: 'T', start: 4, duration: 2 },
      { _id: '4', title: 'T', start: 6, duration: 2 },
    ];
    const expectedOverlapsDepths = [3, 3, 3, 2];
    const expectedOverlapsPositions = [0, 2, 1, 1];

    const drawableEvents = calculateDrawableEvents(events);
    const overlapsDepths = drawableEvents.map((event) => event.overlapDepth);
    const overlapsPositions = drawableEvents.map((event) => event.overlapPosition);

    expect(overlapsDepths).toEqual(expectedOverlapsDepths);
    expect(overlapsPositions).toEqual(expectedOverlapsPositions);
  });
});
