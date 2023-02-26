import User from "../models/Users.js";
import bcrypt from "bcrypt";
import { createError } from "../error.js";
import JsonWebToken from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

//SIGNUP
export const register = async (req, res, next) => {
  const {name,email,password}=req.body;
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const newuser = new User({
      name,
      email,
      // password:req.body.password
      password: hash,
    });

    await newuser.save();
    res.status(200).send("User has been created");
  } catch (err) {
    next(err);
  }
};

//LOGIN
export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return next(createError(404, "User not found"));
    }

    const ispasswordcorect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!ispasswordcorect) {
      return next(createError(404, "password incorrect"));
    }

    const token = JsonWebToken.sign(
      { id: user._id, isadmin: user.isadmin },
      process.env.SECRETKEY
    );
    const { password, isadmin, ...otherdetails } = user._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ ...otherdetails, token });

    //we will hide user details in jsaon webtoken
  } catch (err) {
    next(err);
  }
};
