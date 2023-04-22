import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: { type: String },
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      immutable: true,
    },
    role: {
      type: Number,
      enum: [0, 1, 2],
      default: 0, // 0 - user, 1 - employee , 2 - admin
      select: false,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    profile: {
      type: String,
      default: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png",
    },
    panNumber: { type: String },
    address: { type: String },
    street: String,
    postalCode: String,
    city: String,
    country: { type: String },
    location: String,
    phone: { type: String, required: true, immutable: true },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash(this.password, salt);
  this.password = hashedPassword;
  next();
});

const User = mongoose.model("User", userSchema);

export default User;
