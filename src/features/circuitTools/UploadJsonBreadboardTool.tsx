import { ChangeEventHandler, FC, MouseEventHandler, useRef } from 'react';
import { setCirElements } from '@/entities/cirElement/model/slice';
import { CircuitData } from '@/entities/circuit/api/types';
import { setNodes } from '@/entities/node/model/slice';
import { createWiresFromCircuitDataAction } from '@/entities/wire/model/actions/createWiresFromCircuitDataAction';
import { useAppDispatch } from '@/shared/model';
import { notify } from '@/shared/notification';
import { BreadboardToolsBtn } from './BreadboardToolsBtn';

export const UploadJsonBreadboardTool: FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();

  const handleBtnClick: MouseEventHandler = () => {
    inputRef.current?.click();
  };

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    const file = target.files?.[0];

    if (!file) return;
    const fileReader = new FileReader();

    fileReader.onload = (e) => {
      const jsonData = e.target?.result;
      if (typeof jsonData !== 'string') return;
      try {
        const circuitData: CircuitData = JSON.parse(jsonData);
        dispatch(setCirElements(circuitData.elements));
        dispatch(setNodes(circuitData.nodes));
        dispatch(createWiresFromCircuitDataAction(circuitData));
      } catch (error) {
        dispatch(notify({ message: 'JSON невалидный', type: 'error' }));
        console.error('JSON невалидный');
      } finally {
        (target as HTMLInputElement).value = '';
      }
    };

    fileReader.readAsText(file);
  };
  return (
    <BreadboardToolsBtn iconType="FileUploadAlt" onClick={handleBtnClick}>
      Загрузить из JSON
      <input
        type="file"
        accept=".json"
        ref={inputRef}
        onChange={handleInputChange}
        className="opacity-0 w-0 h-0 overflow-hidden"
      />
    </BreadboardToolsBtn>
  );
};
