import mongoose from "mongoose";

const schema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  category: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Category" },
  date: { type: Date, required: true },
  details: { type: String, required: true },
  address: { type: String, required: true },
  status: { type: Boolean, default: false },
});

const Appointment = mongoose.model("Appointment", schema);

export default Appointment;
