import React from "react";
import "./propertylist.css";
import useFetch from "../hooks/useFetch";

const Propertylist = () => {

  const {data,loading}=useFetch("/hotels/countbytype");
  console.log(data);

  const images = [
    "https://res.cloudinary.com/codercloud/image/upload/v1657083707/Hotels/h12_ab5uoz.webp",
    "https://res.cloudinary.com/codercloud/image/upload/v1657273900/Hotels/apart_m6znsv.jpg",
    "https://res.cloudinary.com/codercloud/image/upload/v1657273884/Hotels/resorts_m79bhm.jpg",
    "https://res.cloudinary.com/codercloud/image/upload/v1657273885/Hotels/villas_fv6t01.jpg",
    "https://res.cloudinary.com/codercloud/image/upload/v1657273878/Hotels/cabin_wku9jk.jpg",
  ];
  return (
    <div className="plist">
      {loading ? (
        "loading"
      ) :
        <>
          {data.map((single, index) => (
            <div className="plistitem" key={index}>
              <img src={images[index]} alt="" className="plistimg" />
              <div className="plisttitles">
                <h1>{single.type}</h1>
                <h2>
                  {single.count} {single.type}
                </h2>
              </div>
            </div>
          ))}
        </>
    }
    </div>
  );
};

export default Propertylist;
