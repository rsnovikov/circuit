import { FC } from 'react';
import { NodeCirElement } from '@/entities/node';
import { useAppSelector } from '@/shared/model';

export const BreadboardNodes: FC = () => {
  const nodes = useAppSelector((state) => state.node.nodes);

  return nodes.map((node) =>
    !node.relatedElement ? <NodeCirElement key={node.id} node={node} /> : null
  );
};
