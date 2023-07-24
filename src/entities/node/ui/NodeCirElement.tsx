import { FC, MouseEventHandler } from 'react';
import { useAppDispatch, useAppSelector } from '@/shared/model';
import { ICirNode, addDraggableNode, confirmDraggableNode } from '..';

interface INodeCirElementProps {
  node: ICirNode;
}

export const NodeCirElement: FC<INodeCirElementProps> = ({ node }) => {
  const { x, y, id } = node;
  const dispatch = useAppDispatch();
  const selectedNodeId = useAppSelector((state) => state.node.selectedNodeId);
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
  };

  return (
    <circle
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      cx={x}
      cy={y}
      r={5}
      fill="green"
      stroke="green"
      strokeOpacity={0.4}
      strokeWidth={selectedNodeId === id ? 4 : 0}
    />
  );
};
