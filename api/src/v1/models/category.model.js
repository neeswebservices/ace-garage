import mongoose from "mongoose";

const catSchema = new mongoose.Schema({
  name: { type: String, required: true },
  sub: [{ type: String }],
});

catSchema.methods.findByCategoryName = async function (name) {
  const categories = await this.model("Category").find({ name });
  return categories;
};

const Category = mongoose.model("Category", catSchema);

export default Category;
