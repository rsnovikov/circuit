import { FC } from 'react';
import { ICirElement, ICoords } from '@/shared/ui/types';

interface ICirElementProps {
  cirElem: ICirElement;
  coords?: ICoords;
}

export const CirElement: FC<ICirElementProps> = ({ cirElem, coords }) => {
  return (
    <g transform={coords && `translate(${coords.x}, ${coords.y})`}>
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
    </g>
  );
};
