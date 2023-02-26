import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useState } from "react";
// import { useContext } from "react";
import { useNavigate } from "react-router-dom";
// import { SearchContext } from "../../context/SearchContext";
import useFetch from "../hooks/useFetch";
import "./booking.css";

const Booking = ({ setopen, hotelid,dates }) => {
  
  const { data, loading, error, reFetch } = useFetch(`/hotels/room/${hotelid}`);
  console.log(data);
  // const { dates } = useContext(SearchContext);
  const [selectedroom, setselectedroom] = useState([]);

  const getdatesinrange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const date = new Date(start.getTime());

    let datesarr = [];
    while (date <= end) {
      datesarr.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }
    return datesarr;
  };
  const alldates = getdatesinrange(dates[0].startDate, dates[0].endDate);

  const isavailable = (roomnumber) => {
    const isfound = roomnumber.unavailableDates.some((date) =>
      alldates.includes(new Date(date).getTime())
    );
    return !isfound;
  };

  const handleselectedroom = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    setselectedroom(
      checked
        ? [...selectedroom, value]
        : selectedroom.filter((item) => item !== value)
    );
  };

  const navigate=useNavigate();

  console.log(selectedroom);

  const handleclick = async () => {
    try {
      await Promise.all(
        selectedroom.map((roomid) => {
          const res = axios.put(`/rooms/availablity/${roomid}`, {
            dates: alldates,
          });
          return res.data;
        })
      );
      setopen(false);
      //You can use navigation for click on reserve btn
      navigate("/");
    } catch (err) {

    }
  };

  return (
    <div className="reserve">
      <div className="rcontainer">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="rclose"
          style={{margin:"5px"}}
          onClick={() => setopen(false)}
        />
        <span>Select your rooms:</span>
        {data.map((item) => (
          <div className="ritem" key={item._id}>
            <div className="riteminfo">
              <div className="rtitle">{item.title}</div>
              <div className="rdesc">{item.desc}</div>
              <div className="rmax">
                Max people:<span> </span>
                <b> {item.maxpeople}</b>
              </div>
              <div className="rprice">${item.price} per person</div>

              <div className="rselectrooms">
                {item.roomnumbers.map((roomnumber) => (
                  <div className="room">
                    <label>{roomnumber.number}</label>
                    <input
                      disabled={!isavailable(roomnumber)}
                      type="checkbox"
                      value={roomnumber._id}
                      onChange={handleselectedroom}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}

        <button onClick={handleclick} className="rbtn">
          Confirm your booking
        </button>
      </div>
    </div>
  );
};

export default Booking;
