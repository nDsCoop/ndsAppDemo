import React, { useState } from 'react';


const Notification = (props) => {
    const [exit, setExit] = useState()
    const [width, setWidth] = useState(0)
    const [intervalID, setIntervalID] = useState(null);

    const handleStartTimer = () => {
        const id = setInterval(() => {
            setWidth((prev) => {
                if (prev < 100){
                    return prev + 0.5
                }
                clearInterval(id)
                return prev
            })
        }, 20)
        setIntervalID(id)
    }

    const handlePauseTimer = () => {
        clearInterval(intervalID)
    }

    const handleCloseNotification = () => {
        handlePauseTimer();
        setExit(true);
        setTimeout(() => {
            // props.clearNotification(`${props.id}`)
            // console.log(`${props.id}`)
            console.log("remove: " , props.id)
            props.dispatch({
                type: "REMOVE_NOTIFICATION",
                id: props.id
            })
        }, 4000)

    };

    React.useEffect(() => {
        if(width === 100) {
            handleCloseNotification();
        }
    }, [width])
    React.useEffect(() => {
        handleStartTimer()
    }, [])


    return (
        <div onMouseEnter={handlePauseTimer} onMouseLeave={handleStartTimer}
         className={`notification-item ${props.type} ${exit ? "exit" : ""}`}>
            <p>{props.message}</p>
            <div className={"bar"} style = {{width: `${width}%`}}></div>
        </div>
    )
};
export default Notification;