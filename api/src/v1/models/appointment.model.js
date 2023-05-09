import mongoose from "mongoose";

const schema = new mongoose.Schema({
  name: { type: String },
  user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Category",
  },
  phone: { type: String, required: true },
  date: { type: Date, required: true },
  details: { type: String },
  address: { type: String },
  status: { type: Boolean, default: false },
});

const Appointment = mongoose.model("Appointment", schema);

export default Appointment;
