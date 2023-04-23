import Service from "../models/service.model.js";
import { HttpResponse } from "../utils/HttpResponse.js";
import tryCatch from "../utils/tryCatch.js";

export const createService = tryCatch(async (req, res, next) => {
  const { category } = req.params;
  const { name, desc, price, branch } = req.body;

  const service = new Service({ user: req.user, category, name, desc, price, branch });
  await service.save();

  return res.send(new HttpResponse("Service created", 200, service));
});
