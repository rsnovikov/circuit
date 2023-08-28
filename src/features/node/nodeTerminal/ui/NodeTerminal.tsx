import { FC, MouseEventHandler } from 'react';
import { useAppDispatch, useAppSelector } from '@/shared/model';
import { endWireToNodeAction } from '../model/endWireToNodeAction';
import { startWireFromNodeAction } from '../model/startWireFromNodeAction';

interface INodeTerminalProps {
  nodeId: string;
}

export const NodeTerminal: FC<INodeTerminalProps> = ({ nodeId }) => {
  const drawingWire = useAppSelector((state) => state.wire.drawingWire);
  const dispatch = useAppDispatch();

  const handleClick: MouseEventHandler = (e) => {
    // todo: maybe remove stopPropagation and add check to the handleSvgClick in widget Breadboard
    e.stopPropagation();
    if (drawingWire) {
      dispatch(endWireToNodeAction(nodeId));
    } else {
      dispatch(startWireFromNodeAction(nodeId));
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
