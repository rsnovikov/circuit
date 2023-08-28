import { useState } from 'react';
import { useAppDispatch } from '@/shared/model';
import { updateTranslateCoordsAction } from './updateTranslateCoordsAction';

export const useMoveBreadboard = () => {
  const dispatch = useAppDispatch();
  const [isBreadboardMove, setIsBreadboardMove] = useState<boolean>(false);

  const startMoveBreadboard = () => {
    setIsBreadboardMove(true);
  };

  const moveBreadboard = ({ movementX, movementY }: { movementX: number; movementY: number }) => {
    if (!isBreadboardMove) return;
    dispatch(updateTranslateCoordsAction({ deltaX: movementX, deltaY: movementY }));
  };

  const endMoveBreadboard = () => {
    setIsBreadboardMove(false);
  };

  return {
    startMoveBreadboard,
    moveBreadboard,
    endMoveBreadboard,
  };
};
