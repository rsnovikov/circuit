import { ButtonHTMLAttributes, FC } from 'react';
import { useAppDispatch } from '@/shared/model';
import { logoutThunk } from '../model/logoutThunk';

interface ILogoutBtn extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const LogoutBtn: FC<ILogoutBtn> = ({ ...rest }) => {
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
