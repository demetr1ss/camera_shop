import {useCallback, useEffect} from 'react';

export default function useKeydown(key: string, action: () => void) {
  const handleModalClose = useCallback((evt: KeyboardEvent) => {
    if (evt.key === key) {
      action();
    }
  }, [action, key]);

  useEffect(() => {
    document.addEventListener('keydown', handleModalClose);

    return () => document.removeEventListener('keydown', handleModalClose);
  }, [handleModalClose]);
}
