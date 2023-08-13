import { FC, MouseEventHandler } from 'react';
import { endWireToNode, startWireFromNode } from '@/entities/wire';
import { useAppDispatch, useAppSelector } from '@/shared/model';

interface INodeTerminalProps {
  nodeId: string;
}

export const NodeTerminal: FC<INodeTerminalProps> = ({ nodeId }) => {
  const drawingWire = useAppSelector((state) => state.wire.drawingWire);
  const dispatch = useAppDispatch();

  const handleClick: MouseEventHandler = (e) => {
    console.log('click node');
    // todo: maybe remove stopPropagation and add check to the handleSvgClick in widget Breadboard
    e.stopPropagation();
    if (drawingWire) {
      dispatch(endWireToNode(nodeId));
    } else {
      dispatch(startWireFromNode(nodeId));
    }
  };

  return (
    <rect
      onClick={handleClick}
      x="-4"
      y="-4"
      width="8"
      height="8"
      strokeWidth="0"
      className="hover:stroke-2 hover:fill-[red]"
    />
  );
};
