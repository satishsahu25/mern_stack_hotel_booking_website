import { useEffect, useState } from 'react';
import { Routes,Route, BrowserRouter} from 'react-router-dom';
import Home from './pages/home/Home';
import Hotel from './pages/hotel/Hotel';
import List from './pages/list/List';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import { Navigate } from 'react-router-dom';


function App() {
  var user;
  if(localStorage.getItem("user")==="true"){
  user=true
  }else{
    user=false
  }


  return (
    <>
    <BrowserRouter>
    <Routes>

     {user && (<>
      <Route exact path='/hotels' element={<List/>}/>
     <Route exact path='/hotels/:id'  element={<Hotel/>}/>
     </>)}

     <Route exact path='/'  element={user ? <Home user={user}/>:<Navigate to="/register"/>}/>
      <Route exact path='/login'  element={!user ? <Login/>:<Navigate to="/"/>}/>
     <Route exact path='/register'  element={!user ? <Register/> :<Navigate to="/"/>}/>

    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
