import mongoose from "mongoose";


const Roomschema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    maxpeople:{
        type:Number,
        required:true
    },
    desc:{
        type:String,
       required:true
    },
    roomnumbers:[{
        number:Number, unavailableDates:{type:[Date]}
        //101,5/5/22,17/5/22
    }]
},{timestamps:true});

export default mongoose.model("Room",Roomschema);