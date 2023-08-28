import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@/shared/ui/Icon/Icon';
import { HeaderBtn } from './HeaderBtn';

export const HeaderLogin: FC = () => {
  return (
    <Link to="/login">
      <HeaderBtn className="flex items-center justify-between">
        <Icon type="BxUserCircle" fill="white" width={20} height={20} className="mr-1" />
        <span>Войти</span>
      </HeaderBtn>
    </Link>
  );
};
