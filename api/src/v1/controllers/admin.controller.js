import Branch from "../models/branch.model.js";
import Category from "../models/category.model.js";
import Eservice from "../models/eservices.model.js";
import { HttpResponse } from "../utils/HttpResponse.js";
import tryCatch from "../utils/tryCatch.js";

export const createBranch = tryCatch(async (req, res, next) => {
  const { name, address, city, state } = req.body;
  const branch = await Branch.create({ name, address, city, state });
  return res.send(new HttpResponse("Branch Created", 200, branch));
});

export const createCategory = tryCatch(async (req, res, next) => {
  const { name } = req.body;

  const category = await Category.create({ name });
  return res.send(new HttpResponse("Category Created", 200, category));
});

export const createBreakdown = tryCatch(async (req, res, next) => {
  const { name, desc, price } = req.body;
  if (req.file?.image) {
    //
  }

  const eservice = await Eservice.create({ name, desc, price });
  return res.send(new HttpResponse("Emergency Breakdown Created", 200, eservice));
});
