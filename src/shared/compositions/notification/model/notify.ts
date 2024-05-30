import { nanoid } from 'nanoid';
import { AppDispatch, RootState } from '@/app/appStore';
import { addNotification } from '@/shared/notification/model/slice';
import { INotification, INotifyParams, NotificationType } from '@/shared/notification/model/types';
import { removeNotification } from './removeNotification';

export const notify =
  ({
    message,
    params,
    type,
  }: {
    message: string;
    params?: Partial<INotifyParams>;
    type?: NotificationType;
  }) =>
  (dispatch: AppDispatch, getState: () => RootState) => {
    const { defaultNotifyParams } = getState().notification;

    const notification: INotification = {
      id: nanoid(),
      type: type || 'default',
      message,
      isDestroying: false,
      ...defaultNotifyParams,
      ...params,
    };
    dispatch(addNotification(notification));

    const autoCloseTimeout =
      typeof notification.autoClose === 'number'
        ? notification.autoClose
        : defaultNotifyParams.autoClose || 5000;

    setTimeout(() => {
      dispatch(removeNotification({ notificationId: notification.id }));
    }, autoCloseTimeout);
  };
