import { FC, SVGProps } from 'react';
import { CirElement } from '@/shared/ui/CirElement';
import { IBreadboardCirElement } from '../model/types';

interface IBreadboardCirElementProps extends SVGProps<SVGGElement> {
  element: IBreadboardCirElement;
}

export const BreadboardCirElement: FC<IBreadboardCirElementProps> = ({
  element,
  ...rest
}) => {
  const { x, y, rotate, terminals, hitbox } = element;
  return (
    <g
      transform={`translate(${x}, ${y}) rotate(${rotate})`}
      stroke="black"
      fill="transparent"
      {...rest}
    >
      <CirElement cirElem={element} />
      {hitbox && (
        <rect
          fill="transparent"
          stroke="none"
          x={hitbox.x1}
          y={hitbox.y1}
          width={hitbox.x2 - hitbox.x1}
          height={Math.abs(hitbox.y2 - hitbox.y1)}
        />
      )}
      {terminals.map(({ id, x, y }) => (
        <rect
          key={id}
          transform={`translate(${x}, ${y})`}
          x="-4"
          y="-4"
          width="8"
          height="8"
          strokeWidth="0"
          className="hover:stroke-2 hover:fill-[red]"
        />
      ))}
    </g>
  );
};
