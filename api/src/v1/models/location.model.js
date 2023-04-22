import mongoose from "mongoose";

const locationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  position: {
    lat: {
      type: Number,
      required: true,
    },
    lon: {
      type: Number,
      required: true,
    },
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  zipCode: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  website: {
    type: String,
    required: true,
  },
  openingHours: [
    {
      dayOfWeek: {
        type: String,
        required: true,
      },
      openTime: {
        type: String,
        required: true,
      },
      closeTime: {
        type: String,
        required: true,
      },
    },
  ],
});

const Location = mongoose.model("Location", locationSchema);

export default Location;
