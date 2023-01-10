import React from 'react'
import '../css/cards.css'

const MyCards = ({cardTitle, clickEvent}) => {
    return (
        <div className='card shadow-sm justify-items-center flex-column' onClick={clickEvent}>
            <div className='d-flex flex-column justify-items-center align-items-center px-3'>
                <p>{cardTitle}</p>
            </div>
        </div>
      )
}

export default MyCards