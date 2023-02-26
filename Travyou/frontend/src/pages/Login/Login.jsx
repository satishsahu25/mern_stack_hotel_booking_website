import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

const Login = () => {
    const [email,setemail]=useState("");
    const [password,setpassword]=useState("");
    const credential={email,password};

  const navigate=useNavigate();



  const handleclick = async () => {
    try{
      const res=await axios.post("/auth/login",{...credential});
      // const res=await axios.post("https://localhost:8800/api/auth/login",{...credential});
      if(res.status==200){
          console.log(res.data);
          navigate("/");
      }else{
          console.log("error occured in login");
      }
     }catch(err){
      console.log(err);
     }

    // dispatch({ type: "LOGINSTART" });
    // try {
    //   const res = await axios.post("http://localhost:8800/api/auth/login", credentials);
    //   console.log(res);
    //   dispatch({ type: "LOGINSUCCESS", payload: res.data.details });
    //     navigate("/");
    // } catch (err) {
    //   dispatch({ type: "LOGINFAILURE", payload: err.response.data });
    // }
  };

//   console.log(user);
  return (
    <div className="login">
      <div className="lContainer">
        <input
          type="text"
          placeholder="Enter your email"
          onChange={(e)=>setemail(e.target.value)}
          className="lInput"
        />
        <input
          type="password"
          placeholder="Enter your password"
          onChange={(e)=>setpassword(e.target.value)}
          className="lInput"
        />
       <button className="lButton" onClick={handleclick}>
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
