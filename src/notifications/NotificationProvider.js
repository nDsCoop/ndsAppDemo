import React, { useReducer } from 'react'
import {ObjectID} from '../helpers/objectid';
import Notification from './Notification';


// export const NotificationContext = createContext();

const NotificationProvider = (props) => {
    const [state, dispatch] = useReducer((state, action) => {
        switch (action.type) {
            case "ADD_NOTIFICATION":
                return [...state,{...action.payload}];
            case "REMOVE_NOTIFICATION":
                return state.filter(el => el.id !== action.id);
            default:
                return state;
        }
      
    }, [
        // {
        //     id: new ObjectID().toString(),
        //     type: "success",
        //     message: "Hello nDsapp"
        // },
        // {
        //     id: new ObjectID().toString(),
        //     type: "err",
        //     message: "Hello nDsapp 1"
        // },
        // {
        //     id: new ObjectID().toString(),
        //     type: "warning",
        //     message: "Hello nDsapp 2"
        // },
        // {
        //     id: new ObjectID().toString(),
        //     type: "none",
        //     message: "Hello nDsapp 3"
        // },
    ]);

    const handleAddNotification = () => {
            // console.log(props.type , props.message)
            // console.log(props.state)
            if( props.type && props.message) {
                dispatch({
                    type: "ADD_NOTIFICATION",
                    payload: {
                        id: new ObjectID().toString(),
                        type: props.type,
                        message: props.message
                    }
                }, [])
            }
            
    }
<<<<<<< HEAD
    React.useEffect(() => {
        // console.log(props.state)
        if(props.state){
            handleAddNotification()
        }
    }, [props.state])
=======
React.useEffect(() => {
    // console.log(props.state)
    if(props.state){
        handleAddNotification()
    }
}, [props.state])
>>>>>>> baf3ed63bb22c8d11807d4c127297193e22183a8

  
   
    return (
        <>
        {/* <NotificationContext.Provider> */}
            <div className={"notification-wrapper"}>
                {state.map(note =>{
                    return <Notification dispatch={dispatch} key={note.id} {...note} />
                })}
            </div>
            {props.children}
        {/* </NotificationContext.Provider> */}
        </>
    )
};
export default NotificationProvider