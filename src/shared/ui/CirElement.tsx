import { FC, Fragment } from 'react';
import { IComponent } from '@/shared/model/types';

interface ICirElementProps {
  components: IComponent[];
  isSelected?: boolean;
}

export const CirElement: FC<ICirElementProps> = ({ components, isSelected }) => {
  return (
    <>
      {components.map((component) => (
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
