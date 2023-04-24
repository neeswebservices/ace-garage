import Branch from "../models/branch.model.js";
import Category from "../models/category.model.js";
import Eservice from "../models/eservices.model.js";
import FAQ from "../models/faq.model.js";
import User from "../models/user.model.js";
import APPError from "../utils/Error.js";
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
  return res.send(
    new HttpResponse("Emergency Breakdown Created", 200, eservice)
  );
});

export const createEmployee = tryCatch(async (req, res, next) => {
  const user = req.query.user || req.body.user;

  if (!user) throw new APPError("User Invalid", 400);

  await User.findByIdAndUpdate(
    user,
    { role: 1 },
    { new: true, select: "role" }
  );
  return res.send(new HttpResponse("Employee Created", 200));
});

export const createUser = tryCatch(async (req, res, next) => {
  const user = req.query.user || req.body.user;

  if (!user) throw new APPError("User Invalid", 400);

  await User.findByIdAndUpdate(
    user,
    { role: 0 },
    { new: true, select: "role" }
  );
  return res.send(new HttpResponse("Employee moved to user!", 200));
});

export const createFAQ = tryCatch(async (req, res, next) => {
  const { title, desc } = req.body;

  const faq = await FAQ.create({ title, desc });

  return res.send(new HttpResponse("FAQ Created", 200, faq));
});

export const getUser = tryCatch(async (req, res, next) => {
  return res.send(new HttpResponse("Users", 200, await User.find({ role: 0 })));
});

export const getEmployee = tryCatch(async (req, res, next) => {
  return res.send(
    new HttpResponse("Employees", 200, await User.find({ role: 1 }))
  );
});

export const getBranches = tryCatch(async (req, res, next) => {
  return res.send(new HttpResponse("Employees", 200, await Branch.find()));
});
