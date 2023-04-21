import asyncHandler from 'express-async-handler';
import address from 'address';
import { createError } from '../config/createError.js';
import Category from '../models/category.model.js';
import mongoose from 'mongoose';
import Service from '../models/service.model.js';

export const createService = asyncHandler(async (req, res, next) => {
    const { title, desc, price } = req.body;
    const { id } = req.query;

    if (!id) return next(createError('Category is required!', 400));
    if (!title || !desc || !price)
        return next(createError('Invalid Request 2', 400));

    // if (!Number.isInteger(price))
    //     return next(createError('Price must be number!', 400));

    if (price < 200) return next(createError('Price too less', 400));

    if (price > 999999999) return next(createError('Price too high', 400));

    if (!mongoose.Types.ObjectId.isValid(id))
        return next(createError('Invalid Request 3 ', 403));

    const cad = await Category.findById(id);
    if (!!!cad) return next(createError("Category doesn't exists !"));

    const service = new Service({
        user: req.user,
        category: id,
        title,
        desc,
        price,
    });

    if (req.files) {
        const server = process.env.SERVER;
        req.files.map((file) => {
            service.image.push(`${server}/${file.path}`);
        });
    }

    await service.save();

    return res.status(200).send({ msg: 'Service created successfully!' });
});

export const getServices = asyncHandler(async (req, res, next) => {
    return res.status(200).send(await Service.find().populate('user'));
});

export const getSingleService = asyncHandler(async (req, res, next) => {
    const { id } = req.query || req.body;
    return res.status(200).send(await Service.findById(id).populate('user'));
});

export const getService = asyncHandler(async (req, res, next) => {
    const id = req.query.id || req.params.id;
    const service = await Service.findById(id).populate('user');
    return res.status(200).send(service);
});
