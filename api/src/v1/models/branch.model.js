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
    default: "Nepal",
  },
  state: {
    type: String,
  },
  country: {
    type: String,
  },
  zipCode: {
    type: String,
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
