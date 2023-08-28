import { useContext, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { KeydownContext } from './KeyDownContext';

interface IUseKeyDownParams {
  callback: () => void;
  codes: string[];
}

export const useKeyDown = ({ callback, codes }: IUseKeyDownParams) => {
  const { addKeyDownListener, removeKeyDownListener } = useContext(KeydownContext);

  useEffect(() => {
    const callbackData = { id: nanoid(), codes, callback };
    addKeyDownListener(callbackData);

    return () => removeKeyDownListener(callbackData.id);
  }, []);
};
