import React from 'react'
import Footer from '../components/footer/Footer.jsx'
import Title from '../components/title/Title.jsx'
import Baro from '../components/baro/Baro_listing.jsx'
import PSA from '../components/psa/PSA.jsx'


const Home = () => {

    const [displayPSA, setDisplayPSA] = React.useState(true)

  return (
    <div>
        {displayPSA && 
        <>
        <div className='psa_warning'>
            <PSA /> 
            <a href='#' onClick={() => setDisplayPSA(false)}>Hide PSA</a>
        </div>
        
        </>}




        <Title title={'Baro Items'} subTitle={'Listing of all baro items with recommendation.'} />
        <Baro />
        <Footer />
        
      
    </div>
  )
}

export default Home
