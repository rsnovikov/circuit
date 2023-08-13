import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { INotification, INotifyParams } from './types';

interface INotificationSlice {
  notifications: INotification[];
  defaultNotifyParams: INotifyParams;
}

const initialState: INotificationSlice = {
  notifications: [],
  defaultNotifyParams: {
    animDuration: 700,
    autoClose: 5000,
  },
};

export const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    addNotification(state, action: PayloadAction<INotification>) {
      state.notifications.push(action.payload);
    },
    removeNotificationById(state, action: PayloadAction<string>) {
      state.notifications = state.notifications.filter(
        (notification) => notification.id !== action.payload
      );
    },
    updateNotificationById(
      state,
      action: PayloadAction<{ id: string; updatedNotification: INotification }>
    ) {
      const { id, updatedNotification } = action.payload;

      const index = state.notifications.findIndex((notification) => notification.id === id);
      if (index !== -1) {
        state.notifications[index] = updatedNotification;
      }
    },
  },
});

export const { addNotification, removeNotificationById, updateNotificationById } =
  notificationSlice.actions;
