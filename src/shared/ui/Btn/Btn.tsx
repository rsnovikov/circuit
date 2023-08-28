import { ButtonHTMLAttributes, FC, PropsWithChildren } from 'react';
import clsx from 'clsx';
import { FormBtnLoader } from './BtnLoader';

interface IBtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
}

export const Btn: FC<PropsWithChildren<IBtnProps>> = ({
  isLoading,
  children,
  className,
  disabled,
  ...rest
}) => {
  return (
    <button
      className={clsx(
        className,
        'text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center'
      )}
      disabled={isLoading === true || disabled}
      {...rest}
    >
      {isLoading ? <FormBtnLoader /> : children}
    </button>
  );
};
