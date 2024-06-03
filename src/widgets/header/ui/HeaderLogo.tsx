import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@/shared/ui/Icon/Icon';
import { useAppSelector } from "@/shared/model";

export const HeaderLogo: FC = () => {
  const isAuthorized = useAppSelector((state) => state.auth.isAuthorized);

  return (
    <Link to={isAuthorized ? "/dashboard" : 'circuit'}>
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
