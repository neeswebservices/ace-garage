import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        customerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        serviceId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Service',
        },
        status: {
            type: String,
            enum: {
                values: ['pending', 'inprogess', 'completed'],
                message: 'Value error, Invalid Request !',
            },
            default: 'pending',
        },
        name: { type: String },
        address: {
            type: String,
        },
        phone: {
            type: String,
        },
        time: {
            type: String,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    },
);

const Order = mongoose.model('Order', OrderSchema);

export default Order;
