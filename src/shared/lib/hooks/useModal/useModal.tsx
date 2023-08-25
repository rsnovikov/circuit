import { FC, PropsWithChildren, ReactNode, createContext, useContext, useState } from 'react';
import Modal from './modal';

interface IModalContext {
  openModal: (Component: ReactNode) => void;
  closeModal: () => void;
}

const ModalContext = createContext<IModalContext>({
  openModal: () => {},
  closeModal: () => {},
});

export const useModal = () => useContext(ModalContext);

export const ModalProvider: FC<PropsWithChildren> = ({ children }) => {
  const [Component, setComponent] = useState<ReactNode>();

  const openModal = (Component: ReactNode) => {
    setComponent(Component);
  };

  const closeModal = () => {
    setComponent(null);
  };

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      <Modal onClose={closeModal}>{Component}</Modal>
    </ModalContext.Provider>
  );
};
