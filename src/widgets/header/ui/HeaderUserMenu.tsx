import { FC } from 'react';
import { useAppSelector } from '@/shared/model';
import { HeaderLogin } from './HeaderLogin';

export const HeaderUserMenu: FC = () => {
  const isAuthorized = useAppSelector((state) => state.auth.isAuthorized);

  return isAuthorized ? <div>HeaderUserMenu</div> : <HeaderLogin />;
};
