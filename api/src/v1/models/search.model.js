import mongoose from "mongoose"

const searchSchema = new mongoose.Schema(
	{
		data: [String],
	},
	{
		timestamps: true,
	},
)

const UserSearch = mongoose.model("UserSearch", searchSchema)

export default UserSearch
