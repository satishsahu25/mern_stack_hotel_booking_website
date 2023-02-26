import {
  faCircleArrowLeft,
  faCircleRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Booking from "../../components/Booking/Booking";
import Footer from "../../components/footer/footer";
import Header from "../../components/header/header";
import useFetch from "../../components/hooks/useFetch";
import Mailist from "../../components/mailist/mailist";
import Navbar from "../../components/navbar/navbar";
import { SearchContext } from "../../context/SearchContext";
import "./hotel.css";

const Hotel = () => {
  //using location we access the hotelid
  const location = useLocation();
  const hid = location.pathname.split("/")[2];
  const [slidenum, setslidenum] = useState(0);
  const [openi, setopeni] = useState(false);
  const [openbookmodal, setopenbookmodal] = useState(false);
  const navigate = useNavigate();
  const { data, loading, error, reFetch } = useFetch(`/hotels/find/${hid}`);

  //  const { dates, options } = useContext(SearchContext);
  // console.log(SearchContext);

  // const state=useLocation();
  // const {dates,options}=location;

  const { dates,destination, options }=location.state;
  console.log(dates,destination, options);


  const MILLISECONDSPERDAY = 1000 * 60 * 60 * 24;
  function daydifference(date1, date2) {
    const timediff = Math.abs(date2.getTime() - date1.getTime());
    const diffdays = Math.ceil(timediff / MILLISECONDSPERDAY);
    return diffdays;
  }

  const days = daydifference(dates[0].endDate, dates[0].startDate);

  const handleopen = (i) => {
    setslidenum(i);
    setopeni(true);
  };

  console.log(data.photos);
  const handlemove = (direction) => {
    let newslidenumber;
    if (direction === "d") {
      newslidenumber = slidenum === 0 ? data.photos.length-1 : slidenum - 1;
    } else {
      newslidenumber = slidenum === data.photos.length -1? 0 : slidenum + 1;
    }
    setslidenum(newslidenumber);
  };

  var user;
  if(localStorage.getItem("user")==="true"){
  user=true
  }else{
    user=false
  }

  const handleclick = () => {
    if (user) {
      setopenbookmodal(true);
    } else {
      navigate("/login");
    }
  };

  console.log(days, options.room);

  return (
    <>
      <Navbar />
      <Header type="list" />
      {loading ? (
        "Loading"
      ) : (
        <div className="hotelcontainer">
          {openi && (
            <div className="slider">
              <div onClick={() => setopeni(false)}>
                <FontAwesomeIcon icon={faCircleXmark} className="close" />
              </div>
              <FontAwesomeIcon
                icon={faCircleArrowLeft}
                className="arrow"
                onClick={() => handlemove("d")}
              />
              <div className="sliderwrapper">
                <img src={data.photos[slidenum]} alt="" className="sliderimg" />
              </div>
              <FontAwesomeIcon
                icon={faCircleRight}
                className="arrow"
                onClick={() => handlemove("i")}
              />
            </div>
          )}
          <div className="hotelwrapper">
            <button className="booknow" onClick={handleclick}>Reserve or Book now!</button>
            <h1 className="hoteltitle">{data.name}</h1>
            <div className="hoteladdress">
              <FontAwesomeIcon icon={faLocationDot} />
              <span>{data.address}</span>
            </div>
            <span className="hoteldistance">
              Excellent location - {data.distance}m from center
            </span>
            <span className="hotelpricehighlight">
              Book a stay over ${data.cheapestprice} at this property and get a
              free aiport taxi
            </span>

            <div className="hotelimages">
              {data.photos?.map((photo, i) => (
                <div className="hotelimgwrapper">
                  <img
                    src={photo}
                    onClick={() => handleopen(i)}
                    alt=""
                    className="hotelimg"
                  />
                </div>
              ))}
            </div>
            <div className="hoteldetails">
              <div className="hoteldetailstexts">
                <h1 className="hoteltitle">{data.title}</h1>
                <p className="hoteldesc">{data.desc}</p>
              </div>
              <div className="hoteldetailsprice">
                <h1>Perfect for a {days}-night stay!</h1>
                <span>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. A
                  ullam aut temporibus dolorum consequuntur atque maxime
                  repellat veniam est! Necessitatibus repellat voluptatum, quos
                  ipsa nostrum perferendis itaque impedit assumenda eos.
                </span>
                <h2>
                  <b>${days * data.cheapestprice * options.room}</b> ({days}{" "}
                  nights)
                </h2>
                <button onClick={handleclick}>Reserve or Book Now!</button>
              </div>
            </div>
          </div>
          <Mailist />
          <Footer />
        </div>
      )}
      {openbookmodal && <Booking setopen={setopenbookmodal} hotelid={hid} dates={dates}/>}
    </>
  );
};

export default Hotel;
