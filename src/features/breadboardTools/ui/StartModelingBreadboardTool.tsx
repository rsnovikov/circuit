import { FC } from 'react';
import { BreadboardToolsBtn } from './BreadboardToolsBtn';

export const StartModelingBreadboardTool: FC = () => {
  const handleClick = () => {
    console.log('start modeling');
  };

  return (
    <BreadboardToolsBtn iconType="PlayFill" onClick={handleClick}>
      Начать моделирование
    </BreadboardToolsBtn>
  );
};
