import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  service: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Service",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  spares: [{ type: mongoose.Schema.Types.ObjectId, ref: "Spare" }],
  totalPrice: {
    type: Number,
    default: 0,
  },
  date: { type: Date, required: true },
  address: String,
  status: {
    type: String,
    enum: ["pending", "confirmed", "completed", "cancelled"],
    default: "pending",
  },
});

const updateTotalPrice = async function (next) {
  const service = await mongoose.model("Service").findById(this.service);
  const spares = await mongoose
    .model("Spare")
    .find({ _id: { $in: this.spares } });
  const sparesTotalPrice = spares.reduce(
    (total, spare) => total + spare.price,
    0
  );
  const totalPrice = service.price + sparesTotalPrice;

  this.totalPrice = totalPrice;

  next();
};

bookingSchema.pre("save", updateTotalPrice);
bookingSchema.pre("findOneAndUpdate", updateTotalPrice);

// bookingSchema.pre("save", async function (next) {
//   const service = await mongoose.model("Service").findById(this.service);
//   const spares = await mongoose.model("Spare").find({ _id: { $in: this.spares } });
//   const sparesTotalPrice = spares.reduce((total, spare) => total + spare.price, 0);
//   this.totalPrice = service.price + sparesTotalPrice;

//   next();
// });

const ServiceBooking = mongoose.model("ServiceBooking", bookingSchema);
export default ServiceBooking;
