import { FC, PropsWithChildren, createContext, useEffect, useRef } from 'react';

interface IKeydownContext {
  addKeyDownListener: (callbackData: ICallbackData) => void;
  removeKeyDownListener: (id: string) => void;
}

export const KeydownContext = createContext<IKeydownContext>({
  addKeyDownListener: () => {},
  removeKeyDownListener: () => {},
});

interface ICallbackData {
  id: string;
  codes: string[];
  callback: () => void;
}

export const KeyDownProvider: FC<PropsWithChildren> = ({ children }) => {
  const callbackDataListRef = useRef<ICallbackData[]>([]);
  const addKeyDownListener = (callbackData: ICallbackData) => {
    callbackDataListRef.current.push(callbackData);
  };

  const removeKeyDownListener = (id: string) => {
    callbackDataListRef.current = callbackDataListRef.current.filter(
      (callbackData) => callbackData.id !== id
    );
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    callbackDataListRef.current.forEach((callbackData) => {
      if (callbackData.codes.includes(e.code)) {
        callbackData.callback();
      }
    });
  };
  useEffect(() => {
    console.log(callbackDataListRef.current);
  });
  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  return (
    <KeydownContext.Provider value={{ addKeyDownListener, removeKeyDownListener }}>
      {children}
    </KeydownContext.Provider>
  );
};
