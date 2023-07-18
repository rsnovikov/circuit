import { FC } from 'react';
import { ICirElement } from '@/shared/model/types';

interface ICirElementProps {
  cirElem: ICirElement;
  isSelected: boolean;
}

export const CirElement: FC<ICirElementProps> = ({ cirElem }) => {
  return (
    <>
      {cirElem.components.map((component) => (
        <path
          // todo: use id instead of d
          key={component.d}
          d={component.d}
          stroke="black"
          fill="transparent"
          strokeWidth="2"
        />
      ))}
    </>
  );
};
