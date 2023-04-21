import asyncHandler from 'express-async-handler';
import { createError } from '../config/createError.js';
import Category from '../models/category.model.js';
import VendorRequest from '../models/request.model.js';
import User from '../models/user.model.js';
import { limitAndSkip } from '../utils/utils.js';
import Service from '../models/service.model.js';

export const createCategory = asyncHandler(async (req, res, next) => {
    const { name, icon, color } = req.body;

    console.log(req.user);

    if (!name) return next(createError('Please enter all fields !', 400));

    const cat = await Category.create({
        name,
        ...(icon && { icon }, color && { color }),
    });

    return res.status(200).send(cat);
});

export const deleteCategory = asyncHandler(async (req, res, next) => {
    const { id } = req.query || req.body;

    if (!id) return res.status(400).send({ msg: 'Please provide category Id' });

    const category = await Category.findByIdAndDelete(id);

    if (category) {
        return res.status(200).send('Category deleted!');
    } else {
        return res.status(404).send('Category not found!');
    }
});

export const getCategories = asyncHandler(async (req, res, next) => {
    return res.status(200).send(await Category.find());
});

export const getServices = asyncHandler(async (req, res, next) => {
    return res.status(200).send(await Service.find());
});

export const getPendingVendors = asyncHandler(async (req, res, next) => {
    const [limit, skip] = limitAndSkip(req.query);

    return res.status(200).send(
        await VendorRequest.find({ skip, limit }).populate({
            path: 'user',
            select: '+role',
        }),
    );
});

export const approveOrRejectVendors = asyncHandler(async (req, res, next) => {
    const { action, id } = req.query;
    if (action == 'true') {
        const data = await VendorRequest.findById(id).populate({
            path: 'user',
            select: '+role',
        });
        if (!!!data)
            return next(createError('No such request found for vendor!', 403));
        const { _id, user } = data;
        const { _id: userId } = user;

        const updateduser = await User.findByIdAndUpdate(
            { _id: userId },
            {
                role: 1,
                vendorAccess: true,
            },
            {
                new: true,
                runValidators: true,
            },
        );

        if (updateduser) {
            await VendorRequest.findByIdAndDelete(_id);
            // send mail that you have been approved as the vendor
            return res.status(200).send({
                msg: 'Vendor successfully approved!',
            });
        } else {
            const err = new Error();
            return next(err);
        }
    } else if (action == 'false') {
        // send mail that it's rejected
        const user = await User.findById(id);
        console.log(user);

        await VendorRequest.findOneAndDelete({ user: user._id });
        return res.status(451).send({ msg: 'Rejected for vendor!' });
    } else {
        return next(
            createError('Invalid request, please provide action.', 403),
        );
    }
});

export const deleteService = async (req, res, next) => {
    try {
        const { id } = req.query || req.body;

        const service = await Service.findByIdAndDelete(id);
        if (service) {
            return res.status(200).send({ msg: 'Service deleted' });
        } else {
            next(createError(404, 'Service not found'));
        }
    } catch (error) {
        return next(createError(error));
    }
};

export const getAdminDetails = asyncHandler(async (req, res, next) => {});
