import { FC, PropsWithChildren, SVGProps } from 'react';
import { cirElementList } from '@/shared/api/__mock__/cirElementList';
import { CirElement } from '@/shared/ui/CirElement';
import { IBreadboardCirElement } from '../model/types';

interface IBreadboardCirElementProps extends SVGProps<SVGGElement> {
  element: IBreadboardCirElement;
  selectedElementId?: string | null;
}

export const BreadboardCirElement: FC<PropsWithChildren<IBreadboardCirElementProps>> = ({
  element,
  selectedElementId,
  children,
  ...rest
}) => {
  const { x, y, rotate, id } = element;
  const { hitbox, components } = cirElementList[element.type];

  return (
    <>
      <g
        transform={`translate(${x}, ${y}) rotate(${-rotate})`}
        stroke="black"
        fill="transparent"
        {...rest}
      >
        <CirElement components={components} isSelected={selectedElementId === id} />
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
        {children}
      </g>
    </>
  );
};
