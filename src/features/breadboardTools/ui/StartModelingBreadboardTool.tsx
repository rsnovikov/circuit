import { FC } from 'react';
import { notify } from '@/features/notification';
import { useAppDispatch } from '@/shared/model';
import { BreadboardToolsBtn } from './BreadboardToolsBtn';

export const StartModelingBreadboardTool: FC = () => {
  const dispatch = useAppDispatch();
  const handleClick = () => {
    dispatch(notify({ message: 'Моделирование началось', type: 'info' }));
  };

  return (
    <BreadboardToolsBtn iconType="PlayFill" onClick={handleClick}>
      Начать моделирование
    </BreadboardToolsBtn>
  );
};
