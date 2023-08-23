import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@/shared/ui/Icon/Icon';

export const HeaderLogo: FC = () => {
  return (
    <Link to="/dashboard">
      <Icon
        type="CircuitBoard"
        width={40}
        height={40}
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
    </Link>
  );
};
