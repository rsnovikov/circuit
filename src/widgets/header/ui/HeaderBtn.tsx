import { ButtonHTMLAttributes, FC, PropsWithChildren } from 'react';
import clsx from 'clsx';

export const HeaderBtn: FC<PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>> = ({
  children,
  className,
  ...rest
}) => {
  return (
    <button
      type="button"
      className={clsx(
        'text-white bg-gradient-to-r from-blue-500/90 via-blue-600/90 to-blue-700/90 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300  font-medium rounded-lg text-sm px-3 py-2.5 text-center',
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
};
