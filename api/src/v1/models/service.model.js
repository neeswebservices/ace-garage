import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "User Required"],
    ref: "User",
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "Category Required"],
    ref: "Category",
  },
  subcategory: {
    type: mongoose.Schema.Types.ObjectId,
  },
  name: {
    type: String,
  },
  desc: String,
  image: [String],
  views: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    required: true,
  },
  featured: { type: Boolean, default: false },
  //   status: {
  //     type: String,
  //     enum: ["pending", "inprogess", "completed", "rejected", "archived"],
  //     default: "pending",
  //   },
  status: {
    type: String,
    enum: ["pending", "confirmed", "completed", "cancelled"],
    default: "pending",
  },
  branch: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Branch",
  },
});

const Service = mongoose.model("Service", serviceSchema);

export default Service;
