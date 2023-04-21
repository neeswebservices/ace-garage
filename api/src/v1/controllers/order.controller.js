import asyncHandler from 'express-async-handler';
import { createError } from '../config/createError.js';
import Order from '../models/order.model.js';
import Service from '../models/service.model.js';
import { validObject } from '../utils/utils.js';
import Cart from '../models/cart.model.js';
import mongoose from 'mongoose';

// export const orderService = asyncHandler(async (req, res, next) => {
//     try {
//         const toOrderServices = await Cart.findOne({ userId: req.user });

//         return console.log(toOrderServices);

//         const orderAlreadyPlaced = await Order.findOne({ userId: req.user });

//         const services = await Cart.find({
//             cartItems: { $in: { serviceId: ids } },
//         }).select('price _id');

//         console.log(services);

//         await Cart.findOne({ userId: req.user }).then(async (data) => {
//             const cartedServices = await Service.find({
//                 _id: { $in: data.cartItems },
//             });
//             console.log(cartedServices);
//         });

//         // const cartedServices = await Cart.find({
//         //     serviceId: { $in: cartItems },
//         // });

//         // console.log(cartedServices);
//         return res.status(200).send({ msg: 'Order placed', cartedServices });

//         if (!services || Array.isArray(services)?.length <= 0)
//             return next(createError('Invalid Request', 403));

//         let serviceId = [];
//         services.map((i) => serviceId.push(i?._id));

//         const total = services.reduce((acc, curr) => acc + curr?.price, 0);

//         if (orderAlreadyPlaced) {
//             // const { total: prevTotal, _id: ids } = await Order.find({
//             //     userId: req.user,
//             // }).select('total _id');
//             // console.log(total);

//             // const updatedOrder = await Order.findOneAndUpdate(
//             //     { userId: req.user },
//             //     {
//             //         total: prevTotal + total,
//             //         sid: { $addToSet: ids },
//             //     },
//             //     {
//             //         new: true,
//             //         runValidators: true,
//             //     },
//             // );
//             // return res.status(200).send({
//             //     msg: 'More item added to order successfully placed!',
//             //     updatedOrder,
//             // });

//             return next(
//                 createError('Please wait until your last order placed !', 400),
//             );
//         } else {
//             const newOrder = new Order({
//                 userId: req.user,
//                 services: serviceId,
//                 total,
//             });
//             await newOrder.save();
//         }
//         return res
//             .status(200)
//             .send({ msg: 'Order successfully placed!', newOrder });
//     } catch (error) {
//         next(error);
//     }
// });

export const orderService = async (req, res, next) => {
    try {
        const { serviceId, phone, address, time, name, userId } = req.body; // service id

        if (!serviceId) {
            return res.status(400).send('Please provide service Id.');
        }

        const service = await Service.findById(serviceId);
        if (!service) {
            return res.status(400).send('Service not found');
        }

        const order = await Order.create({
            serviceId,
            userId,
            phone,
            name,
            address,
            time,
            customerId: req.user,
        });

        return res
            .status(200)
            .send({ msg: 'Ordered service', status: true, order });
    } catch (error) {
        if (error instanceof mongoose.Error.CastError) {
            return res.status(400).send('Please provide valid Id');
        }
        console.log(error);
        next(error);
    }
};

export const getOrders = async (req, res, next) => {
    try {
        const orders = await Order.find({ userId: req.user })
            .populate('userId')
            .populate('customerId')
            .populate('serviceId');

        return res.status(200).send({ msg: 'Orders', orders });
    } catch (error) {
        next(error);
    }
};

export const changeStatus = async (req, res, next) => {
    try {
        const { status, orderId } = req.body;

        const order = await Order.findByIdAndUpdate(
            { _id: orderId },
            { $set: { status } },
            { new: true, runValidators: true },
        );
        if (order) {
            return res.status(200).send({ msg: 'Order status updated!' });
        } else {
            return res.status(400).send({ msg: 'Order not found !' });
        }
    } catch (error) {
        if (error instanceof mongoose.Error.CastError) {
            return res.status(400).send('Please provide valid Id');
        } else if (error instanceof mongoose.Error.ValidationError) {
            return res
                .status(400)
                .send('Provide pending | inprogess | completed  ');
        } else {
            return next(error);
        }
    }
};
