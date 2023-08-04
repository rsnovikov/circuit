import { FC, SVGProps } from 'react';
import { IconType, icons } from './icons';

interface IIconProps extends SVGProps<SVGSVGElement> {
  type: IconType;
  isDisabled?: boolean;
}

export const Icon: FC<IIconProps> = ({ type, isDisabled, ...rest }) => {
  const { viewBox, component } = icons[type];
  return (
    <svg
      viewBox={viewBox}
      fill={isDisabled ? '#c5cfd9' : '#34495e'}
      height="100%"
      width="100%"
      {...rest}
    >
      {component()}
    </svg>
  );
};
