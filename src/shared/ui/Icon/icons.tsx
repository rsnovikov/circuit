import { ReactElement } from 'react';
import { IconType } from './Icon';

export const icons: {
  [key in IconType]: { viewBox: string; component: () => ReactElement };
} = {
  arrowRightSLine: {
    viewBox: '0 0 24 24',
    component: () => (
      <>
        <path fill="none" d="M0 0h24v24H0z" />
        <path d="M13.172 12l-4.95-4.95 1.414-1.414L16 12l-6.364 6.364-1.414-1.414z" />
      </>
    ),
  },
  arrowLeftSLine: {
    viewBox: '0 0 24 24',
    component: () => (
      <>
        <path fill="none" d="M0 0h24v24H0z" />
        <path d="M10.828 12l4.95 4.95-1.414 1.414L8 12l6.364-6.364 1.414 1.414z" />
      </>
    ),
  },
};
