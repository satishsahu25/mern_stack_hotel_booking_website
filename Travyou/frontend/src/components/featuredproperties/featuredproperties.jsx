import React from "react";
import "./featuredproperties.css";
import useFetch from "../hooks/useFetch";

const Featuredproperties = () => {

  const {data,loading}=useFetch("/hotels");
  console.log(data);
  const images = [
    "https://res.cloudinary.com/codercloud/image/upload/v1657296737/Hotels/h5/h54_iulzuq.webp",
    "https://res.cloudinary.com/codercloud/image/upload/v1657083706/Hotels/h10_dl62fx.webp",
    "https://res.cloudinary.com/codercloud/image/upload/v1657281243/Hotels/h3/h31_yu1rex.webp",
    "https://res.cloudinary.com/codercloud/image/upload/v1657082993/Hotels/The_Danna_Langkawi_ra0l9s.webp",
  ];


  return (
    <div className="fp">
      {loading ? (
        "Loading"
      ) :
        <>
          {
          data.map((item, index) => (
           index<4 &&(
            <div className="fpitem" key={index}>
            <img
              src={images[index]}
              alt=""
              className="fpimg"
            />
            <span className="fpname">{item.name}</span>
            <span className="fpcity">{item.city}</span>
            <span className="fpprice">Rs.{item.cheapestprice}</span>
            <div className="fprating">
             {
              item.rating && <>
               <button>{item.rating}</button>
              <span>Excellent</span>
              </>
             }
            </div>
          </div>
           )
          ))}
        </>
      }
    </div>
  );
};

export default Featuredproperties;
