import { FC, MouseEventHandler, useEffect, useRef, useState } from 'react';
import {
  confirmPickedElement,
  removeSelectedElementId,
  updateDraggableElement,
  updatePickedElementCoords,
  updateScale,
  updateTranslateCoords,
} from '@/entities/breadboard/model/slice';
import { updateDraggableNode } from '@/entities/node';
import { removeSelectedNodeId } from '@/entities/node/model/slice';
import {
  confirmWireAndAddNode,
  removeDrawingWire,
  removeSelectedWireId,
  updateDrawingWireCoords,
} from '@/entities/wire';
import { useKeyDown } from '@/shared/lib/useKeyDown';
import { useAppDispatch, useAppSelector } from '@/shared/model';
import { getMousePosition } from '../lib/getMouseCoords';
import { BreadboardDrawingWire } from './BreadboardDrawingWire';
import { BreadboardElements } from './BreadboardElements';
import { BreadboardGrid } from './BreadboardGrid';
import { BreadboardNodes } from './BreadboardNodes';
import { BreadboardPickedElement } from './BreadboardPickedElement';
import { BreadboardWires } from './BreadboardWires';

export const Breadboard: FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  const dispatch = useAppDispatch();

  const {
    pickedElement,
    draggableElement,
    selectedElementId,
    scale,
    translateCoords: { translateX, translateY },
  } = useAppSelector((state) => state.breadboard);
  const { drawingWire, selectedWireId } = useAppSelector((state) => state.wire);
  const { draggableNode, selectedNodeId } = useAppSelector((state) => state.node);

  const [isBreadboardMove, setIsBreadboardMove] = useState<boolean>(false);
  const [SvgDimensions, setSvgDimensions] = useState<{ width: number; height: number }>();

  useEffect(() => {
    svgRef.current?.addEventListener('wheel', handleSvgWheel);

    return () => {
      svgRef.current?.removeEventListener('wheel', handleSvgWheel);
    };
  }, []);

  useEffect(() => {
    if (!svgRef.current) return;

    setSvgDimensions({ width: svgRef.current.clientWidth, height: svgRef.current.clientHeight });
  }, [svgRef.current]);

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

  const handleSvgWheel: (e: WheelEvent) => void = (e: WheelEvent) => {
    e.preventDefault();
    const { deltaX, deltaY, clientX, clientY } = e;
    const coords = getMousePosition({ x: clientX, y: clientY }, svgRef.current?.getScreenCTM());
    if (!coords) return;
    const delta = deltaY || deltaX;
    const scaleStep = Math.abs(delta) < 50 ? 0.1 : 0.2;
    const scaleDelta = delta < 0 ? scaleStep : -scaleStep;

    dispatch(updateScale(scaleDelta, coords));
  };

  const handleKeyDownRemoveSelected = () => {
    dispatch(removeSelectedElementId());
    dispatch(removeDrawingWire());
  };

  useKeyDown({ callback: handleKeyDownRemoveSelected, codes: ['Escape'] });

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      id="breadboard"
      width="100%"
      height="100%"
      className="absolute inset-0 bg-[#f4f5f6]"
      onMouseMove={handleSvgMouseMove}
      onClick={handleSvgClick}
      ref={svgRef}
      onMouseDown={handleSvgMouseDown}
      onMouseUp={handleSvgMouseUp}
    >
      <BreadboardGrid width={SvgDimensions?.width} height={SvgDimensions?.height} />

      <g transform={`matrix(${scale}, 0, 0, ${scale}, ${translateX}, ${translateY})`}>
        <BreadboardDrawingWire />
        <BreadboardWires />
        <BreadboardElements />
        <BreadboardNodes />
        <BreadboardPickedElement />
      </g>
    </svg>
  );
};
