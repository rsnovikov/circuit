import { FC, HTMLAttributes, PropsWithChildren, ReactElement, useRef, useState } from 'react';
import { Transition } from 'react-transition-group';
import clsx from 'clsx';

export interface ITooltipProps extends HTMLAttributes<HTMLDivElement> {
  tooltip: ReactElement;
  isActive?: boolean;
}

export const Tooltip: FC<PropsWithChildren<ITooltipProps>> = ({
  tooltip,
  children,
  className,
  isActive = true,
  ...rest
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const tooltipRef = useRef(null);

  const handleMouseOver = () => {
    if (isActive) setIsVisible(true);
  };

  const handleMouseOut = () => {
    if (isActive) setIsVisible(false);
  };

  const transitionStyles: { [key: string]: React.CSSProperties } = {
    entering: { opacity: 1 },
    entered: { opacity: 1 },
    exiting: { opacity: 0 },
    exited: { opacity: 0 },
  };

  const duration = 500;
  return (
    <div className="relative">
      <div className="flex" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
        {children}
      </div>
      <Transition
        nodeRef={tooltipRef}
        in={isVisible}
        timeout={duration}
        mountOnEnter={true}
        unmountOnExit={true}
      >
        {(state) => (
          <div
            ref={tooltipRef}
            className={clsx(
              'w-auto h-auto bg-gray-600 rounded absolute top-12 z-50 text-white px-2 transition-opacity',
              `duration-${duration}`,
              state,
              className
            )}
            {...rest}
            style={{ ...transitionStyles[state] }}
          >
            <div
              className="absolute -top-4 left-[6px]"
              style={{
                border: '10px solid transparent',
                borderBottom: '10px solid rgb(75 85 99)',
              }}
            ></div>
            {tooltip}
          </div>
        )}
      </Transition>
    </div>
  );
};
