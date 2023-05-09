import { HttpStatusCode } from "../../../node_modules/axios/index.js";
import Spare from "../models/sparepart.model.js";
import APPError from "../utils/Error.js";
import { HttpResponse } from "../utils/HttpResponse.js";
import tryCatch from "../utils/tryCatch.js";
import http from "node:http";
import address from "address";

export const createSpare = tryCatch(async (req, res, next) => {
  const { name, price, desc } = req.body;

  if (!name || !price || !desc) {
    throw new APPError("Please submit all fields", 400);
  }

  const image = req?.file;

  const spare = new Spare({ name, price, desc, createdBy: req.user });
  if (image) {
    const imageURL = `http://${address.ip()}:${process.env.PORT}/${
      req.file.path
    }`;
    console.log(imageURL);
    spare.image = imageURL;
  }

  await spare.save();
  // const populatedSpare = await Spare.findById(spare._id).populate("createdBy");

  return res.send(new HttpResponse("Spare created", HttpStatusCode.Ok, spare));
});
