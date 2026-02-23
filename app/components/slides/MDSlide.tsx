'use client';

import React from 'react';
import { Slide } from '@slides/core';
import { cn } from '@/lib/utils';

interface MDSlideProps {
  slide: Slide;
  className?: string;
}

export function MDSlide({ slide, className }: MDSlideProps) {
  const style = slide.background
    ? {
        background: slide.background,
      }
    : undefined;

  return (
    <div
      className={cn('slide', className)}
      style={style}
      data-slide-id={slide.id}
    >
      <div
        className="slide-content max-w-6xl w-full"
        dangerouslySetInnerHTML={{ __html: slide.content }}
      />
    </div>
  );
}
