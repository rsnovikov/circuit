import { FC, MouseEventHandler } from 'react';
import { endWireToNode, startWireFromNode } from '@/entities/wire';
import { useAppDispatch, useAppSelector } from '@/shared/model';
import { ICirNode, addDraggableNode, confirmDraggableNode } from '..';

interface INodeCirElementProps {
  node: ICirNode;
}

export const NodeCirElement: FC<INodeCirElementProps> = ({ node }) => {
  const { x, y, id } = node;
  const dispatch = useAppDispatch();
  const selectedNodeId = useAppSelector((state) => state.node.selectedNodeId);
  const drawingWire = useAppSelector((state) => state.wire.drawingWire);

  const handleMouseDown: MouseEventHandler = (e) => {
    const { clientX, clientY } = e;
    dispatch(
      addDraggableNode({
        nodeId: id,
        clientX,
        clientY,
      })
    );
  };

  const handleMouseUp: MouseEventHandler = () => {
    dispatch(confirmDraggableNode());
    console.log('mouse up');
  };

  const handleTerminalClick: MouseEventHandler = (e) => {
    // todo: maybe remove stopPropagation and add check to the handleSvgClick in widget Breadboard
    e.stopPropagation();
    if (drawingWire) {
      dispatch(endWireToNode(id));
    } else {
      dispatch(startWireFromNode(id));
      console.log('click');
    }
  };

  return (
    <g
      transform={`translate(${x}, ${y})`}
      stroke="black"
      fill="transparent"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      <circle
        cx={0}
        cy={0}
        r={5}
        fill="green"
        stroke="green"
        strokeOpacity={0.4}
        strokeWidth={selectedNodeId === id ? 4 : 0}
      />
      <rect
        onClick={handleTerminalClick}
        x="-4"
        y="-4"
        width="8"
        height="8"
        strokeWidth="0"
        className="hover:stroke-2 hover:fill-[red]"
      />
    </g>
  );
};
