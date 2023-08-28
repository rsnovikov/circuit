import { ButtonHTMLAttributes, FC } from 'react';
import { useAppDispatch } from '@/shared/model';
import { logoutThunk } from '../model/logoutThunk';

export const LogoutBtn: FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({ ...rest }) => {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(logoutThunk());
  };

  return (
    <button onClick={handleClick} {...rest}>
      Выйти
    </button>
  );
};
