import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@/shared/ui/Icon/Icon';

export const HeaderLogo: FC = () => {
  return (
    <Link to="/dashboard">
      <img src="/logo.png" alt="logo" style={{ width: 'auto', height: '50px' }} />
    </Link>
  );
};
