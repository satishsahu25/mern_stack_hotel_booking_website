import Room from "../models/Rooms.js";
import { createError } from "../error.js";
import Hotel from "../models/Hotels.js";

//CREATE ROOM
export const createRoom=async (req,res,next)=>{
    const hotelid=req.params.hotelid;
    const newroom=new Room(req.body);

    try{
        const saveroom=await newroom.save();
        try{
            await Hotel.findByIdAndUpdate(hotelid,{$push:{rooms:saveroom._id}}) //by push mehtod weinsert room id in rooms array of hotel

        }catch(err){
            next(err)
        }
        res.status(200).json(saveroom)

    }catch(err){
        next(err)
    }
}

//UPDATE ROOM
export const updateRoom=async (req,res,next)=>{
    try{
        const updateroom=await Room.findByIdAndUpdate(req.params.id,
            {$set:req.body},{new:true}); //by new true updated document will be shown in postman
            //and mongodb not the previous one with few updates
        res.status(200).json(updateroom)

    }catch(err){
         res.status(500).json(err);
        // next(err);
    }

}

export const updateRoomavalablity=async(req,res)=>{
    try{
        await Room.updateOne({"roomnumbers._id":req.params.id},
        {
            $push:{
                "roomnumbers.$.unavailableDates":req.body.dates
            }
        })
    }catch(err){
    res.status(400).json(err);
    }
}

//DELETE
export const deleteRoom=async (req,res,next)=>{
    const hotelid=req.params.hotelid;
    try{
        await Room.findByIdAndDelete(req.params.id);

            //update hotel
        try{
            await Hotel.findByIdAndUpdate(hotelid,
                {$pull:{rooms:req.params.id}});

        }catch(err){
            //  res.status(500).json(err);
             next(err);
        }
        res.status(200).send("room deleted na dhotl updated");

    }catch(err){
        //  res.status(500).json(err);
         next(err)
    }

}


//GET BY ID
export const singleRoom=async (req,res,next)=>{
    try{
        const singleroom=await Room.findById(req.params.id);
        res.status(200).json(singleroom)


    }catch(err){
        res.status(500).json(err);
        // next(err)
    }
}

//GET ALL HOTEL
export const allRoom=async (req,res,next)=>{
    // console.log("i am in hotelroute")
    // next() //next means go to the enxt middle from
    //where this route is called index.js se

    // const failed=true;

    // if(failed) return next(createError(401,"you are not autheni"))
    try{
        const allroom=await Room.find();
        res.status(200).json(allroom)

    }catch(err){
         res.status(500).json(err);
        // next(err)
    }
}
