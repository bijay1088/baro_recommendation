import React from 'react'
import Baro from '../components/baro/Baro_editing.jsx'
import Title from '../components/title/Title.jsx'
import Footer from '../components/footer/Footer.jsx'

const Baro_editor = () => {
  return (
    <div className=''>
        <Title title={'Baro Recommendation Editor'} subTitle={'This is a editor that you can use to edit the json file directly and then download it later.'} />
        <Baro />
        <Footer />
      
    </div>
  )
}

export default Baro_editor
