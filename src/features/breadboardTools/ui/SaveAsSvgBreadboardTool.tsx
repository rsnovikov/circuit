import { FC, MouseEventHandler } from 'react';
import { downloadFile } from '@/shared/lib/downloadFile';
import { Icon } from '@/shared/ui/Icon/Icon';

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
    <button
      className="h-[32px] px-2 border rounded-sm border-[#34495e] flex items-center justify-between shadow-sm"
      onClick={handleClick}
      // style={{
      //   cursor: isBtnActive ? 'pointer' : 'default',
      // }}
    >
      <span className="h-[32px] py-1 mr-1">
        <Icon type="Save" className="grow-0 " />
      </span>
      <span>Сохранить как SVG</span>
    </button>
  );
};
