import React, { useState, useEffect } from 'react'
import { BsAlarm } from 'react-icons/bs'

const Timer = (props) => {
    const [timer, setTimer] = useState('00:00:00')
    const [alertTimer, setAlertTimer] = useState(false)

    //console.log(props.submitValue)

    useEffect(() => {

        setTimeout(() => {
            let startTime = new Date(new Date().setHours(new Date().getHours() + 1));

            const startTimer = () => {
                const total = Date.parse(startTime) - Date.parse(new Date());
                const seconds = Math.floor((total / 1000) % 60);
                const minutes = Math.floor((total / 1000 / 60) % 60);
                const hours = Math.floor((total / 1000 / 60 / 60) % 24);

                if (total > 0) {

                    let newTime = (hours > 9 ? hours : '0' + hours) + ':' +
                        (minutes > 9 ? minutes : '0' + minutes) + ':' +
                        (seconds > 9 ? seconds : '0' + seconds)

                    setTimer(newTime)
                    //console.log(total)
                    
                    if (total <= 3520000) {
                        setAlertTimer(true)
                        props.onClick(true)
                    }
                } else if (total === 0) {
                    console.log("end")
                    setAlertTimer(false)
                    //props.onClick(true)
                }
            }

            setTimer('01:00:00');
            setInterval(() => {
                startTimer();
            }, 1000)
        }, 30000);

    }, [])

    return (
        <div className={`d-flex align-items-center ${alertTimer === true ? 'alertTime' : 'normalTime'}`}>
            <BsAlarm className='me-3 timer-icon mb-1' />
            <p className='timer'>{timer}</p>
        </div>
    )
}

export default Timer