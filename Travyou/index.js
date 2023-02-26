import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

//routes import
import authroute from "./routes/auth.js";
import hotelroute from "./routes/hotels.js";
import roomsroute from "./routes/rooms.js";
import usersroute from "./routes/users.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const connectdb = async () => {
  const dboption = {
    dbname: "BeastBooking",
  };
  try {
    await mongoose.connect(process.env.DBURL, dboption);
    console.log("connected to mongoodb");
  } catch (error) {
    throw error;
  }
};
mongoose.connection.on("disconnected", () => {
  console.log("mongodb disconnected");
});

mongoose.connection.on("connected", () => {
  console.log("mongodb connected again");
});

// app.get("/",(req,res)=>{
//     res.send("hello")
// })

app.use(express.json());
app.use(cookieParser());
app.use(cors());

//for registering user,login etc.
app.use("/auth", authroute);

app.use("/users", usersroute);
//for hotel create,update,delete,etc.
app.use("/hotels", hotelroute);
app.use("/rooms", roomsroute);

////DEPLOYMENT
//to check production version
if(process.env.NODE_ENV="production"){
  app.use(express.static("frontend/build"));

}

//middlewares they run after routes
app.use((err, req, res, next) => {
  const errorstatus = err.status || 500;
  const errormsg = err.message || "something went wrong";
  return res.status(errorstatus).json({
    success: false,
    msg: errormsg,
    status: errorstatus,
    stack: err.stack,
  });

  // console.log("hey i am middleware error"+err)
});

const PORT = process.env.PORT || 8800;

app.listen(PORT, () => {
  //when connection to server happen then we connect to databse
  connectdb();
  console.log("connected to server");
});
