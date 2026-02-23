import { KeyboardNavigationHandlers } from './types';

export function useKeyboardNavigation(handlers: KeyboardNavigationHandlers) {
  const handleKeyDown = (event: KeyboardEvent) => {
    switch (event.key) {
      case 'ArrowRight':
      case ' ': // Space
      case 'PageDown':
        event.preventDefault();
        handlers.onNext();
        break;

      case 'ArrowLeft':
      case 'PageUp':
        event.preventDefault();
        handlers.onPrevious();
        break;

      case 'Home':
        event.preventDefault();
        handlers.onFirst();
        break;

      case 'End':
        event.preventDefault();
        handlers.onLast();
        break;

      case 'Escape':
        event.preventDefault();
        handlers.onEscape?.();
        break;
    }
  };

  return { handleKeyDown };
}

export function attachKeyboardListeners(handlers: KeyboardNavigationHandlers): () => void {
  const { handleKeyDown } = useKeyboardNavigation(handlers);

  window.addEventListener('keydown', handleKeyDown);

  // Return cleanup function
  return () => {
    window.removeEventListener('keydown', handleKeyDown);
  };
}
