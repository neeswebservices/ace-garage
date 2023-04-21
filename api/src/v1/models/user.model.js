import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
    {
        name: { type: String },
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        address: { type: String },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        role: {
            type: Number,
            default: 0, // 0 - simple user, 1 - vendor , 2 - admin
            select: false,
        },
        password: {
            type: String,
            required: true,
            select: false,
        },
        vendorAccess: {
            type: Boolean,
            default: false,
        },
        phone: String,
        business_name: {
            type: String,
        },
        business_address: {
            type: String,
        },
        profile: {
            type: String,
            default:
                'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png',
        },
        panno: { type: String },
    },
    {
        timestamps: true,
    },
);

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
});
const User = mongoose.model('User', userSchema);

export default User;
