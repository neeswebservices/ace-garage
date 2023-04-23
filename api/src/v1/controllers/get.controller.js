import { HttpResponse } from "../utils/HttpResponse.js";
import Branch from "../models/branch.model.js";
import Category from "../models/category.model.js";
import tryCatch from "../utils/tryCatch.js";
import Eservice from "../models/eservices.model.js";
import Spare from "../models/sparepart.model.js";
import FAQ from "../models/faq.model.js";

export const getCategories = tryCatch(async (req, res, next) => {
  return res.send(new HttpResponse("Categories", 200, await Category.find()));
});

export const getBranches = tryCatch(async (req, res, next) => {
  return res.send(new HttpResponse("Branches", 200, await Branch.find()));
});

export const getBreakdown = tryCatch(async (req, res, next) => {
  return res.send(new HttpResponse("Branches", 200, await Eservice.find()));
});

export const getSpares = tryCatch(async (req, res, next) => {
  return res.send(new HttpResponse("Spares", 200, await Spare.find()));
});

export const getFaqs = tryCatch(async (req, res, next) => {
  return res.send(new HttpResponse("FAQs", 200, await FAQ.find()));
});
