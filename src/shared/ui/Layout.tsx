import { FC } from 'react';
import { Outlet } from 'react-router-dom';

export const Layout: FC = ({}) => {
  return (
    <div className="w-full h-full">
      <Outlet />
    </div>
  );
};
