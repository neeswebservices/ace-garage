import { createError } from "../config/createError.js";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import ROLE from "../enums/roles.enum.js";

export const Auth = async (req, res, next) => {
  let token = req.headers.authorization || req.cookies.accesstoken;
  if (!token) {
    return next(createError("Unauthorized | Please login to continue !", 403));
  }
  try {
    if (token.includes(" ")) {
      token = token.split(" ")[1];
      jwt.verify(token, process.env.SECRETTOKEN, async (err, res) => {
        if (err) {
          throw err;
        }
        const role = await User.findById(res.id).select("role");
        if (role == null) {
          return next(createError("Unauthorized !", 403));
        }
        req.user = res.id;
        req.role = role.role;
        next();
      });
    } else if (!token.includes(" ")) {
      jwt.verify(token, process.env.SECRETTOKEN, async (err, res) => {
        if (err) {
          throw err;
        }
        const role = await User.findById(res.id).select("role");
        if (role == null) {
          return next(createError("Unauthorized !", 403));
        }
        req.user = res.id;
        req.role = role.role;
        next();
      });
    } else {
      return res.send(400).json({ message: "Invalid token authorization!" });
    }
  } catch (error) {
    console.log(error.message);
    return next(error);
  }
};

export const verifyCustomerAsWellAsAdmin = async () => {
  try {
    const role = req.role;
    if (!role) return res.send(400).json({ message: "Bad Request!" });
    if (role === ROLE.CUSTOMER || role === ROLE.ADMIN) return next();
  } catch (error) {
    return res.send(error?.status || 500).send({ json: error?.message });
  }
};

export const verfiyEmployee = async (req, res, next) => {
  try {
    const role = req.role;
    if (!role) return next(createError("Employee access denied !", 403));
    if (role == ROLE.CUSTOMER) return next(createError("Employee access denied!", 400));
    if (role == ROLE.ADMIN) {
      return next(createError("Admin cannot access Employee permission!", 400));
    }

    if (role == 1) {
      return next();
    }
    return next(createError("Employee access denied !", 403));
  } catch (error) {
    return next(error);
  }
};

export const verifyAdmin = async (req, res, next) => {
  try {
    const role = req.role;
    if (!role) return next(createError("Admin access denied !", 403));

    if (role == ROLE.ADMIN) {
      next();
    } else {
      return next(createError("Admin access denied !", 403));
    }
  } catch (error) {
    return next(error);
  }
};
