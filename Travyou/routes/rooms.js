import express from "express";
import {
  createRoom,
  allRoom,
  updateRoom,
  singleRoom,
  deleteRoom,
  updateRoomavalablity,
} from "../controllers/roomcontrol.js";
import { verifyadmin } from "../verifytoken.js";
const router = express.Router();

//CREATE ROOM  in specific hotel
router.post("/:hotelid", verifyadmin, createRoom);

//UPDATE
router.put("/:id", verifyadmin, updateRoom);
//UPDATE availabilty
router.put("/availablity/:id", updateRoomavalablity);

//DELETE

router.delete("/:id/:hotelid", verifyadmin, deleteRoom);

//GET by id
router.get("/:id", singleRoom);

//GETALL
router.get("/", allRoom);

export default router;
