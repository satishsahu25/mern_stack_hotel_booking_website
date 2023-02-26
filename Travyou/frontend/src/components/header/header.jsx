import React, { useContext, useEffect } from "react";
import "./header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBed,
  faCalendarDays,
  faCar,
  faPerson,
  faPlane,
  faTaxi,
} from "@fortawesome/free-solid-svg-icons";
import { DateRange } from "react-date-range";
import { useState } from "react";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";

const Header = ({ type ,user}) => {
  const [opendate, setopendate] = useState(false);
  const [destination, setdestination] = useState("");

  const [dates, setdates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  ///adults and children
  const [openoptions, setopenoptions] = useState(false);
  const [options, setoptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });

  const navigate = useNavigate();
  const { dispatch } = useContext(SearchContext);

  //fxn
  const handleoption = (name, operation) => {
    setoptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };
  const handlesearch = () => {
    if (destination) {
      dispatch({ type: "NEWSEARCH", payload: { destination, dates, options } });
      navigate("/hotels", { state: { destination, dates, options } });
    }else{
      alert("fill the destination")
    }
  };

  return (
    <div className="header">
      <div
        className={
          type === "list" ? "headercontainer listmode" : "headercontainer"
        }
      >
        <div className="headerlist">
          <div className="headerlistitem active">
            <FontAwesomeIcon icon={faBed} />
            <span>Stays</span>
          </div>

          <div className="headerlistitem">
            <FontAwesomeIcon icon={faPlane} />
            <span>Flights</span>
          </div>

          <div className="headerlistitem">
           <FontAwesomeIcon icon={faCar} />
            <span>Car rentals</span>
          </div>

          <div className="headerlistitem">
            <FontAwesomeIcon icon={faTaxi} />
            <span>Airport taxis</span>
          </div>

          <div className="headerlistitem">
            <FontAwesomeIcon icon={faBed} />
            <span>Attractions</span>
          </div>
        </div>
        {type !== "list" && (
          <>
            <h1 className="headertitle">Deals from your favorite booking sites</h1>
            <p className="headerdesc">
              Get rewarded for your travels unlock instant savings of 10% or more
              with a free Travyou Booking
            </p>
            {!user&&<button className="headerbtn">Sign in / Register</button>}
            <div className="headersearch">
              <div className="headersearchitem">
                <FontAwesomeIcon icon={faBed} className="headericon" />
                <input
                  type="text"
                  className="headersearchinput"
                  placeholder="where are you going"
                  onChange={(e) => setdestination(e.target.value)}
                />
              </div>

              <div className="headersearchitem">
                <FontAwesomeIcon icon={faCalendarDays} className="headericon" />
                <span
                  className="headersearchtext"
                  minDate={new Date()}
                  onClick={() => setopendate(!opendate)}
                >{`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(
                  dates[0].endDate,
                  "MM/dd/yyyy"
                )}`}</span>
                {opendate && (
                  <DateRange
                    editableDateInputs={true}
                    onChange={(item) => setdates([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={dates}
                    className="date"
                  />
                )}
              </div>

              <div className="headersearchitem">
                <FontAwesomeIcon icon={faPerson} className="headericon" />
                <div
                  onClick={() => setopenoptions(!openoptions)}
                  className="headersearchtext"
                >{`${options.adult} adult : ${options.children} children : ${options.room} room`}</div>
                {openoptions && (
                  <div className="options">
                    <div className="optionitem">
                      <span className="optiontext">Adult</span>
                      <div className="optioncounter">
                        <button
                          disabled={options.adult <= 1}
                          className="optioncounterbtn"
                          onClick={() => handleoption("adult", "d")}
                        >
                          -
                        </button>
                        <span className="optioncounternumber">
                          {options.adult}
                        </span>
                        <button
                          className="optioncounterbtn"
                          onClick={() => handleoption("adult", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="optionitem">
                      <span className="optiontext">Children</span>
                      <div className="optioncounter">
                        <button
                          disabled={options.children <= 0}
                          className="optioncounterbtn"
                          onClick={() => handleoption("children", "d")}
                        >
                          -
                        </button>
                        <span className="optioncounternumber">
                          {options.children}
                        </span>
                        <button
                          className="optioncounterbtn"
                          onClick={() => handleoption("children", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="optionitem">
                      <span className="optiontext">Room</span>
                      <div className="optioncounter">
                        <button
                          disabled={options.room <= 1}
                          className="optioncounterbtn"
                          onClick={() => handleoption("room", "d")}
                        >
                          -
                        </button>
                        <span className="optioncounternumber">
                          {options.room}
                        </span>
                        <button
                          className="optioncounterbtn"
                          onClick={() => handleoption("room", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="headersearchitem">
                <button className="headerbtn" onClick={handlesearch}>
                  Search
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
