import Service from "../models/service.model.js";
import { HttpResponse } from "../utils/HttpResponse.js";
import tryCatch from "../utils/tryCatch.js";
import address from "address";

export const createService = tryCatch(async (req, res, next) => {
  const { name, desc, price, branch, category } = req.body;
  console.log(req.body);

  const image = req?.file;

  const service = new Service({
    user: req.user,
    name,
    desc,
    price,
    category,
    branch,
  });

  if (image) {
    const imageURL = `http://${address.ip()}:${process.env.PORT}/${
      req.file.path
    }`;
    service.image = imageURL;
  }

  await service.save();

  return res.send(new HttpResponse("Service created", 200, service));
});
