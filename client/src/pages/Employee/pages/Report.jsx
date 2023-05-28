import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const Report = () => {
  const reportRef = useRef(null);
  const spareParts = [
    { sn: 1, name: 'Bearings', quantity: 5, username: "Sudip Kumar Mahato", address: "Tinkune, Kathmandu" },

  ];

  const handleGenerateReport = () => {
    const reportElement = reportRef.current;

    // Create a canvas from the report element
    html2canvas(reportElement).then((canvas) => {
      const imageData = canvas.toDataURL('image/png');

      // Calculate the aspect ratio of the report element
      const aspectRatio = canvas.width / canvas.height;

      // Create a PDF document
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdfWidth / aspectRatio;

      // Add the image of the report to the PDF
      pdf.addImage(imageData, 'PNG', 0, 0, pdfWidth, pdfHeight);

      // Save the PDF
      pdf.save('report.pdf');
    });
  };

  const getCurrentDate = () => {
    const date = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <div>

      <div ref={reportRef}>
        <h1 className="p-3 font-2xl text-left">Customer Report</h1>
        <div className="p-3">
          <p>
            <b>Full Name: </b> {spareParts[0].username}
          </p>
          <p>
            <b>Address:</b> {spareParts[0].address}
          </p>
          <p>
            <b>Date:</b> {getCurrentDate()}
          </p>
        </div>
        <table className="min-w-full mt-8 bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="p-3 font-medium text-left bg-blue-600 text-white border border-gray-300">
                S.N.
              </th>
              <th className="p-3 font-medium text-left bg-blue-600 text-white border border-gray-300">
                Spare Name
              </th>
              <th className="p-3 font-medium text-left bg-blue-600 text-white border border-gray-300">
                Quantity
              </th>
            </tr>
          </thead>
          <tbody>
            {spareParts.map((part) => (
              <tr key={part.sn}>
                <td className="p-3 text-sm font-medium text-gray-800 border border-gray-300">
                  {part.sn}
                </td>
                <td className="p-3 text-sm font-medium text-gray-800 border border-gray-300">
                  {part.name}
                </td>
                <td className="p-3 text-sm font-medium text-gray-800 border border-gray-300">
                  {part.quantity}
                </td>
              </tr>
            ))}
          </tbody>
        </table>


      </div>

      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={handleGenerateReport}
      >
        Generate Report
      </button>
    </div>
  );
};

export default Report;
