import { Router } from "express";
import PDFDocument from "pdfkit";
import authRouter from "./auth.routes.js";
import spareRouter from "./spare.routes.js";
import adminRouter from "./admin.routes.js";
import employeeRouter from "./employee.routes.js";
import getRouter from "./get.routes.js";
import bookRouter from "./booking.routes.js";
import cartRouter from "./cart.routes.js";
import { Auth, verfiyEmployee, verifyAdmin } from "../middlewares/auth.js";

const router = Router();

router.get("/", (req, res) => {
  // console.log(req.location);
  return res.status(200).json({ msg: "Hello from Ace-garage", success: true });
});

router.use("/api/v1/cart", cartRouter);

router.use("/api/v1/auth", authRouter);
router.use("/api/v1/spare", spareRouter);
router.use("/api/v1/get", getRouter);

router.use("/api/v1/booking/", bookRouter);

router.use("/api/v1/admin", Auth, verifyAdmin, adminRouter);
router.use("/api/v1/employee", Auth, verfiyEmployee, employeeRouter);

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
    res.setHeader(
      "Content-disposition",
      'attachment; filename="' + filename + '"'
    );
    res.setHeader("Content-Type", "application/pdf");
    doc.pipe(res);

    // Add content to the PDF document
    doc.fontSize(20).text(`Report ${reportId}`, { align: "center" });
    doc.fontSize(12).text(`Generated on ${new Date().toLocaleDateString()}`, {
      align: "right",
    });
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
