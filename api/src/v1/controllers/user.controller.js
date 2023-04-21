import { createError } from "../config/createError.js";
import User from "../models/user.model.js";
import { limitAndSkip } from "../utils/utils.js";

export const getAllUsers = async (req, res, next) => {
  try {
    const [limit, skip] = limitAndSkip(req.query);

    const users = await User.find()
      .sort({
        createdAt: -1,
      })
      .limit(limit)
      .skip(skip);

    return res.json(users);
  } catch (error) {
    return next(error);
  }
};
export const getAllVendors = async (req, res, next) => {
  try {
    const [limit, skip] = limitAndSkip(req.query);

    const users = await User.find({ vendorAccess: true })
      .sort({
        createdAt: -1,
      })
      .limit(limit)
      .skip(skip);

    return res.json(users);
  } catch (error) {
    return next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user, { ...req.body });
    return res.status(200).send("User updated!");
  } catch (error) {
    next(error);
  }
};

export const requestVendor = async (req, res, next) => {
  try {
    const alreadyInPending = await VendorRequest.findOne({
      user: req.user,
    });

    if (alreadyInPending) {
      return next(createError("Already in the Pending queue!", 200));
    }
    if (req.role == 1 || req.role == 2) {
      return next(createError("You already a vendor! ", 400));
    }
    await new VendorRequest({
      user: req.user,
    }).save();
    return res.status(200).send({ msg: "Request in Pending!" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const updateProfile = async function (req, res) {
  try {
    if (req.file) {
      const server = process.env.SERVER;
      const user = await User.findById(req.user);
      user.profile = `${server}/${req.file.path}`;
      await user.save();
      return res.send("Profile image updated");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Error saving profile image");
  }
};
