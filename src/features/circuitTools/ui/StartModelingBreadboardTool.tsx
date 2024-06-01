import { FC } from 'react';
import { useAppDispatch } from '@/shared/model';
import { BreadboardToolsBtn } from './BreadboardToolsBtn';
import { startModelingAction } from "../model/startModelingAction";

export const StartModelingBreadboardTool: FC = () => {
  const dispatch = useAppDispatch();
  const handleClick = () => {
    dispatch(startModelingAction());
  };

  return (
    <BreadboardToolsBtn iconType="PlayFill" onClick={handleClick}>
      Начать моделирование
    </BreadboardToolsBtn>
  );
};
