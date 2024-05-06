import React from 'react'
import './PSA.css'

const PSA = () => {

  return (
    <div>
        <div className='psa'>
            <h1>Warning. This is a personal recommendation.</h1>
            <p>Just because I have said no, that does not mean you should avoid it completly. Grab it if you like. This is what game is about. </p>

            <div className='psa_category'>
                <button className='btn btn-success' disabled>Must Have</button> 
                <p className='text-success'>These are items that you should not miss. Grab it.</p>
                <button className='btn btn-primary' disabled>Good To Have</button>
                <p className='text-primary' >These are items that you should consider getting. I have more information on description on why. </p>
                <button className='btn btn-secondary' disabled>If You Want</button>
                <p className='text-secondary'>These are items that you should get if you want. These are items that have unique usage or have other normal options in game already. </p>
                <button className='btn btn-warning' disabled>Farmable</button>
                <p className='text-warning'>These are items that you can farm in game. You can get it later. </p>
                <button className='btn btn-danger' disabled>No</button>
                <p className='text-danger'>These are items that you should avoid. These are items that are not worth getting. </p>


            </div>
        </div>
      
    </div>
  )
}

export default PSA
