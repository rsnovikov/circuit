import { FC, PropsWithChildren } from 'react';
import { FormBtnLoader } from './FormBtnLoader';

interface IFormBtnProps {
  isLoading: boolean;
}

export const FormBtn: FC<PropsWithChildren<IFormBtnProps>> = ({ isLoading, children }) => {
  return (
    <button
      type="submit"
      className="text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
    >
      {isLoading ? <FormBtnLoader /> : children}
    </button>
  );
};
