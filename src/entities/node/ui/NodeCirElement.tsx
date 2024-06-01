import { FC, HTMLAttributes, PropsWithChildren } from 'react';
import { ICirNode } from '..';
import clsx from "clsx";

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
    <g transform={`translate(${x}, ${y})`} stroke="black" fill="transparent" className={clsx(node.connectionIds.length < 3 && "only-hover-node")}>
      <g {...rest}>
         <circle
          cx={0}
          cy={0}
          r={8}
          className="node"
          fill="green"
          stroke="green"
          strokeOpacity={0.4}
          strokeWidth={selectedNodeId === id ? 4 : 0}
        />
      </g>
      {children}
    </g>
  );
};
