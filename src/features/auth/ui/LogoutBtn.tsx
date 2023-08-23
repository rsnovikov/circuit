import { ButtonHTMLAttributes, FC } from 'react';
import { clearAuthData } from '@/entities/auth/model/slice';
import { useAppDispatch } from '@/shared/model';

interface ILogoutBtn extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const LogoutBtn: FC<ILogoutBtn> = ({ ...rest }) => {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(clearAuthData());
  };

  return (
    <button onClick={handleClick} {...rest}>
      Выйти
    </button>
  );
};
