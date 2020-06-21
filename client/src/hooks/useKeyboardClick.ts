import { KeyboardEvent, useCallback } from 'react';

export function useKeyboardClick(cb: (...args: any) => void) {
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
