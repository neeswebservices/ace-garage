import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'user Required'],
        ref: 'User',
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Category Required'],
        ref: 'Category',
    },
    title: {
        type: String,
    },
    desc: String,
    image: [String],
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment',
        },
    ],
    users: [mongoose.Schema.Types.ObjectId],
    views: {
        type: Number,
        default: 0,
    },
    price: {
        type: Number,
        required: true,
    },
    featured: { type: Boolean, default: false },
    status: {
        type: String,
        enum: ['pending', 'inprogess', 'completed', 'rejected', 'archived'],
        default: 'pending',
    },
});

const Service = mongoose.model('Service', serviceSchema);

export default Service;
