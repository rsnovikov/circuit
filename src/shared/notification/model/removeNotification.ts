import { AppDispatch, RootState } from '@/app/appStore';
import { removeNotificationById, updateNotificationById } from '@/shared/notification/model/slice';
import { INotification } from '@/shared/notification/model/types';

export const removeNotification =
  ({ notificationId }: { notificationId: string }) =>
  (dispatch: AppDispatch, getState: () => RootState) => {
    const { notifications } = getState().notification;

    const notification = notifications.find((notification) => notification.id === notificationId);
    if (!notification || notification.isDestroying) return;
    const updatedNotification: INotification = { ...notification, isDestroying: true };

    dispatch(updateNotificationById({ id: notificationId, updatedNotification }));

    setTimeout(() => {
      dispatch(removeNotificationById(notificationId));
    }, notification.animDuration);
  };
