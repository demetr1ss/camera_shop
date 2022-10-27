import { RefObject, useEffect } from 'react';

type Event = MouseEvent | TouchEvent;

export default function useOutsideClick <T extends HTMLElement = HTMLElement>(
  firstInputRef: RefObject<T>,
  secondInputRef: RefObject<T>,
  handler: (event: Event) => void,
){
  useEffect(() => {
    const handleFirstInputRefOutsideClick = (event: Event) => {
      const el = firstInputRef?.current;
      if (!el || el.contains((event?.target as Node) || null) || event?.target === secondInputRef.current) {
        return;
      }

      handler(event);
    };

    const handleSecondInputRefOutsideClick = (event: Event) => {
      const el = secondInputRef?.current;

      if (!el || el.contains((event?.target as Node) || null) || event?.target === firstInputRef.current) {
        return;
      }

      handler(event);
    };

    document.addEventListener('mousedown', handleFirstInputRefOutsideClick);
    document.addEventListener('touchstart', handleFirstInputRefOutsideClick);

    document.addEventListener('mousedown', handleSecondInputRefOutsideClick);
    document.addEventListener('touchstart', handleSecondInputRefOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleFirstInputRefOutsideClick);
      document.removeEventListener('touchstart', handleFirstInputRefOutsideClick);

      document.removeEventListener('mousedown', handleSecondInputRefOutsideClick);
      document.removeEventListener('touchstart', handleSecondInputRefOutsideClick);
    };
  }, [handler, secondInputRef, firstInputRef]);
}
