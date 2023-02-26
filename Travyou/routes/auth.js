import express from "express";
import { login, register } from "../controllers/authcontrol.js";
const router = express.Router();

//SIGNUP
router.post("/register", register);

//LOGIN
router.post("/login", login);

export default router;
