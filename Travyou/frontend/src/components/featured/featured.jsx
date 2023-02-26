import './featured.css'
import React from 'react'
import useFetch from '../hooks/useFetch.js';

const Featured = () => {

    const {data,loading,error}=useFetch("/hotels/countbycity?cities=Mumbai,Dubai,Bengaluru");
     console.log(data);

      const images=[
"https://res.cloudinary.com/codercloud/image/upload/v1657273391/Hotels/f3_ymc1u8.webp",
"https://res.cloudinary.com/codercloud/image/upload/v1657273394/Hotels/f2_vglfm1.webp",
"https://res.cloudinary.com/codercloud/image/upload/v1657273396/Hotels/f1_z7ymas.webp"];

  return (
    <div className="featured">

        { loading ? "loading please wait":
            <>
            <div className="featureditem">
            <img src={images[0]} alt="" className="featuredimg" />
              <div className="featuredtitles">
                  <h2>Mumbai</h2>
                  <h2>{data[0]} Hotels</h2>
              </div>
          </div>

          <div className="featureditem">
          <img src={images[1]} alt="" className="featuredimg" />
              <div className="featuredtitles">
                  <h2>Dubai</h2>
                  <h2>{data[1]} Hotels</h2>
              </div>
          </div>

          <div className="featureditem">
          <img src={images[2]} alt="" className="featuredimg" />
              <div className="featuredtitles">
                  <h2>Bengaluru</h2>
                  <h2>{data[2]} Hotels</h2>
              </div>
          </div></>
        }

    </div>
  )
}

export default Featured
