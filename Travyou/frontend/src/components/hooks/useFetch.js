import axios from "axios";
import { useEffect } from "react";
import { useState } from "react"

const useFetch=(url)=>{
    const [data,setdata]=useState([]);
    const [loading,setloading]=useState(false);
    const [error,seterror]=useState(false);

    useEffect(()=>{
        const fetchdata=async()=>{
            setloading(true)
            try{
                const res=await axios.get(url);
                if(res.status===200){
                    setdata(res.data);

                }
            }catch(err){
                seterror(err);
            }
            setloading(false);
        }
        fetchdata();
    },[url]);


    const reFetch=async()=>{
        setloading(true)
        try{
            const res=await axios.get("http://localhost:8800/api"+url);
            if(res.status===200){
                setdata(res.data);
            console.log(res);
            }
        }catch(err){
            seterror(err);

        }
        setloading(false);
    };

    return {data,loading,error,reFetch};
}

export default useFetch







