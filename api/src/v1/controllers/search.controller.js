import Service from "../models/service.js";
import mongoose from "mongoose";

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
          $or: [{ title: searchRegExp }, { "category.name": searchRegExp }, { "location.name": searchRegExp }],
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
