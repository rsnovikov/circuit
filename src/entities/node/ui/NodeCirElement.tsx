import { FC, HTMLAttributes, PropsWithChildren } from 'react';
import { ICirNode } from '..';

interface INodeCirElementProps extends HTMLAttributes<SVGGElement> {
  node: ICirNode;
  selectedNodeId: string | null;
}

export const NodeCirElement: FC<PropsWithChildren<INodeCirElementProps>> = ({
  node,
  selectedNodeId,
  children,
  ...rest
}) => {
  const { x, y, id } = node;

  return (
    <g {...rest} transform={`translate(${x}, ${y})`} stroke="black" fill="transparent">
      <circle
        cx={0}
        cy={0}
        r={8}
        fill="green"
        stroke="green"
        strokeOpacity={0.4}
        strokeWidth={selectedNodeId === id ? 4 : 0}
      />
      {children}
    </g>
  );
};
