import { FC } from 'react';
import { useAppDispatch, useAppSelector } from '@/shared/model';
import { notify } from '@/shared/notification';
import { BreadboardToolsBtn } from './BreadboardToolsBtn';
import { analyzeCircuit } from 'MNA/analyzeCircuit';
import { setCirElements } from '@/entities/cirElement/model/slice';
import { CircuitData } from '@/entities/circuit/api/types';
import { ICirElement } from '@/entities/cirElement/model/types';

export const StartModelingBreadboardTool: FC = () => {
  const dispatch = useAppDispatch();
  const nodes = useAppSelector(state => state.node.nodes);
  const elements = useAppSelector(state => state.cirElement.elements);
  const handleClick = () => {
    const currentData: CircuitData = JSON.parse(JSON.stringify({ nodes, elements }))
    try {
      const elementsToChange: ICirElement[] = analyzeCircuit(currentData)
      currentData.elements = currentData.elements.map(e => {
        const index: number = elementsToChange.findIndex(element => element.id === e.id)
        return index >= 0 ? elementsToChange[index] : e;
      })
      console.log(currentData)
      dispatch(setCirElements(currentData.elements));
    } catch (error) {
      dispatch(notify({ message: 'НАСРАЛ ГОВНА', type: 'error' }));
    }
  };

  return (
    <BreadboardToolsBtn iconType="PlayFill" onClick={handleClick}>
      Начать моделирование
    </BreadboardToolsBtn>
  );
};
