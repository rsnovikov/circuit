import { FC, PropsWithChildren, SVGProps } from 'react';
import { initialCirElementList } from '@/entities/cirElement/model/InitialCirElementList';
import { ICirElement } from '@/entities/cirElement/model/types';
import { CirElement } from '@/shared/ui/CirElement';
import { useAppDispatch } from "@/shared/model";
import { interactCirElementActionRecord } from "@/features/interactCirElement";

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
  const dispatch = useAppDispatch()
  const { x, y, rotate, id } = element;
  const { hitbox, components, Layout } = initialCirElementList[element.type];

  return (
    <>
      <g transform={`translate(${x}, ${y}) rotate(${-rotate})`} stroke="black" fill="transparent">
        <g {...rest} onDoubleClick={() => {
 const interact = interactCirElementActionRecord[element.type];
 if(!interact) {
   return;
 }
  dispatch(interact(element.id))
        }}>
          <CirElement components={components} isSelected={selectedElementId === id} Layout={Layout} power={element.power}/>
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
