import { FC } from 'react';
import { ICirNode } from '..';

interface INodeCirElementProps {
  node: ICirNode;
}

export const NodeCirElement: FC<INodeCirElementProps> = ({ node }) => {
  const { x, y } = node;
  return <circle cx={x} cy={y} r={5} fill="green" />;
};
