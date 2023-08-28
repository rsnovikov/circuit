import { FC, cloneElement } from 'react';
import clsx from 'clsx';

export const HeaderMenuItem: FC<{ children: JSX.Element }> = ({ children: child }) => {
  return (
    <li className="text-sm text-gray-700 hover:bg-gray-100">
      {cloneElement(child, {
        className: clsx(child.props.className, 'block px-4 py-2'),
      })}
    </li>
  );
};
