import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@/shared/ui/Icon/Icon';
import { useAppSelector } from "@/shared/model";

export const HeaderLogo: FC = () => {
  const isAuthorized = useAppSelector((state) => state.auth.isAuthorized);

  return (
    <Link to="/dashboard">
      <img src="/logo.png" alt="logo" style={{ width: 'auto', height: '50px' }} />
    </Link>
  );
};
