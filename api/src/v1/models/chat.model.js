import mongoose from 'mongoose';

const chatSchema = new mongoose.model({
    conversationId: {
        type: String,
        required: true,
        unique: true,
    },
    userId: {
        type: String,
        required: true,
    },
    vendorId: {
        type: String,
        required: true,
    },
    readByUser: {
        type: Boolean,
        default: false,
        required: true,
    },
    readByVendor: {
        type: Boolean,
        default: false,
        required: true,
    },
    lastMessage: {
        type: String,
        required: false,
    },
});

const Chat = mongoose.model('Chat', chatSchema);

export default Chat;
