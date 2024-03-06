import { SwipeSelection } from '@/features/practice-session/useCardSwipeResult';
import { MutableRefObject, useCallback, useEffect, useRef, useState } from 'react';

type AnimateOutStatus = 'PENDING' | 'STARTED' | 'FINISHED';

export default function useCardAnimation(
  ref: MutableRefObject<HTMLDivElement | null>,
  isAtFront: boolean,
  swipeSelection: SwipeSelection,
) {
  const [isAnimatingBack, setIsAnimatingBack] = useState(false);
  const [animateOutStatus, setAnimateOutStatus] = useState<AnimateOutStatus>('PENDING');
  const cardXcoordinateRef = useRef<number | null>(null);
  const movementFactorRef = useRef(0);

  const updateCardRotationAndPosition = useCallback(() => {
    if (!ref.current) return;
    ref.current.style.transformOrigin = movementFactorRef.current > 0 ? 'right bottom' : 'left bottom';
    ref.current.style.transform = `rotate(clamp(-19deg, ${movementFactorRef.current * 16}deg, 18deg)) translateX(${movementFactorRef.current * 25}rem)`;
  }, [ref]);

  //run if we are not animating back or out
  useEffect(() => {
    if (!ref.current || !isAtFront || isAnimatingBack || animateOutStatus !== 'PENDING') return;

    const card = ref.current;

    const resetMovementFactor = () => {
      cardXcoordinateRef.current = null;
      movementFactorRef.current = 0;
      setIsAnimatingBack(true);
    };

    const updateMovementFactor = (moveClientX: number) => {
      movementFactorRef.current =
        (moveClientX - (cardXcoordinateRef.current ?? moveClientX)) / document.documentElement.clientWidth;
    };

    const touchStartEventHandler = (event: TouchEvent) => {
      const touch = event.changedTouches.item(0);
      if (!touch) return;
      cardXcoordinateRef.current = touch.clientX;
      card.style.transition = 'none';
    };

    const touchCancelEventHandler = () => {
      resetMovementFactor();
    };

    const touchEndEventHandler = () => {
      resetMovementFactor();
    };

    const touchMoveEventHandler = (event: TouchEvent) => {
      const touch = event.changedTouches.item(0);
      if (!touch) return;
      updateMovementFactor(touch.clientX);
      requestAnimationFrame(updateCardRotationAndPosition);
    };

    card.addEventListener('touchstart', touchStartEventHandler, { passive: true });
    card.addEventListener('touchcancel', touchCancelEventHandler);
    card.addEventListener('touchend', touchEndEventHandler);
    card.addEventListener('touchmove', touchMoveEventHandler, { passive: true });

    return () => {
      card.removeEventListener('touchstart', touchStartEventHandler);
      card.removeEventListener('touchcancel', touchCancelEventHandler);
      card.removeEventListener('touchend', touchEndEventHandler);
      card.removeEventListener('touchmove', touchMoveEventHandler);
    };
  }, [ref, isAtFront, isAnimatingBack, animateOutStatus, updateCardRotationAndPosition]);

  //run if we are animating back only
  useEffect(() => {
    if (!ref.current || !isAtFront || animateOutStatus !== 'PENDING' || !isAnimatingBack) return;

    console.log('animating back');

    const card = ref.current;
    const animationDurationInMiliseconds = 400;
    const id = requestAnimationFrame(() => {
      card.style.transition = `transform ${animationDurationInMiliseconds / 1000}s ease`;
      updateCardRotationAndPosition();
      setTimeout(() => setIsAnimatingBack(false), animationDurationInMiliseconds);
    });

    return () => cancelAnimationFrame(id);
  }, [ref, isAtFront, isAnimatingBack, animateOutStatus, updateCardRotationAndPosition]);

  //run if we are starting to animate out
  useEffect(() => {
    if (!ref.current || !isAtFront || animateOutStatus !== 'STARTED' || isAnimatingBack) return;

    console.log('animating out..');
    const card = ref.current;
    const animationDurationInMiliseconds = 400;
    movementFactorRef.current *= 1.5;
    const id = requestAnimationFrame(() => {
      const transitionText = `transform ${animationDurationInMiliseconds / 1000}s ease`;
      console.log(transitionText);
      card.style.transition = transitionText;
      updateCardRotationAndPosition();
      setTimeout(() => setAnimateOutStatus('FINISHED'), animationDurationInMiliseconds);
    });

    return () => cancelAnimationFrame(id);
  }, [ref, isAtFront, isAnimatingBack, animateOutStatus, updateCardRotationAndPosition]);

  useEffect(() => {
    if (swipeSelection !== 'PENDING') {
      setAnimateOutStatus('STARTED');
    }
  }, [swipeSelection]);

  return animateOutStatus === 'FINISHED';
}
