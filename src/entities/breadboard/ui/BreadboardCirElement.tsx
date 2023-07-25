import { FC, MouseEvent, SVGProps } from 'react';
import { endWireToElement, startWireFromElement } from '@/entities/wire';
import { useAppDispatch, useAppSelector } from '@/shared/model';
import { CirElement } from '@/shared/ui/CirElement';
import { IBreadboardCirElement } from '../model/types';

interface IBreadboardCirElementProps extends SVGProps<SVGGElement> {
  element: IBreadboardCirElement;
}

export const BreadboardCirElement: FC<IBreadboardCirElementProps> = ({ element, ...rest }) => {
  const dispatch = useAppDispatch();
  const selectedElementId = useAppSelector((state) => state.breadboard.selectedElementId);
  const drawingWire = useAppSelector((state) => state.wire.drawingWire);
  const { x, y, rotate, terminals, hitbox, id } = element;

  const handleTerminalClick = (e: MouseEvent, terminalId: string, elementId: string) => {
    // todo: maybe remove stopPropagation and add check to the handleSvgClick in widget Breadboard
    e.stopPropagation();
    if (drawingWire) {
      dispatch(endWireToElement({ terminalId, elementId }));
    } else {
      dispatch(
        startWireFromElement({
          terminalId,
          elementId,
        })
      );
    }
  };

  return (
    <>
      <g
        transform={`translate(${x}, ${y}) rotate(${rotate})`}
        stroke="black"
        fill="transparent"
        {...rest}
      >
        <CirElement cirElem={element} isSelected={selectedElementId === id} />
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
        {terminals?.map(({ id: terminalId, x, y }) => (
          <rect
            onClick={(e) => handleTerminalClick(e, terminalId, id)}
            key={terminalId}
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
    </>
  );
};
