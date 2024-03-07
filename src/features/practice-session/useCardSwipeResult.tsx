import { MutableRefObject, useEffect, useState } from 'react';

export type SwipeSelection = 'PENDING' | 'LEFT' | 'RIGHT';

const threasholdArray = Array(20)
  .fill(0)
  .map((_, index) => index * 0.05);

export default function useCardSwipeResult(refTarget: MutableRefObject<HTMLDivElement | null>, isAtFront: boolean) {
  const [selection, setSelection] = useState<SwipeSelection>('PENDING');

  useEffect(() => {
    if (!refTarget.current || !isAtFront || selection !== 'PENDING') return;

    const options: IntersectionObserverInit = {
      root: null,
      threshold: threasholdArray,
    };

    const observerCallback: IntersectionObserverCallback = (entries) => {
      const card = entries[0];

      if (card.isIntersecting && card.intersectionRatio < 0.45) {
        if (card.intersectionRect.left === card.rootBounds?.left) {
          setSelection('LEFT');
        }

        if (card.intersectionRect.right === card.rootBounds?.right) {
          setSelection('RIGHT');
        }
      }
    };

    const observer = new IntersectionObserver(observerCallback, options);
    observer.observe(refTarget.current);

    return () => {
      observer.disconnect();
    };
  }, [isAtFront, refTarget, selection]);

  return selection;
}
