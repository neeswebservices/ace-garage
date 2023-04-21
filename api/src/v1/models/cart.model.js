import mongoose, { mongo } from 'mongoose';

const cartSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        cartItems: [
            {
                serviceId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Service',
                },
                checked: {
                    type: Boolean,
                    default: true,
                },
            },
        ],
        cartQuantity: {
            type: Number,
            min: [0, 'Invalid Value!'],
            default: 1,
        },
        totalPrice: Number,
    },
    {
        timestamps: true,
    },
);

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;
