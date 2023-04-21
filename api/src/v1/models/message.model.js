import mongoose from 'mongoose';
import { SchemaOptions } from './SchemaOptions';

const messageSchema = new mongoose.Schema(
    {
        conversationId: {
            type: String,
            required: true,
        },
        userId: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
    },
    SchemaOptions,
);

const Message = mongoose.model('Message', messageSchema);

export default Message;
