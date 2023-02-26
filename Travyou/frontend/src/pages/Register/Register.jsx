import axios from 'axios';
import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import './register.css'

const Register = () => {

    const [name,setname]=useState("");
    const [email,setemail]=useState("");
    const [password,setpassword]=useState("");
    const navigate=useNavigate();
    const credential={name,email,password};

    const registeruser=async()=>{
       try{
        const res=await axios.post("/auth/register",{...credential});
        // const res=await axios.post("http://localhost:8800/api/auth/register",{...credential});
        console.log(res);
        if(res.status===200){
            // console.log(res.data);
            localStorage.setItem("user","true");
            navigate("/");
        }else{
            console.log("error occured in registration");
        }
       }catch(err){
        console.log(err.response.data);
       }
    }

  return (
    <div className="register">
         <div className="container">

        <label>Name</label>
        <input type="text"
         placeholder='Enter your name'
          onChange={(e)=>setname(e.target.value)}
          className='txtbox' />

        <label>Email</label>
        <input type="text"
         placeholder='Enter your email'
         onChange={(e)=>setemail(e.target.value)}
          className='txtbox' />

        <label>Password</label>
        <input type="text"
         placeholder='Enter your password'
         onChange={(e)=>setpassword(e.target.value)}
         className='txtbox'/>
        <div className="btnsection">
        <button className="registerbtn" onClick={registeruser}>Register</button>
        <Link to="/login"><button className="loginbtn">Login</button>
        </Link>
        </div>
    </div>
    </div>
  )
}

export default Register