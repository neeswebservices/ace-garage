import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    items: [
      {
        Spare: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Service",
        },
      },
    ],
    totalPrice: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

cartSchema.virtual("cartQuantity").get(function () {
  return this.items.length;
});

cartSchema.pre("save", function (next) {
  const totalPrice = this.items.reduce((acc, item) => acc + item.Spare.price, 0);
  console.log(totalPrice);
  this.totalPrice = totalPrice;
  next();
});

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;
