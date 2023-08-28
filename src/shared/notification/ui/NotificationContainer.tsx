import { FC } from 'react';
import { useAppDispatch, useAppSelector } from '@/shared/model';
import { removeNotification } from '../model/removeNotification';
import { Notification } from './Notification';

export const NotificationContainer: FC = () => {
  const notifications = useAppSelector((state) => state.notification.notifications);
  const dispatch = useAppDispatch();

  if (notifications.length <= 0) return null;

  const handleCloseClick = (id: string) => {
    dispatch(removeNotification({ notificationId: id }));
  };

  return (
    <div className="fixed top-4 right-4 z-50 w-[320px]">
      {notifications.map((notification) => (
        <Notification
          key={notification.id}
          notification={notification}
          handleCloseClick={() => handleCloseClick(notification.id)}
        />
      ))}
    </div>
  );
};
