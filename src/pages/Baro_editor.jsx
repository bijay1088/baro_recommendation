import React from 'react'
import Baro from '../components/baro/Baro_editing.jsx'
import Title from '../components/title/Title.jsx'

const Baro_editor = () => {
  return (
    <div className=''>
        <Title title={'Baro Recommendation Editor'} subTitle={'This is a editor that you can use to edit the json file directly and then download it later.The editor might be hard to look on mobile tho.'} />
        <Baro />
      
    </div>
  )
}

export default Baro_editor
