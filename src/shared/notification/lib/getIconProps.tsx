import { IconType } from '@/shared/ui/Icon/icons';
import { NotificationType } from '../model/types';

export const getIconProps = (
  notificationType: NotificationType
): { type: IconType; fill?: string } => {
  switch (notificationType) {
    case 'error': {
      return { type: 'BxsErrorCircle', fill: '#e74c3c' };
    }
    case 'warning': {
      return { type: 'BxsError', fill: '#f1c40f' };
    }
    case 'info': {
      return { type: 'CircleInfo', fill: '#3498db' };
    }
    case 'success': {
      return { type: 'CheckCircleFill', fill: '#07bc0c' };
    }
    default: {
      return { type: 'CircleInfo', fill: '#3498db' };
    }
  }
};
