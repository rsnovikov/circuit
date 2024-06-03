import { FC } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from "@/shared/model";

export const HeaderLogo: FC = () => {
  const isAuthorized = useAppSelector((state) => state.auth.isAuthorized);

  return (
    <Link to={isAuthorized ? "/dashboard": "/circuit"}>
      <img src="/logo.png" alt="logo" style={{ width: 'auto', height: '50px' }} />
    </Link>
  );
};
