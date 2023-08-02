import { useEffect } from 'react';

export const useKeyDown = (callback: (e: KeyboardEvent) => void, keyCodes: string[]) => {
  const handleKeyDown = (e: KeyboardEvent) => {
    const isAnyKeyPressed = keyCodes.some((keyCode) => keyCode === e.code);

    if (isAnyKeyPressed) {
      e?.preventDefault();
      callback(e);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
  }, []);
};
