import mongoose from "mongoose";


const Userschema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    isadmin:{
        type:Boolean,
        default:false
    }
},{timestamps:true});


export default mongoose.model("User",Userschema);