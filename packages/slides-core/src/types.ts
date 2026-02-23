export interface Slide {
  id: string;
  content: string;
  background?: string;
  notes?: string;
  metadata?: Record<string, unknown>;
}

export interface SlideDeck {
  id: string;
  title: string;
  slides: Slide[];
  metadata?: {
    author?: string;
    date?: string;
    theme?: string;
    [key: string]: unknown;
  };
}

export interface SlideNavigation {
  currentIndex: number;
  totalSlides: number;
  canGoNext: boolean;
  canGoPrevious: boolean;
}

export interface KeyboardNavigationHandlers {
  onNext: () => void;
  onPrevious: () => void;
  onFirst: () => void;
  onLast: () => void;
  onEscape?: () => void;
}
