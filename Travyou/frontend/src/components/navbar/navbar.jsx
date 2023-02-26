import { Link, useNavigate } from 'react-router-dom'
import './navbar.css'
import logo from './logo.png'

const Navbar = ({user}) => {
  const navigate=useNavigate();

  const logoutuser=()=>{
    localStorage.clear();
    navigate("/");
  }

  return (
    <>

    <div className='navbar'>
        <div className="navcontainer">
            <Link to="/" style={{color:"inherit",textDecoration:"none"}}>
              <img src={logo} alt="logo" className='logo'/>
            </Link>
           {user ?  <button className="navbutton" onClick={logoutuser}>LogOut</button>:
              <div className="navitems">
                <button className="navbutton">Register</button>
                <button className="navbutton">Login</button>
            </div>
            }
        </div>
    </div>

    </>
  )
}

export default Navbar
