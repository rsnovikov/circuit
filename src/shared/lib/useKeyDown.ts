import { useEffect } from 'react';

export const useKeyPress = (
  callback: (e: KeyboardEvent) => void,
  keyCodes: string[]
) => {
  const handleKeyDown = (e: KeyboardEvent) => {
    const isAnyKeyPressed = keyCodes.some((keyCode) => keyCode === e.code);

    if (isAnyKeyPressed) {
      event?.preventDefault();
      callback(e);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
  }, []);
};
