export type NotificationType = 'default' | 'error' | 'warning' | 'success' | 'info';

export interface INotification extends INotifyParams {
  id: string;
  message: string;
  isDestroying: boolean;
  type: NotificationType;
}

export interface INotifyParams {
  animDuration: number;
  autoClose?: number;
}
