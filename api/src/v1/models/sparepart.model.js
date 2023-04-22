import mongoose from "mongoose";

const schema = new mongoose.Schema({
  name: { type: String, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  price: Number,
  desc: String,
  image: String,
});

const Spare = mongoose.model("Spare", schema);
export default Spare;
