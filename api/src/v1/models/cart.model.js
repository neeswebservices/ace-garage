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
        // Spare: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Spare",
        // },
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

// cartSchema.post("findOneAndUpdate", async function (doc) {
//   try {
//     const docToUpdate = await this.model
//       .findOne(this.getQuery())
//       .populate("items");
//     const items = this._update.$set.items || docToUpdate.items;
//     console.log(items);
//     const totalPrice = items.reduce((acc, item) => {
//       return acc + item.price;
//     }, 0);
//     this.update({}, { $set: { totalPrice: totalPrice } });
//     // next();
//   } catch (error) {
//     console.log(error.message);
//   }
// });

cartSchema.post("findOneAndUpdate", async function (doc) {
  try {
    const updatedDoc = await this.model
      .findOne({ _id: doc._id })
      .populate("items");

    console.log(updatedDoc);

    const items = updatedDoc.items;

    console.log(items);

    const totalPrice = items.reduce((acc, item) => {
      const price = item ? item.price : 0;
      return acc + price;
    }, 0);
    console.log(totalPrice);
    updatedDoc.totalPrice = totalPrice;
    await updatedDoc.save();
  } catch (error) {
    console.error(error);
  }
});

// cartSchema.pre("save", function (next) {
//   const totalPrice = this.items.reduce(
//     (acc, item) => acc + item.Spare.price,
//     0
//   );
//   console.log(totalPrice);
//   this.totalPrice = totalPrice;
//   next();
// });

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;
