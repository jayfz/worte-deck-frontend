import { SwipeSelection } from '@/features/practice-session/useCardSwipeResult';
import { MutableRefObject, useCallback, useEffect, useRef, useState } from 'react';
import { useTheme } from 'styled-components';

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
  const theme = useTheme();

  const updateCardRotationAndPosition = useCallback(() => {
    if (!ref.current) return;
    ref.current.style.transformOrigin = movementFactorRef.current > 0 ? 'right bottom' : 'left bottom';
    ref.current.style.transform = `rotate(clamp(-18deg, ${movementFactorRef.current * 16}deg, 18deg)) translateX(${movementFactorRef.current * 25}rem)`;
    const backgroundCSS = `linear-gradient(${theme.sectionBg},${theme.sectionBg}) padding-box, linear-gradient(${movementFactorRef.current > 0 ? '45deg' : '-45deg'}, ${theme.borderColor} 50%, ${movementFactorRef.current > 0 ? theme.rightSwipeColor : theme.leftSwipeColor}) border-box`;
    ref.current.style.background = movementFactorRef.current !== 0 ? backgroundCSS : `rever-layer`;
    ref.current.style.transition = 'none';
  }, [ref, theme]);

  const doAnimateBack = useCallback(() => {
    if (!ref.current) return;
    const animationDurationInMiliseconds = 400;
    const animationDurationInSeconds = animationDurationInMiliseconds / 1000;
    const card = ref.current;
    card.style.transformOrigin = 'unset';
    card.style.transform = 'unset';
    card.style.background = 'revert-layer';
    card.style.transition = `transform ${animationDurationInSeconds}s ease, background ${animationDurationInSeconds}s ease`;
    return setTimeout(() => setIsAnimatingBack(false), animationDurationInMiliseconds);
  }, [ref]);

  const doAnimateOut = useCallback(() => {
    if (!ref.current) return;
    const animationDurationInMiliseconds = 400;
    const animationDurationInSeconds = animationDurationInMiliseconds / 1000;
    const card = ref.current;
    movementFactorRef.current *= 1.5;
    card.style.transform = `rotate(clamp(-19deg, ${movementFactorRef.current * 16}deg, 18deg)) translateX(${movementFactorRef.current * 25}rem)`;
    card.style.background = 'revert-layer';
    card.style.transition = `transform ${animationDurationInSeconds}s ease, background ${animationDurationInSeconds}s ease`;
    return setTimeout(() => setAnimateOutStatus('FINISHED'), animationDurationInMiliseconds);
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
  }, [ref, isAtFront, isAnimatingBack, animateOutStatus, updateCardRotationAndPosition, doAnimateBack]);

  //run if we are animating back only
  useEffect(() => {
    if (!ref.current || !isAtFront || animateOutStatus !== 'PENDING' || !isAnimatingBack) return;
    const id = requestAnimationFrame(doAnimateBack);
    return () => cancelAnimationFrame(id);
  }, [ref, isAtFront, animateOutStatus, isAnimatingBack, doAnimateBack]);

  //run if we are starting to animate out
  useEffect(() => {
    if (!ref.current || !isAtFront || animateOutStatus !== 'STARTED' || isAnimatingBack) return;
    const id = requestAnimationFrame(doAnimateOut);
    return () => cancelAnimationFrame(id);
  }, [ref, isAtFront, animateOutStatus, isAnimatingBack, doAnimateOut]);

  useEffect(() => {
    if (swipeSelection !== 'PENDING') {
      setAnimateOutStatus('STARTED');
    }
  }, [swipeSelection]);

  useEffect(() => {
    updateCardRotationAndPosition();
  }, [theme, updateCardRotationAndPosition]);

  return animateOutStatus === 'FINISHED';
}
