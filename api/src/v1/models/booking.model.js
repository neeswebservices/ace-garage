import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  eservice: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Eservice",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  totalPrice: Number,
  date: { type: Date, required: true },
  status: {
    type: String,
    enum: ["pending", "confirmed", "completed", "cancelled"],
    default: "pending",
  },
  address: String,
});

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;
