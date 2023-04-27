import { createError } from "../config/createError.js";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import ROLE from "../enums/roles.enum.js";
import APPError from "../utils/Error.js";
import tryCatch from "../utils/tryCatch.js";

export const Auth = tryCatch(async (req, res, next) => {
  let token = req.headers?.authorization || req.cookies?.accesstoken;
  if (!token) {
    throw new APPError("Unauthorized | Please login to continue !", 403);
  }
  token = String(token).includes(" ") ? token?.split(" ")[1] : token;
  jwt.verify(token, process.env.SECRETTOKEN, async (err, res) => {
    if (err) {
      console.log(err.message);
      // throw new APPError("Invalid Authentication", 403);
      throw new APPError("Unauthorized | Please login to continue !", 403);
    } else {
      const role = await User.findById(res.id).select("role");
      if (role == null) {
        throw new APPError("Unauthorized | Please login to continue !", 403);
      }
      req.user = res?.id;
      req.role = role?.role;
      next();
    }
  });
});

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
    if (!role) throw new APPError("Forbidden | Employee access denied!", 403);
    if (role == ROLE.CUSTOMER) {
      throw new APPError("Forbidden | Employee access denied!", 403);
    }

    if (role == ROLE.ADMIN) {
      throw new APPError(
        "Forbidden | Admin cannot access Employee permission!!",
        403
      );
    }

    if (role == 1) {
      return next();
    }
    throw new APPError("Forbidden | Employee access denied!", 403);
  } catch (error) {
    return next(error);
  }
};

export const verifyAdmin = async (req, res, next) => {
  try {
    const role = req.role;
    if (!role) throw new APPError("Forbidden | Admin access denied!", 403);

    if (role == ROLE.ADMIN) {
      next();
    } else {
      throw new APPError("Forbidden | Admin access denied!", 403);
      // return next(createError("Admin access denied !", 403));
    }
  } catch (error) {
    return next(error);
  }
};
