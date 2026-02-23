import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export interface PDFExportOptions {
  filename?: string;
  quality?: number;
  format?: 'a4' | 'letter' | 'legal';
  orientation?: 'portrait' | 'landscape';
}

export async function exportSlidesToPDF(
  slideElements: HTMLElement[],
  options: PDFExportOptions = {}
): Promise<void> {
  const {
    filename = 'presentation.pdf',
    quality = 0.95,
    orientation = 'landscape',
    format = 'a4',
  } = options;

  // Create PDF with 16:9 aspect ratio
  const pdf = new jsPDF({
    orientation,
    unit: 'px',
    format: [1920, 1080], // 16:9 aspect ratio
  });

  let isFirstSlide = true;

  for (const slideElement of slideElements) {
    try {
      // Capture slide as canvas
      const canvas = await html2canvas(slideElement, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: null,
      });

      // Convert canvas to image
      const imgData = canvas.toDataURL('image/jpeg', quality);

      // Add page (except for first slide)
      if (!isFirstSlide) {
        pdf.addPage([1920, 1080], orientation);
      }
      isFirstSlide = false;

      // Add image to PDF
      pdf.addImage(imgData, 'JPEG', 0, 0, 1920, 1080);
    } catch (error) {
      console.error('Error capturing slide:', error);
    }
  }

  // Save PDF
  pdf.save(filename);
}

export async function exportCurrentSlideToPDF(
  slideElement: HTMLElement,
  options: PDFExportOptions = {}
): Promise<void> {
  return exportSlidesToPDF([slideElement], options);
}
