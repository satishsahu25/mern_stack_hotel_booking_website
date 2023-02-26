import express from 'express'
import { allUser, deleteUser, singleUser, updateUser } from '../controllers/usercontrol.js';
import { verifyadmin, verifytoken, verifyuser } from '../verifytoken.js';
const router=express.Router();


// //verifytoken
// router.get("/checkauth",verifytoken,(req,res,next)=>{
//     res.send("hello user you are authenticated")
// })

// //checkuser
// router.get("/checkuser/:id",verifyuser,(req,res,next)=>{
//     res.send("hello user you are authenticated and you can delete your accnt")
// })
// //chekcadmin
// router.get("/checkadmin/:id",verifyadmin,(req,res,next)=>{
//     res.send("you are admin")
// })

//UPDATE
router.put("/:id",verifyadmin,updateUser)

//DELETE
router.delete("/:id",verifyadmin,deleteUser)

//GET
router.get("/:id",verifyadmin,singleUser)

//GETALL
router.get("/",verifyadmin,allUser)

export default router