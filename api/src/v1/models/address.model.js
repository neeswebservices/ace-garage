import mongoose from "mongoose"

const addressSchema = new mongoose.Schema({
	street: String,
	postalCode: String,
	city: String,
	country: String,
	location: String,
    phone: String
})

const Address = mongoose.model("Address", addressSchema)

export default Address
