import Service from "../models/service.model.js";
import mongoose from "mongoose";
import tryCatch from "../utils/tryCatch.js";
import { HttpResponse } from "../utils/HttpResponse.js";
import Spare from "../models/sparepart.model.js";

export const searchServices = async (req, res) => {
  try {
    const searchValue = req.query.search;
    const searchRegExp = new RegExp(searchValue, "i");

    const services = await Service.aggregate([
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "category",
        },
      },
      {
        $lookup: {
          from: "locations",
          localField: "location",
          foreignField: "_id",
          as: "location",
        },
      },
      {
        $unwind: "$category",
      },
      {
        $unwind: "$location",
      },
      {
        $match: {
          $or: [
            { title: searchRegExp },
            { "category.name": searchRegExp },
            { "location.name": searchRegExp },
          ],
        },
      },
      {
        $project: {
          title: 1,
          desc: 1,
          image: 1,
          price: 1,
          status: 1,
          views: 1,
          category: "$category.name",
          location: "$location.name",
        },
      },
    ]);

    res.status(200).json(services);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

// import Service from "../models/service.js";

// const searchServices = async (req, res) => {
//   try {
//     const { name, location } = req.query;

//     const services = await Service.find().regex("name", new RegExp(name, "gi")).regex("location", new RegExp(location, "gi"));

//     res.status(200).json({ services });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Error searching services" });
//   }
// };

// export default searchServices;

export const searchDynamic = tryCatch(async (req, res, next) => {
  const { id } = req.body;
  console.log(id);

  const services = await Service.find({ branch: id })
    .populate("category")
    .populate("user");
  return res.send(new HttpResponse("Services", 200, services));
});

export const singleService = tryCatch(async (req, res, next) => {
  const { id } = req.body;
  const service = await Service.findOne({ _id: id })
    .populate("branch")
    .populate("category");
  return res.send(new HttpResponse("Service details", 200, service));
});

export const singleSpare = tryCatch(async (req, res, next) => {
  const { id } = req.body;
  return res.send(
    new HttpResponse("Spare details", 200, await Spare.findById(id))
  );
});
