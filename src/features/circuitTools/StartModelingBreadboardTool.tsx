import { FC } from 'react';
import { useAppDispatch, useAppSelector } from '@/shared/model';
import { notify } from '@/shared/notification';
import { BreadboardToolsBtn } from './BreadboardToolsBtn';
import { analyzeCircuit } from 'MNA';
export const StartModelingBreadboardTool: FC = () => {
  const dispatch = useAppDispatch();
  const nodes = useAppSelector(state => state.node.nodes);
  const elements = useAppSelector(state => state.cirElement.elements);
  const handleClick = () => {
    console.log(analyzeCircuit({nodes, elements}))
    dispatch(notify({ message: 'Пока не реализовано :(', type: 'info' }));
  };

  return (
    <BreadboardToolsBtn iconType="PlayFill" onClick={handleClick}>
      Начать моделирование
    </BreadboardToolsBtn>
  );
};
