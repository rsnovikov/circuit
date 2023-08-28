import { FC, PropsWithChildren, SVGProps } from 'react';
import { initialCirElementList } from '@/entities/cirElement/model/InitialCirElementList';
import { ICirElement } from '@/entities/cirElement/model/types';
import { CirElement } from '@/shared/ui/CirElement';

interface ICirElementProps extends SVGProps<SVGGElement> {
  element: ICirElement;
  selectedElementId?: string | null;
}

export const BreadboardCirElement: FC<PropsWithChildren<ICirElementProps>> = ({
  element,
  selectedElementId,
  children,
  ...rest
}) => {
  const { x, y, rotate, id } = element;
  const { hitbox, components } = initialCirElementList[element.type];

  return (
    <>
      <g transform={`translate(${x}, ${y}) rotate(${-rotate})`} stroke="black" fill="transparent">
        <g {...rest}>
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
        </g>
        {children}
      </g>
    </>
  );
};
