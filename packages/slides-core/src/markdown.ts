import { Slide, SlideDeck } from './types';

const SLIDE_SEPARATOR = /^---$/gm;
const FRONTMATTER_REGEX = /^---\n([\s\S]*?)\n---/;

interface FrontmatterData {
  [key: string]: string;
}

function parseFrontmatter(content: string): { data: FrontmatterData; content: string } {
  const match = content.match(FRONTMATTER_REGEX);

  if (!match) {
    return { data: {}, content };
  }

  const frontmatterText = match[1];
  const remainingContent = content.slice(match[0].length);

  const data: FrontmatterData = {};
  frontmatterText.split('\n').forEach((line) => {
    const colonIndex = line.indexOf(':');
    if (colonIndex > -1) {
      const key = line.slice(0, colonIndex).trim();
      const value = line.slice(colonIndex + 1).trim();
      data[key] = value;
    }
  });

  return { data, content: remainingContent };
}

export function parseMarkdownSlides(markdown: string, deckId: string): SlideDeck {
  // Parse frontmatter from the beginning
  const { data: deckMetadata, content: contentWithoutFrontmatter } = parseFrontmatter(markdown);

  // Split remaining content into slides
  const slideContents = contentWithoutFrontmatter
    .split(SLIDE_SEPARATOR)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

  const slides: Slide[] = slideContents.map((slideContent, index) => {
    const { data: slideMetadata, content: slideText } = parseFrontmatter(slideContent);

    return {
      id: `${deckId}-slide-${index}`,
      content: slideText,
      background: slideMetadata.background,
      notes: slideMetadata.notes,
      metadata: slideMetadata,
    };
  });

  return {
    id: deckId,
    title: deckMetadata.title || 'Untitled Presentation',
    slides,
    metadata: {
      author: deckMetadata.author,
      date: deckMetadata.date,
      theme: deckMetadata.theme,
      ...deckMetadata,
    },
  };
}

export function getSlideNavigation(currentIndex: number, totalSlides: number) {
  return {
    currentIndex,
    totalSlides,
    canGoNext: currentIndex < totalSlides - 1,
    canGoPrevious: currentIndex > 0,
  };
}
