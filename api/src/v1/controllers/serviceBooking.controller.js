import { HttpStatusCode } from "../../../node_modules/axios/index.js";
import ServiceBooking from "../models/serviceBooking.model.js";
import APPError from "../utils/Error.js";
import { HttpResponse } from "../utils/HttpResponse.js";
import tryCatch from "../utils/tryCatch.js";

export const book = tryCatch(async (req, res, next) => {
  const { service } = req.query;
  const { address, date } = req.body;

  if (!service || !address || !date) {
    throw new APPError("Please submit all fields!", HttpStatusCode.BadRequest);
  }

  const booking = new ServiceBooking({ service, address, date, user: req.user });

  await booking.save();

  return res.send(new HttpResponse("Service booked", 200, booking));
});
