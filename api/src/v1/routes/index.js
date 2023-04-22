import { Router } from "express";
import PDFDocument from "pdfkit";
import express from "express";
import authRouter from "./auth.routes.js";
import spareRouter from "./spare.routes.js";
import usersRouter from "./users.routes.js";

const router = Router();

router.get("/", (req, res) => {
  // console.log(req.location);
  return res.status(200).json({ msg: "Hello from Ace-garage", success: true });
});

router.use("/api/v1/user", usersRouter);
router.use("/api/v1/auth", authRouter);
router.use("/api/v1/spare", spareRouter);

// generates the report
router.get("/reports/:id", async (req, res) => {
  try {
    const reportId = req.params.id;
    const report = await getReportById(reportId); // Assuming a function to retrieve report data from the database
    if (!report) {
      return res.status(404).send("Report not found");
    }

    const doc = new PDFDocument();
    const filename = `report_${reportId}.pdf`;
    res.setHeader("Content-disposition", 'attachment; filename="' + filename + '"');
    res.setHeader("Content-Type", "application/pdf");
    doc.pipe(res);

    // Add content to the PDF document
    doc.fontSize(20).text(`Report ${reportId}`, { align: "center" });
    doc.fontSize(12).text(`Generated on ${new Date().toLocaleDateString()}`, { align: "right" });
    doc.moveDown();
    doc.text(report.description);
    doc.moveDown();
    doc.text(`Total views: ${report.viewsCount}`);

    doc.end();
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error | Report generation!");
  }
});

export default router;
