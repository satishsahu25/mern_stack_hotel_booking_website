import express from "express";
const router = express.Router();
import {
  createHotel,
  allHotel,
  deleteHotel,
  singleHotel,
  updateHotel,
  countbycity,
  gethotelrooms,
  countbytype,
} from "../controllers/hotelcontrol.js";
import { verifyadmin } from "../verifytoken.js";

//CREATE
router.post("/", verifyadmin, createHotel);

//UPDATE
router.put("/:id", verifyadmin, updateHotel);

//DELETE

router.delete("/:id", verifyadmin, deleteHotel);

//GET by id
router.get("/find/:id", singleHotel);

//GETALL
router.get("/", allHotel);
//GETBYCITY
router.get("/countbycity", countbycity);
//GET BY TYPE
router.get("/countbytype", countbytype);

//get hotel rooms
router.get("/room/:hid",gethotelrooms)

export default router;
