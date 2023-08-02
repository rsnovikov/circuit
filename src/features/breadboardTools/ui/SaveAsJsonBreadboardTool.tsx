import { FC, MouseEventHandler } from 'react';
import { selectWiresData } from '@/entities/wire';
import { downloadFile } from '@/shared/lib/downloadFile';
import { useAppSelector } from '@/shared/model';
import { BreadboardToolsBtn } from './BreadboardToolsBtn';

export const SaveAsJsonBreadboardTool: FC = () => {
  const elements = useAppSelector((state) => state.breadboard.elements);
  const nodes = useAppSelector((state) => state.node.nodes);
  const wires = useAppSelector(selectWiresData);
  const handleClick: MouseEventHandler = () => {
    const data = { elements, nodes, wires };
    const jsonData = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonData], { type: 'application/json' });
    const blobURL = window.URL.createObjectURL(blob);
    downloadFile(blobURL, 'circuit.json');
  };

  return (
    <BreadboardToolsBtn iconType="FileDownloadAlt" onClick={handleClick}>
      Сохранить как JSON
    </BreadboardToolsBtn>
  );
};
