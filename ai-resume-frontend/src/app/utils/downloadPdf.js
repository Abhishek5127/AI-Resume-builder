import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export const handleDownloadPDF = async (elementRef, filename = "resume.pdf") => {
  const element = elementRef.current;
  if (!element) return;

  const canvas = await html2canvas(element);
  const imageData = canvas.toDataURL("image/png");

  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "px",
    format: "a4",
  });

  const imgProps = pdf.getImageProperties(imageData);
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

  pdf.addImage(imageData, "PNG", 0, 0, pdfWidth, pdfHeight);
  pdf.save(filename);
};
