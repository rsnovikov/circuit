import { FC } from 'react';
import { ICirNode } from '@/entities/breadboard/model/types';

interface INodeElementProps {
  node: ICirNode;
}

export const NodeElement: FC<INodeElementProps> = ({ node }) => {
  const { x, y } = node;
  return <circle cx={x} cy={y} r={5} fill="green" />;
};
