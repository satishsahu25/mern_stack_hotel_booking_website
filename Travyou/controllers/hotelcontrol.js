import Hotels from "../models/Hotels.js";
// import { createError } from '../errors/error.js';
import Rooms from '../models/Rooms.js'

//CREATE
export const createHotel = async (req, res, next) => {
  const newhotel = new Hotels(req.body);
  try {
    const savedhotel = await newhotel.save();
    res.status(200).json(savedhotel);
  } catch (err) {
    res.status(500).json(err);
    // next(err)
  }
};

//UPDATE
export const updateHotel = async (req, res, next) => {
  try {
    const updatehotel = await Hotels.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    ); //by new true updated document will be shown in postman
    //and mongodb not the previous one with few updates
    res.status(200).json(updatehotel);
  } catch (err) {
    res.status(500).json(err);
    // next(err);
  }
};

//DELETE
export const deleteHotel = async (req, res, next) => {
  try {
    await Hotels.findByIdAndDelete(req.params.id);
    res.status(200).send("hotel deleted");
  } catch (err) {
    res.status(500).json(err);
    // next(err)
  }
};

//GET BY ID
export const singleHotel = async (req, res, next) => {
  try {
    const singlehotel = await Hotels.findById(req.params.id);
    res.status(200).json(singlehotel);
  } catch (err) {
    res.status(500).json(err);
    // next(err)
  }
};

//GET ALL HOTEL
export const allHotel = async (req, res, next) => {
  // console.log("i am in hotelroute");
  // next() //next means go to the enxt middle from
  //where this route is called index.js se

  // const failed=true;

  // if(failed) return next(createError(401,"you are not autheni"))
  const {min,max,...others}=req.query;

  try {
     const allhotel = await Hotels.find({...others,cheapestprice:{
      $gt:min | 1,$lt:max || 999
    },}).limit(req.query.limit);

    res.status(200).json(allhotel);
  } catch (err) {
    res.status(500).json(err);
    // next(err)
  }
};

//GET HOTEL COUNT BY  CITY
export const countbycity = async (req, res, next) => {
  const cities = req.query.cities.split(",");

  try {
    const list = await Promise.all(
      cities.map((city) => {
        return Hotels.countDocuments({ city: city });
      })
    );

    res.status(200).json(list);
  } catch (err) {
    res.status(500).json(err);
    // next(err)
  }
};

//get hotel by type
export const countbytype = async (req, res, next) => {
  try {
  const hoteltypecount = await Hotels.countDocuments({ type: "hotel" });
  const apartmentcount = await Hotels.countDocuments({ type: "apartment" });
  const resortcount = await Hotels.countDocuments({ type: "resort" });
  const villascount = await Hotels.countDocuments({ type: "villas" });
  const cabincount = await Hotels.countDocuments({ type: "cabin" });

    res.status(200).send(
      [
      {
        type: "hotel",
        count: hoteltypecount,
      },
      {
        type: "apartment",
        count: apartmentcount,
      },
      {
        type: "resort",
        count: resortcount,
      },
      {
        type: "villas",
        count: villascount,
      },
      {
        type: "cabin",
        count: cabincount,
      }
    ]
    );
  } catch (err) {
    res.status(500).json(err);
    //  next(err)
  }
};

//get hotel rooms
export const gethotelrooms=async(req,res)=>{
  try{
    const hotel=await Hotels.findById(req.params.hid);
    const roomlist=await Promise.all(hotel.rooms.map(room=>{
      return Rooms.findById(room);
    }))
    res.status(200).json(roomlist)
  }catch(err){
    console.log(err);
  }
}

