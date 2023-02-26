import React from 'react'
import './footer.css'

const Footer = () => {
  return (
    <div className="footer">
        <div className="flists">
           <div className="first">
           <ul className="flist">
                <li className="flistitem">Countries</li>
                <li className="flistitem">Regions</li>
                <li className="flistitem">Cities</li>
                <li className="flistitem">Districts</li>
                <li className="flistitem">Airports</li>
                <li className="flistitem">Hotels</li>
            </ul>
           </div>

            <div className="second">
            <ul className="flist">
                <li className="flistitem">Companies</li>
                <li className="flistitem">Jobs</li>
                <li className="flistitem">Press</li>
                <li className="flistitem">Investors relations</li>
                <li className="flistitem">Partnerships</li>
                <li className="flistitem">Location</li>
            </ul>

            <ul className="flist">
                <li className="flistitem">Countries</li>
                <li className="flistitem">Regions</li>
                <li className="flistitem">Cities</li>
                <li className="flistitem">Districts</li>
                <li className="flistitem">Airports</li>
                <li className="flistitem">Hotels</li>
            </ul>
            </div>

        </div>
        <div className="ftext">Copyright @ 2002 TravYou</div>
    </div>
  )
}

export default Footer
