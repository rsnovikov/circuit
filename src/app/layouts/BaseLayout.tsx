import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '@/widgets/header';

export const BaseLayout: FC = () => {
  return (
    <div className="w-full h-full bg-gray-300">
      <div className="fixed inset-x-0 top-0">
        <Header />
      </div>
      <Outlet />
    </div>
  );
};
