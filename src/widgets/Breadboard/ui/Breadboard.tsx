import { FC, MouseEventHandler, useEffect, useState } from 'react';
import {
  confirmPickedElement,
  removeSelectedElementId,
  updateDraggableElement,
  updatePickedElementCoords,
  updateTranslateCoords,
} from '@/entities/breadboard/model/slice';
import { updateDraggableNode } from '@/entities/node';
import { removeSelectedNodeId } from '@/entities/node/model/slice';
import {
  confirmWireAndAddNode,
  removeSelectedWireId,
  updateDrawingWireCoords,
} from '@/entities/wire';
import { useScaleBreadboard } from '@/features/scaleBreadboard/useScaleBreadboard';
import { useBreadboardSvgRef } from '@/shared/lib/BreadboardSvgProvider';
import { useAppDispatch, useAppSelector } from '@/shared/model';
import { getMousePosition } from '../../../shared/lib/getMouseCoords';
import { BreadboardDrawingWire } from './BreadboardDrawingWire';
import { BreadboardElements } from './BreadboardElements';
import { BreadboardGrid } from './BreadboardGrid';
import { BreadboardNodes } from './BreadboardNodes';
import { BreadboardPickedElement } from './BreadboardPickedElement';
import { BreadboardWires } from './BreadboardWires';
import { BreadboardWrapper } from './BreadboardWrapper';

export const Breadboard: FC = () => {
  const svgRef = useBreadboardSvgRef();

  const dispatch = useAppDispatch();

  const { pickedElement, draggableElement, selectedElementId } = useAppSelector(
    (state) => state.breadboard
  );
  const { drawingWire, selectedWireId } = useAppSelector((state) => state.wire);
  const { draggableNode, selectedNodeId } = useAppSelector((state) => state.node);

  const [isBreadboardMove, setIsBreadboardMove] = useState<boolean>(false);

  useEffect(() => {
    svgRef.current?.addEventListener('wheel', handleSvgWheel);

    return () => {
      svgRef.current?.removeEventListener('wheel', handleSvgWheel);
    };
  }, []);

  const handleSvgMouseMove: MouseEventHandler = (e) => {
    const { clientX, clientY, movementX, movementY } = e;

    const coords = getMousePosition({ x: clientX, y: clientY }, svgRef.current?.getScreenCTM());
    if (!coords) return;

    if (draggableElement) {
      dispatch(updateDraggableElement({ x: clientX, y: clientY }));
    } else if (pickedElement) {
      dispatch(updatePickedElementCoords(coords));
    } else if (isBreadboardMove) {
      dispatch(updateTranslateCoords({ deltaX: movementX, deltaY: movementY }));
    } else if (drawingWire) {
      dispatch(updateDrawingWireCoords(coords));
    } else if (draggableNode) {
      dispatch(updateDraggableNode({ x: clientX, y: clientY }));
    }
  };

  const handleSvgMouseDown: MouseEventHandler = (e) => {
    if (e.target === e.currentTarget) setIsBreadboardMove(true);
  };

  const handleSvgMouseUp: MouseEventHandler = () => {
    setIsBreadboardMove(false);
  };

  const handleSvgClick: MouseEventHandler<SVGElement> = (e) => {
    const { clientX, clientY } = e;
    if (pickedElement) {
      dispatch(confirmPickedElement());
    }

    if (e.target === e.currentTarget) {
      if (selectedElementId) {
        dispatch(removeSelectedElementId());
      }
      if (selectedNodeId) {
        dispatch(removeSelectedNodeId());
      }
      if (selectedWireId) {
        dispatch(removeSelectedWireId());
      }
    }

    if (drawingWire) {
      const coords = getMousePosition({ x: clientX, y: clientY }, svgRef.current?.getScreenCTM());
      if (!coords) return;
      dispatch(confirmWireAndAddNode(coords));
    }
  };
  const { scaleBreadboard } = useScaleBreadboard();
  const handleSvgWheel: (e: WheelEvent) => void = (e: WheelEvent) => {
    e.preventDefault();
    const { deltaX, deltaY, clientX, clientY } = e;
    scaleBreadboard({ clientX, clientY, deltaX, deltaY });
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
