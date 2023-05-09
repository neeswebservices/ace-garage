import mongoose from "mongoose";

const schema = new mongoose.Schema({
  name: { type: String, required: true },
  desc: String,
  price: Number,
  image: String,
});

const Eservice = mongoose.model("Eservice", schema);

export default Eservice;
