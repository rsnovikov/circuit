import { FC, MouseEventHandler } from 'react';
import { downloadFile } from '@/shared/lib/downloadFile';
import { BreadboardToolsBtn } from './BreadboardToolsBtn';

export const SaveAsSVgBreadboardTool: FC = () => {
  const handleClick: MouseEventHandler = () => {
    const svgElement: SVGSVGElement | null = document.getElementById(
      'breadboard'
    ) as SVGSVGElement | null;
    if (!svgElement) return;

    const clonedSvgElement = svgElement.cloneNode(true);
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
