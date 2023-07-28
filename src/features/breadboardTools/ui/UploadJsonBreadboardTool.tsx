import { ChangeEventHandler, FC, MouseEventHandler, useRef } from 'react';
import { setBreadboardElementFromData } from '@/entities/breadboard';
import { IBreadboardCirElement } from '@/entities/breadboard/model/types';
import { ICirNode, setNodesFromData } from '@/entities/node';
import { ICirWire, setWiresFromData } from '@/entities/wire';
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
        const {
          elements,
          nodes,
          wires,
        }: { nodes: ICirNode[]; wires: ICirWire[]; elements: IBreadboardCirElement[] } =
          JSON.parse(jsonData);
        dispatch(setBreadboardElementFromData(elements));
        dispatch(setNodesFromData(nodes));
        dispatch(setWiresFromData(wires));
      } catch (error) {
        console.error('JSON невалидный');
      }
    };

    fileReader.readAsText(file);
  };
  return (
    <BreadboardToolsBtn iconType="FileUploadAlt" onClick={handleBtnClick}>
      Загрузить схему из JSON
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
