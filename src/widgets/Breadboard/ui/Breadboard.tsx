import { FC, MouseEventHandler, useEffect } from 'react';
import { useDragElement } from '@/features/dragElement';
import { useDragNode } from '@/features/dragNode/useDragNode';
import { useDrawWire } from '@/features/drawWire/useDrawWire';
import { useMoveBreadboard } from '@/features/moveBreadboard/useMoveBreadboard';
import { usePickElement } from '@/features/pickElement';
import { useScaleBreadboard } from '@/features/scaleBreadboard/useScaleBreadboard';
import { useSelectBreadboardElement } from '@/features/selectBreadboardElement/useSelectBreadboardElement';
import { useSelectNode } from '@/features/selectNode/useSelectNode';
import { useSelectWire } from '@/features/selectWire/useSelectWire';
import { useBreadboardSvgRef } from '@/shared/lib/BreadboardSvgProvider';
import { BreadboardDrawingWire } from './BreadboardDrawingWire';
import { BreadboardElements } from './BreadboardElements';
import { BreadboardGrid } from './BreadboardGrid';
import { BreadboardNodes } from './BreadboardNodes';
import { BreadboardPickedElement } from './BreadboardPickedElement';
import { BreadboardWires } from './BreadboardWires';
import { BreadboardWrapper } from './BreadboardWrapper';

export const Breadboard: FC = () => {
  const svgRef = useBreadboardSvgRef();

  const { scaleBreadboard } = useScaleBreadboard();
  const { startMoveBreadboard, moveBreadboard, endMoveBreadboard } = useMoveBreadboard();
  const { movePickedElement, confirmPickedElement } = usePickElement();
  const { updateDrawingWire, confirmWireToBreadboard } = useDrawWire();
  const { dragElement } = useDragElement();
  const { dragNode } = useDragNode();
  const { unselectElement } = useSelectBreadboardElement();
  const { unselectWire } = useSelectWire();
  const { unselectNode } = useSelectNode();

  // wheel event
  useEffect(() => {
    svgRef.current?.addEventListener('wheel', handleSvgWheel);

    return () => {
      svgRef.current?.removeEventListener('wheel', handleSvgWheel);
    };
  }, []);

  const handleSvgWheel: (e: WheelEvent) => void = (e: WheelEvent) => {
    e.preventDefault();
    const { deltaX, deltaY, clientX, clientY } = e;
    scaleBreadboard({ clientX, clientY, deltaX, deltaY });
  };

  // mouse move event
  const handleSvgMouseMove: MouseEventHandler = (e) => {
    const { clientX, clientY, movementX, movementY } = e;
    const clientCoords = { clientX, clientY };
    moveBreadboard({ movementX, movementY });
    dragElement(clientCoords);
    movePickedElement(clientCoords);
    updateDrawingWire(clientCoords);
    dragNode(clientCoords);
  };

  // mouse down/up events
  const handleSvgMouseDown: MouseEventHandler = (e) => {
    if (e.target === e.currentTarget) {
      startMoveBreadboard();
    }
  };

  const handleSvgMouseUp: MouseEventHandler = () => {
    endMoveBreadboard();
  };

  // click event
  const handleSvgClick: MouseEventHandler<SVGElement> = (e) => {
    const { clientX, clientY } = e;
    confirmPickedElement();
    confirmWireToBreadboard({ clientX, clientY });

    if (e.target === e.currentTarget) {
      unselectWire();
      unselectElement();
      unselectNode();
    }
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      className="absolute inset-0 bg-[#f4f5f6]"
      onMouseMove={handleSvgMouseMove}
      onClick={handleSvgClick}
      ref={svgRef}
      onMouseDown={handleSvgMouseDown}
      onMouseUp={handleSvgMouseUp}
    >
      <BreadboardGrid />
      <BreadboardWrapper>
        <BreadboardDrawingWire />
        <BreadboardWires />
        <BreadboardElements />
        <BreadboardNodes />
        <BreadboardPickedElement />
      </BreadboardWrapper>
    </svg>
  );
};
