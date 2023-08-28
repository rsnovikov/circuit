import { FC, HTMLAttributes, PropsWithChildren } from 'react';
import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import clsx from 'clsx';

interface IErrorMessage extends HTMLAttributes<HTMLSpanElement> {
  error?: FetchBaseQueryError | SerializedError;
}

export const ErrorMessage: FC<PropsWithChildren<IErrorMessage>> = ({
  children,
  className,
  error,
  ...rest
}) => {
  const errorMessage = error
    ? ((error as unknown as FetchBaseQueryError).data as { message: string })?.message ||
      (error as unknown as SerializedError).message ||
      'Неизвестная ошибка, попробуйте позже'
    : children;

  return (
    <span className={clsx('mt-2 text-sm text-red-600', className)} {...rest}>
      {errorMessage}
    </span>
  );
};
