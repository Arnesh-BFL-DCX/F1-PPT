'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Slide, getSlideNavigation, attachKeyboardListeners } from '@slides/core';
import { MDSlide } from './MDSlide';
import { ChevronLeft, ChevronRight, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { exportSlidesToPDF } from '@/lib/pdf-export';

interface SlideViewerProps {
  slides: Slide[];
  initialSlide?: number;
  showControls?: boolean;
  onSlideChange?: (index: number) => void;
}

export function SlideViewer({
  slides,
  initialSlide = 0,
  showControls = true,
  onSlideChange,
}: SlideViewerProps) {
  const [currentIndex, setCurrentIndex] = useState(initialSlide);
  const [isExporting, setIsExporting] = useState(false);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);

  const navigation = getSlideNavigation(currentIndex, slides.length);

  const goToNext = () => {
    if (navigation.canGoNext) {
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);
      onSlideChange?.(newIndex);
    }
  };

  const goToPrevious = () => {
    if (navigation.canGoPrevious) {
      const newIndex = currentIndex - 1;
      setCurrentIndex(newIndex);
      onSlideChange?.(newIndex);
    }
  };

  const goToFirst = () => {
    setCurrentIndex(0);
    onSlideChange?.(0);
  };

  const goToLast = () => {
    const lastIndex = slides.length - 1;
    setCurrentIndex(lastIndex);
    onSlideChange?.(lastIndex);
  };

  const handleExportPDF = async () => {
    setIsExporting(true);
    try {
      const slideElements = slideRefs.current.filter(
        (ref): ref is HTMLDivElement => ref !== null
      );
      await exportSlidesToPDF(slideElements, {
        filename: 'presentation.pdf',
      });
    } catch (error) {
      console.error('Failed to export PDF:', error);
    } finally {
      setIsExporting(false);
    }
  };

  useEffect(() => {
    const cleanup = attachKeyboardListeners({
      onNext: goToNext,
      onPrevious: goToPrevious,
      onFirst: goToFirst,
      onLast: goToLast,
    });

    return cleanup;
  }, [currentIndex, slides.length]);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-slate-950">
      {/* Slide Container */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
          className="w-full h-full"
        >
          <div ref={(el) => (slideRefs.current[currentIndex] = el)}>
            <MDSlide slide={slides[currentIndex]} />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Hidden slides for PDF export */}
      <div className="hidden">
        {slides.map((slide, index) => (
          index !== currentIndex && (
            <div key={slide.id} ref={(el) => (slideRefs.current[index] = el)}>
              <MDSlide slide={slide} />
            </div>
          )
        ))}
      </div>

      {/* Controls */}
      {showControls && (
        <>
          {/* Navigation Buttons */}
          <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-slate-900/80 backdrop-blur-sm px-6 py-3 rounded-full">
            <Button
              variant="ghost"
              size="icon"
              onClick={goToPrevious}
              disabled={!navigation.canGoPrevious}
              className="text-white hover:bg-slate-800"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>

            <span className="text-white font-medium min-w-20 text-center">
              {currentIndex + 1} / {slides.length}
            </span>

            <Button
              variant="ghost"
              size="icon"
              onClick={goToNext}
              disabled={!navigation.canGoNext}
              className="text-white hover:bg-slate-800"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>

          {/* Export Button */}
          <div className="fixed top-8 right-8">
            <Button
              onClick={handleExportPDF}
              disabled={isExporting}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Download className="h-4 w-4 mr-2" />
              {isExporting ? 'Exporting...' : 'Export PDF'}
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
