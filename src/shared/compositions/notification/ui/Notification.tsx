import { FC, MouseEvent, useRef } from 'react';
import { Transition } from 'react-transition-group';
import clsx from 'clsx';
import { Icon } from '@/shared/ui/Icon/Icon';
import { getIconProps } from '../lib/getIconProps';
import { INotification } from '../model/types';
import './notification.css';

interface INotificationProps {
  notification: INotification;
  handleCloseClick?: (e: MouseEvent) => void;
}

export const Notification: FC<INotificationProps> = ({ handleCloseClick, notification }) => {
  const { message, animDuration, isDestroying, type } = notification;

  const nodeRef = useRef(null);
  return (
    <Transition in={!isDestroying} appear={true} nodeRef={nodeRef} timeout={animDuration}>
      {(state) => (
        <div
          ref={nodeRef}
          className={clsx(
            'relative p-2 mb-4 flex items-center justify-between rounded shadow-[0_1px_10px_0_rgba(0,0,0,.1)_,_0_2px_15px_0_rgba(0,0,0,.05)] bg-white',
            `notification ${state}`
          )}
        >
          {type === 'default' ? (
            <div className="grow p-2 h-full">{message}</div>
          ) : (
            <div className="grow p-2 flex h-full items-center">
              <div>
                <Icon width={25} height={25} {...getIconProps(type)} />
              </div>
              <div className="ml-2">{message}</div>
            </div>
          )}
          <Icon
            type="Close"
            width={16}
            height={16}
            className="self-start cursor-pointer"
            onClick={handleCloseClick}
          />
        </div>
      )}
    </Transition>
  );
};
