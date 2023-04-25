import Appointment from "../models/appointment.model.js";
import Category from "../models/category.model.js";
import APPError from "../utils/Error.js";
import { HttpResponse } from "../utils/HttpResponse.js";
import tryCatch from "../utils/tryCatch.js";

export const createAppointment = tryCatch(async (req, res, next) => {
  const { name, category, date, details, address, phone } = req.body;

  if (!name || !category || !date || !details || !phone) {
    throw new APPError("Please submit all the fields", 400);
  }

  const appointment = new Appointment({
    name,
    category,
    date,
    details,
    address,
    phone,
    user: req.user,
  });

  await appointment.save();

  return res.send(new HttpResponse("Appointment Booked", 200, appointment));
});

export const getAppointment = tryCatch(async (req, res, next) => {
  const appointments = await Appointment.find({})
    .populate("user")
    .populate("category");

  return res.send(new HttpResponse("Appointments", 200, appointments));
});

export const acceptAppointment = tryCatch(async (req, res, next) => {
  const { id } = req.body;
  console.log(id);

  const app = await Appointment.findByIdAndUpdate(
    { _id: id },
    { $set: { status: true } },
    { new: true }
  );
  console.log(app);

  if (app) {
    return res.send(new HttpResponse("Appointments", 200));
  } else {
    throw new APPError("No Appointment", 404);
  }
});

export const deleteAppointment = tryCatch(async (req, res, next) => {
  const { id } = req.body;

  const app = await Appointment.findByIdAndDelete(id);

  if (app) {
    return res.send(new HttpResponse("Appointment deleted", 200));
  } else {
    throw new APPError("No Appointment", 404);
  }
});

export const deleteCategory = tryCatch(async (req, res, next) => {
  const { id } = req.body;

  const app = await Category.findByIdAndDelete(id);

  if (app) {
    return res.send(new HttpResponse("Category deleted", 200));
  } else {
    throw new APPError("No Appointment", 404);
  }
});
