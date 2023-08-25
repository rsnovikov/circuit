import { ChangeEventHandler, FC, MouseEventHandler, useRef } from 'react';
import { setBreadboardElementFromData } from '@/entities/breadboard';
import { CircuitData } from '@/entities/breadboard/api/types';
import { setNodesFromData } from '@/entities/node';
import { createWiresFromNodes } from '@/entities/wire';
import { notify } from '@/features/notification';
import { useAppDispatch } from '@/shared/model';
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
        const { elements, nodes, wires }: CircuitData = JSON.parse(jsonData);
        dispatch(setBreadboardElementFromData(elements));
        dispatch(setNodesFromData(nodes));
        dispatch(createWiresFromNodes(wires));
      } catch (error) {
        dispatch(notify({ message: 'JSON невалидный', type: 'error' }));
        console.error('JSON невалидный');
      } finally {
        target.value = '';
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
