import { FC, MouseEventHandler } from 'react';
import { useBreadboardSvgRef } from '@/shared/lib/BreadboardSvgProvider';
import { downloadFile } from '@/shared/lib/downloadFile';
import { BreadboardToolsBtn } from './BreadboardToolsBtn';

export const SaveAsSVgBreadboardTool: FC = () => {
  const svgRef = useBreadboardSvgRef();
  const handleClick: MouseEventHandler = () => {
    if (!svgRef.current) return;

    const clonedSvgElement = svgRef.current.cloneNode(true);
    const outerHTML = (clonedSvgElement as SVGSVGElement).outerHTML;

    const blob = new Blob([outerHTML], { type: 'image/svg+xml;charset=utf-8' });
    const blobURL = window.URL.createObjectURL(blob);
    downloadFile(blobURL, 'circuit.svg');
  };

  return (
    <BreadboardToolsBtn iconType="ImageDownload" onClick={handleClick}>
      Сохранить как SVG
    </BreadboardToolsBtn>
  );
};
