import { FC } from 'react';
import { useAppDispatch } from '@/shared/model';
import { notify } from '@/shared/notification';
import { BreadboardToolsBtn } from './BreadboardToolsBtn';

export const StartModelingBreadboardTool: FC = () => {
  const dispatch = useAppDispatch();
  const handleClick = () => {
    dispatch(notify({ message: 'Пока не реализовано :(', type: 'info' }));
  };

  return (
    <BreadboardToolsBtn iconType="PlayFill" onClick={handleClick}>
      Начать моделирование
    </BreadboardToolsBtn>
  );
};
