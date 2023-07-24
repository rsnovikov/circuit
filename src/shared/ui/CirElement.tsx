import { FC, Fragment } from 'react';
import { ICirElement } from '@/shared/model/types';

interface ICirElementProps {
  cirElem: ICirElement;
  isSelected?: boolean;
}

export const CirElement: FC<ICirElementProps> = ({ cirElem, isSelected, ...rest }) => {
  return (
    <>
      {cirElem.components.map((component) => (
        // todo: use id instead of d
        <Fragment key={component.d}>
          {isSelected && (
            <path
              d={component.d}
              fill="transparent"
              stroke="DodgerBlue"
              strokeOpacity={0.4}
              strokeWidth={6}
            />
          )}
          <path d={component.d} fill="transparent" stroke="black" strokeWidth={3} />
        </Fragment>
      ))}
    </>
  );
};
