import { useState } from 'react';
import { updateTranslateCoords } from '@/entities/breadboard';
import { useAppDispatch } from '@/shared/model';

export const useMoveBreadboard = () => {
  const dispatch = useAppDispatch();
  const [isBreadboardMove, setIsBreadboardMove] = useState<boolean>(false);

  const startMoveBreadboard = () => {
    setIsBreadboardMove(true);
  };

  const moveBreadboard = ({ movementX, movementY }: { movementX: number; movementY: number }) => {
    if (!isBreadboardMove) return;
    dispatch(updateTranslateCoords({ deltaX: movementX, deltaY: movementY }));
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
