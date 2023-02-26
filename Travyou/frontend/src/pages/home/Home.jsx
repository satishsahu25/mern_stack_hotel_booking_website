import React from 'react'
import Navbar from '../../components/navbar/navbar'
import Header from '../../components/header/header'
import Featured from '../../components/featured/featured'
import './home.css'
import Propertylist from '../../components/propertylist/propertylist'
import Featuredproperties from '../../components/featuredproperties/featuredproperties'
import Mailist from '../../components/mailist/mailist'
import Footer from '../../components/footer/footer'


const Home = ({user}) => {



  return (
    <>
        <Navbar user={user}/>
        <Header user={user}/>
        <div className="homecontainer">
        <h1>Featured</h1>
          <Featured/>
          <h1 >Browse by properties</h1>
          <Propertylist/>
          <h1 >Homes guest love</h1>
          <Featuredproperties/>
          <Mailist/>
          <Footer/>
        </div>

    </>
  )
}

export default Home
