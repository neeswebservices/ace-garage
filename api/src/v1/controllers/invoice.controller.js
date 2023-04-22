import PDFDocument from "pdfkit";
import nodemailer from "nodemailer";
import { createWriteStream } from "fs";
import { join } from "path";
import Report from "./models/report.js";

const generateInvoice = async (reportId, email) => {
  try {
    const report = await Report.findById(reportId);
    if (!report) {
      throw new Error("Report not found");
    }

    const doc = new PDFDocument();
    const invoiceNumber = `INV-${reportId}`;
    const invoicePath = join(process.cwd(), "invoices", `${invoiceNumber}.pdf`);
    doc.pipe(createWriteStream(invoicePath));

    doc.fontSize(20).text(`Invoice ${invoiceNumber}`, { align: "center" });
    doc.moveDown();
    doc.fontSize(12).text(`Date: ${new Date().toLocaleDateString()}`);
    doc.moveDown();
    doc.fontSize(16).text(`Report: ${report.title}`, { underline: true });
    doc.moveDown();
    doc.fontSize(14).text(`Description: ${report.description}`);
    doc.moveDown();
    doc.fontSize(14).text(`Price: $${report.price}`);

    doc.end();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "your_email@gmail.com", // replace with your Gmail address
        pass: "your_password", // replace with your Gmail password
      },
    });

    const mailOptions = {
      from: "your_email@gmail.com", // replace with your Gmail address
      to: email,
      subject: `Invoice ${invoiceNumber}`,
      text: `Please find attached your invoice for the report ${report.title}.`,
      attachments: [{ filename: `${invoiceNumber}.pdf`, path: invoicePath }],
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        throw new Error("Error sending email");
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  } catch (error) {
    console.error(error);
    throw new Error("Error generating invoice");
  }
};

export default generateInvoice;
