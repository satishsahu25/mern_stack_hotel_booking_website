import "./searchitems.css";
import React from "react";
import { useNavigate } from "react-router-dom";

const Searchitems = ({item,dates,destination,options}) => {

  const navigate = useNavigate();
  const handleclick=()=>{
    console.log(dates,destination,options);
    navigate(`/hotels/${item._id}`,{state:{dates,destination,options}});

  }

  return (
    <div className="searchitem" key={item._id}>
      <img src={item.photos[0]} className="siimg" alt="" />
      <div className="sidesc">
        <h1 className="sititle">{item.name}</h1>
        <span className="sidistance">{item.distance}m from center</span>
        <span className="sitaxiop">From aiport taxi</span>
        <span className="sisubtitle">
          Studio Aparment with Air Conditioning
        </span>
        <span className="sifeatures">
          {item.desc}
        </span>
        <span className="sicancelop">Free cancellation</span>
        <span className="sicancelopsubtitle">
          You can cancel later, so lock in this great place today!
        </span>
      </div>
      <div className="sidetails">
       { item.rating && <div className="sirating">
          <span>Excellent</span>
          <button>{item.rating}</button>
        </div>}
        <div className="sidetailstexts">
          <div className="siprice">${item.cheapestprice}</div>
          <div className="sitaxop">includes taxes and fees</div>
          <button className="sicheckbtn" onClick={handleclick}>See availability</button>
        </div>
      </div>
    </div>
  );
};

export default Searchitems;
