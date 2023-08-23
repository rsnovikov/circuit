import { FC, PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '@/shared/model';

export const AuthGuard: FC<PropsWithChildren> = ({ children }) => {
  const isAuthorized = useAppSelector((state) => state.auth.isAuthorized);

  if (isAuthorized) return <Navigate to="/dashboard" />;
  return children;
};
