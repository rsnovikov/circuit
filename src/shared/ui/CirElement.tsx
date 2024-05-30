import { FC, Fragment, memo } from 'react';
import { IComponent, IInitialCirElement } from '@/shared/model/types';
import { ICirElement } from "@/entities/cirElement/model/types";

interface ICirElementProps extends Pick<ICirElement, 'power'>{
  components?: IComponent[];
  Layout?: IInitialCirElement['Layout'];
  isSelected: boolean;
}

export const CirElement: FC<ICirElementProps> = memo(({ components, isSelected, Layout, power,  }) => {
  if(Layout) {
    return <Layout power={power} isSelected={isSelected}/>
  }

  return (
    <>
      {components?.map((component) => (
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
});
