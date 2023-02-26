import React from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../../components/header/header";
import Navbar from "../../components/navbar/navbar";
import "./list.css";
import format from "date-fns/format";
import { DateRange } from "react-date-range";
import Searchitems from "./searchitems/searchitems";
import useFetch from '../../components/hooks/useFetch'

const List = () => {
  const location = useLocation();
  // console.log(location)
  const [destination, setdestination] = useState(location.state.destination);
  const [dates, setdates] = useState(location.state.dates);
  const [opendate, setopendate] = useState(false);
  const [options, setoptions] = useState(location.state.options);
  const [min,setmin]=useState(undefined)
  const [max,setmax]=useState(undefined)

  if(destination===''){
    setdestination(location.state.destination);
  }
  // console.log(dates,destination,options);

  // const {data,loading,error,reFetch}=useFetch(`/hotels?city=${destination}`);

    const {data,loading,error,reFetch}=useFetch(`/hotels?city=${destination}&min=${min || 0}&max=${max || 999}`);

    // console.log(data);

    const handleclick=()=>{
      reFetch();
    }

  return (
    <>
      <Navbar />
      <Header type="list" />
      <div className="listcontainer">
        <div className="listwrapper">
          <div className="listsearch">
            <h1 className="listtitle">Search</h1>

            <div className="lsitem">
              <label>Destination</label>
              <input placeholder={destination} onChange={(e)=>setdestination(e.target.value)} type="text" name="" id="" />
            </div>

            <div className="lsitem">
              <label>Check-in Date</label>
              <span onClick={() => setopendate(!opendate)}>
                {`${format(
                dates[0].startDate,
                "MM/dd/yyyy"
              )} to ${format(dates[0].endDate, "MM/dd/yyyy")}`}</span>

              {opendate && (
                <DateRange
                  minDate={new Date()}
                  onChange={(item) => setdates([item.selection])}
                  ranges={dates}
                />
              )}
            </div>
            <div className="lsoptions">
              <div className="lsitem">
                <label htmlFor="">Options</label>
                <div className="lsoptionitem">
                  <span className="lsoptiontext">
                    Min price:<small>per night</small>
                  </span>
                  <input onChange={(e)=>setmin(e.target.value)} type="number" min={0} className="lsoptioninput" />
                </div>

                <div className="lsoptionitem">
                  <span className="lsoptiontext">
                    Max price:<small>per night</small>
                  </span>
                  <input onChange={(e)=>setmax(e.target.value) }type="number" className="lsoptioninput" />
                </div>

                <div className="lsoptionitem">
                  <span className="lsoptiontext">Adult:</span>
                  <input
                    type="number"
                    min={1}
                    className="lsoptioninput"
                    placeholder={options.adult}
                  />
                </div>

                <div className="lsoptionitem">
                  <span className="lsoptiontext">Children:</span>
                  <input
                    type="number"
                    min={0}
                    className="lsoptioninput"
                    placeholder={options.children}
                  />
                </div>

                <div className="lsoptionitem">
                  <span className="lsoptiontext">Room:</span>
                  <input
                    type="number"
                    min={1}
                    className="lsoptioninput"
                    placeholder={options.room}
                  />
                </div>
              </div>
            </div>
            <button onClick={handleclick}>Search</button>
          </div>

          <div className="listresult">
           {
            loading ? "Loading data" :
            <>
          {
            data.map((item)=>(
              <Searchitems
              item={item}
              key={item._id}
              dates={dates}
              destination={destination}
              options={options}
              />
            ))
          }
            </>

           }

          </div>
        </div>
      </div>
    </>
  );
};

export default List;
