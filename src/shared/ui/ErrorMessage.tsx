import { FC, HTMLAttributes, PropsWithChildren } from 'react';
import clsx from 'clsx';

interface IErrorMessage extends HTMLAttributes<HTMLSpanElement> {}

export const ErrorMessage: FC<PropsWithChildren<IErrorMessage>> = ({
  children,
  className,
  ...rest
}) => {
  return (
    <span className={clsx('mt-2 text-sm text-red-600', className)} {...rest}>
      {children}
    </span>
  );
};
