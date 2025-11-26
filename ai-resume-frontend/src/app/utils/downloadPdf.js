import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export const handleDownloadPDF = async (elementRef, filename = "resume.pdf") => {
  const element = elementRef.current;
  if (!element) return;

  // 1) Render canvas at high DPI (2 or 3 is enough)
  const canvas = await html2canvas(element, {
    scale: 3,
    useCORS: true,
  });

  const imgData = canvas.toDataURL("image/png");

  // 2) Create REAL A4 page in mm (not px)
  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  // 3) A4 dimensions in mm
  const pageWidth = pdf.internal.pageSize.getWidth();  // ~210mm
  const pageHeight = pdf.internal.pageSize.getHeight(); // ~297mm

  // Add small margins (10mm)
  const margin = 1;
  const usableWidth = pageWidth - margin * 2;

  // 4) Calculate height respecting aspect ratio
  const imgProps = pdf.getImageProperties(imgData);
  const ratio = imgProps.height / imgProps.width;
  const newHeight = usableWidth * ratio;

  // 5) Add image centered with white margins around it
  pdf.addImage(
    imgData,
    "PNG",
    margin,
    margin,
    usableWidth,
    newHeight,
    undefined,
    "FAST"
  );

  pdf.save(filename);
};
