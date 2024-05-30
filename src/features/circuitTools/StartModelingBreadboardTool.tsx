import { FC } from 'react';
import { useAppDispatch, useAppSelector } from '@/shared/model';
import { notify } from '@/shared/notification';
import { BreadboardToolsBtn } from './BreadboardToolsBtn';
import { analyzeCircuit } from 'MNA/analyzeCircuit';
import { setCirElements } from '@/entities/cirElement/model/slice';
import { CircuitData } from '@/entities/circuit/api/types';
import { ICirElement } from '@/entities/cirElement/model/types';
import { executeCirElementActionRecord } from "../executeCirElement";

export const StartModelingBreadboardTool: FC = () => {
  const dispatch = useAppDispatch();
  const nodes = useAppSelector(state => state.node.nodes);
  const elements = useAppSelector(state => state.cirElement.elements);
  const handleClick = () => {
    const currentData: CircuitData = JSON.parse(JSON.stringify({ nodes, elements }))
    try {
      console.log('currentData',currentData.nodes);
      const elementsToChange: ICirElement[] = analyzeCircuit(currentData)
      currentData.elements = currentData.elements.map(e => {
        const index: number = elementsToChange.findIndex(element => element.id === e.id)
        return index >= 0 ? elementsToChange[index] : e;
      })
      dispatch(setCirElements(currentData.elements));
      currentData.elements.forEach((cirElem) => {
        const action = executeCirElementActionRecord[cirElem.type];

        if(!action) {
          return;
        }

        dispatch(action(cirElem.id));
      })
    } catch (error) {
      console.error(error);
      dispatch(notify({ message: 'Ошибка при просчете', type: 'error' }));
    }
  };

  return (
    <BreadboardToolsBtn iconType="PlayFill" onClick={handleClick}>
      Начать моделирование
    </BreadboardToolsBtn>
  );
};
