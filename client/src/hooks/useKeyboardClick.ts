import { KeyboardEvent, useCallback } from 'react';

export function useKeyboardClick(cb: () => void) {
  const keyDownHandler = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        cb();
      }
    },
    [cb],
  );

  return keyDownHandler;
}
