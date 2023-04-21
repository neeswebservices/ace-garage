import mongoose from 'mongoose';

const requestSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'user Required'],
        ref: 'User',
    },
    status: {
        type: Boolean,
        default: false,
    },
    rejected: {
        type: String,
        default: 'You are not eligible to become Vendor!',
    },
});

const VendorRequest = new mongoose.model('VendorRequest', requestSchema);
export default VendorRequest;
