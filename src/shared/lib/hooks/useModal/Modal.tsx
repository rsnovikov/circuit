import { FC, PropsWithChildren } from 'react';

interface ModalProps {
  onClose: () => void;
}

const Modal: FC<PropsWithChildren<ModalProps>> = ({ children, onClose }) => {
  const handleClickOverlay = () => {
    onClose();
  };

  if (!children) return;

  return (
    <div
      className={
        'justify-center items-center fixed top-0 left-0 right-0 bottom-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-full bg-black bg-opacity-25 flex'
      }
    >
      <div className="rounded-lg border-2 relative z-20 md:my-20 my-0 w-full max-w-xl bg-white">
        <div className="relative w-full max-w-2xl flex items-center justify-center z-50">
          <button
            type="button"
            className="absolute top-3 right-2.5"
            onClick={() => onClose()}
          ></button>
          <div className="p-7 w-full">{children}</div>
        </div>
      </div>
      <div
        onClick={handleClickOverlay}
        className="flex justify-center items-center fixed top-0 left-0 right-0 bottom-0 z-5 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-full"
      />
    </div>
  );
};

export default Modal;
