import Jwt from "jsonwebtoken";
import { createError } from "./error.js";
import dotenv from "dotenv";
dotenv.config();

export const verifytoken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return next(createError(401, "You are not authenticated"));
  }

  Jwt.verify(token, process.env.SECRETKEY, (err, user) => {
    if (err) {
      return next(createError(403, "Token is not valid"));
    }
    req.user = user;
    next();
  });
};
export const verifyuser = (req, res, next) => {
  verifytoken(req, res, next, () => {
    if (req.user.id === req.params.id || req.user.isadmin) {
      next();
    } else {
      return next(createError(405, "You are not authorized"));
    }
  });
};

export const verifyadmin = (req, res, next) => {
  verifytoken(req, res, next, () => {
    if (req.user.isadmin) {
      next();
    } else {
      return next(createError(405, "You are not admin"));
    }
  });
};
