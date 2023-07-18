import { FC } from 'react';
import { icons } from './icons';

export type IconType = 'arrowRightSLine' | 'arrowLeftSLine';

interface IIconProps extends React.SVGProps<SVGSVGElement> {
  type: IconType;
}

export const Icon: FC<IIconProps> = ({ type, ...rest }) => {
  const { viewBox, component } = icons[type];
  return (
    <svg
      viewBox={viewBox}
      fill="currentColor"
      height="100%"
      width="100%"
      {...rest}
    >
      {component()}
    </svg>
  );
};
