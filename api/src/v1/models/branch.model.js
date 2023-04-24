import mongoose from "mongoose";

const branchSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  position: {
    lat: {
      type: Number,
    },
    lon: {
      type: Number,
    },
  },
  address: {
    type: String,
  },
  city: {
    type: String,
    default: "Kathmandu",
  },
  state: {
    type: String,
  },
  country: {
    type: String,
    default: "Nepal"
  },
  openingHours: [
    {
      dayOfWeek: {
        type: String,
      },
      openTime: {
        type: String,
      },
      closeTime: {
        type: String,
      },
    },
  ],
});

const Branch = mongoose.model("Branch", branchSchema);

export default Branch;
