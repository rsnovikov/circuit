import { FC, PropsWithChildren } from 'react';
import { ITooltipProps, Tooltip } from './Tooltip';

interface IHotkeyTooltipProps extends Omit<ITooltipProps, 'tooltip'> {
  text: string;
  hotkey: string;
}

export const HotkeyTooltip: FC<PropsWithChildren<IHotkeyTooltipProps>> = ({
  text,
  hotkey,
  children,
  ...rest
}) => {
  return (
    <Tooltip
      tooltip={
        <div className="py-1.5">
          <div className="leading-none mb-1 whitespace-nowrap">{text}</div>
          <div className="text-green-500 tracking-tight leading-none">{hotkey}</div>
        </div>
      }
      {...rest}
    >
      {children}
    </Tooltip>
  );
};
