import React, { useState } from "react";

import Banner from "./Banner";
import _ from 'lodash';

import birth1 from '../images/birth1.jpg';
import birth2 from '../images/birth2.jpg';
import birth3 from '../images/birth3.jpg';
import birth4 from '../images/birth4.jpg';
import birth5 from '../images/birth5.jpg';
import birth6 from '../images/birth6.jpg';
import birth7 from '../images/birth7.jpg';
import birth8 from '../images/birth8.jpg';

import { FiToggleRight } from 'react-icons/fi';
// import fetchJsonp from "fetch-jsonp";
import Hero from "./Hero";

import dataWishes from './data.js/dataListWishes'
import { IconButton, LinearProgress } from "@material-ui/core";
import { Link } from "react-router-dom";
import axios from "../apis/axios";


export const Wheel = (props) => {

    const [number, setNumber] = useState(null);
    const [user, setIDUser] = useState(null);
    const [ipClient, setIpClient] = useState(null);

    const [message, setMessage] = useState(null);

    // const GeoAPI = "https://ipapi.co/jsonp";1ee4f3b489024e8d826db9a66af54bcb
    const GeoAPI = "https://ipgeolocation.abstractapi.com/v1/?api_key=1ee4f3b489024e8d826db9a66af54bcb"


    const [verify, setVerify] = useState(false)

    const [error, setError] = useState(null)
    const [msgSym, setmsgSym] = useState(null)

    const [open, setOpen] = useState([])
    const [isSending, setIsSending] = useState(false)


    const [urlAvt, setUrlAvt] = useState(birth2)
	const births = [birth1, birth2, birth3, birth4, birth5, birth6, birth7, birth8]


    const Wishes = []
    Object.keys(dataWishes).forEach(function(key) {
        Wishes.push(dataWishes[key])
    });


    const readOutLoud = (message) => {
        
        const speech = new SpeechSynthesisUtterance();
        let voices = window.speechSynthesis.getVoices();
        speech.text = message;
        speech.volume = 1;
        speech.rate = 0.8;
        speech.pitch = 1;
        speech.lang = "en-GB";
        speech.voice = voices[4];
        speech.voiceURI = voices[4];
        window.speechSynthesis.speak(speech);
}

    const handleChangeAvt = () => {
        // e.preventDefault()
        let temp = Math.floor(Math.random()*births.length)
        setUrlAvt(births[temp])
		// console.log("chose video url in", temp)

    }


    const fetchIPclient = async () => {
        
            await fetch(`${GeoAPI}`)
            .then(function(response) {
                return response.json();
              })
              .then(json => {
                    setIpClient(json)
                    // console.log("fetch sucessfull is ", json)
              })
              .catch(function(ex) {
                console.log("parsing failed", ex);
              });


            const getVerifyFromSessionStore = window.sessionStorage.getItem("verify-birthday");
            console.log(getVerifyFromSessionStore)
            setVerify(getVerifyFromSessionStore || false)

    };

    const handleSendMess = async () => {
        setIsSending(true)
        console.log(message)
        console.log("here handleSendMess");
        const post = {
            message: message,
            timestamp: new Date(),
            }

        if(message && message.length > 3){
            await axios
            .post('/message', post)
            .then(function(response) {
                console.log(response.data.status);
                console.log(response.data.message);
                // also clear the form
                setMessage(null)
                setmsgSym("Your Message was Sent to nDs")
                // setSnackbarMsg(response.data.status);
                setIsSending(false);
                
            })
            .catch(function(error) {
                // console.log(error.response.status);
                if (error.response) {
                if (error.response.status === 429) {
                    alert("Message failed to send please try again")
                    // setSnackbarMsg("We accept limited feedback!");
                }
                }
                setIsSending(false);
            })
            } else {
                setmsgSym("Your Message must fill out")
                setIsSending(false);
            }
        
      
        
    }

    const sendPromise =  async (promise) => {

        console.log("here sendPromise");
        // const post = {
        //     promise: promise,
        //     timestamp: new Date() + " by " + `${ipClient.ip_address +  " at " + ipClient.region + " of " + ipClient.connection.autonomous_system_organization}`,
        //     }
      
        // await axios
        //     .post('/promise', post)
        //     .then(function(response) {
        //         console.log(response.data.status);
        //         console.log(response.data.message);
        //         // setSnackbarMsg(response.data.status);
            
        //     })
        //     .catch(function(error) {
        //         // console.log(error.response.status);
        //         if (error.response) {
        //         if (error.response.status === 429) {
        //             // setSnackbarMsg("We accept limited feedback!");
        //         }
        //         }
        //     });
    }


    const handleSubmit = () => {


        if(user === 'vothithanhthuy' && number === 'anhyeuem'){
            setVerify(true)
            readOutLoud("Happy Birthday to Thanh Thuỳ")
            window.sessionStorage.setItem("verify-birthday", true)        
        }
        else {
            setError('Not Valid with THANH THUY')
        }

    }



    // const openGift = (key, promise) => {
    //     console.log(key, promise)

       
    //     if(open.includes(key.toString())){

    //         let temps = _.difference(open, [key.toString()])
    //         // console.log(temps)
    //        setOpen(temps)

    //     }else{
    //         sendPromise(promise)

    //         let temps = _.uniq([...open, key.toString()]);
    //         // console.log(temps)
    //         setOpen(temps)

    //     }
        
    // }


    React.useEffect(() => {
        
        fetchIPclient();
        window.speechSynthesis.getVoices();

    }, [])


    
    return <>

    {
        !verify ? <Hero>
        <Banner title="Wheel" subtitle="Funny Birthday">
        

        {
            error ? <p className='err-greeting' style={{color: 'rgb(202, 60, 17)'}}>{error}</p> : null
        }



        <form>
            
            <span>
                <h4>Verification for Wheel</h4>
            </span>
                                
            <span>
                <label htmlFor="password">Your ID</label>
                <input 
                placeholder="ex: nameID" 
                required type="text" name="text"
                value = {user} 
                onChange = {({target})=>{
                    setIDUser(target.value)
                }} 
                id="password" ></input>
            </span>
                <h4></h4>
            <span>
                
                <label htmlFor="repassword">Password</label>
                <input
                placeholder="ex: nickname"
                required type="text" name="text"
                value = {number}
                onChange = {({target})=> {
                        setNumber(target.value) 
                }} 
                id="repassword" ></input>
            </span>
            <br/><br />
            <span>
                <button style={{marginTop: '1rem'}} type="button" onClick={() => handleSubmit()} className="login-btn">Turn in</button>
            </span>
        
    
        </form>

        
        </Banner>
    </Hero>
    
    :

    <div className="main-birth">
      <div className="switch-FW-BD">
            <Link to="/ndsweb/wheel/firework">
                <IconButton>
                    <FiToggleRight style={{color: 'rgb(36, 139, 10)'}} />
                </IconButton>
            </Link>
        </div>
      
        <div className="header-birth">
            <h2>THANH THUY</h2>
            <div className="avt-birth" onClick = {() => handleChangeAvt()}>
                <img src={urlAvt} alt="avt-birth" />
            </div>

            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Birthday_candles.jpg/1200px-Birthday_candles.jpg" alt="img-header" />


        </div>
  
                
        <div className="body-birth">
            <p>5 Feb - 5 Feb 2022..</p>
            <h3>Click on avatar to see the surprise</h3>
            <h3>LiveTime Anh and Em</h3>
            {/* <div className="card-gifts">

                {Wishes.map((wish, key) => {

                    return <div key={key} className="card-gift">
                    <div className="header-gift" onClick= {() => {openGift(key, wish.promise)}}>
                        <img src={wish.src} alt="img-gift" />
                    </div>
                    { (open.includes(key.toString())) ? <div className="body-gift">
                        <p>{wish.title}</p>
                    </div> : null }
                    
                </div>
                })}
               
            </div> */}

            <h4>Send Message to nDs</h4>

            <div className="form-sendMessBD">

                {msgSym ? <h4 style={{textTransform: 'uppercase', color: 'rgba(28, 158, 10, 0.9)'}}>{msgSym}</h4> : null}
                
                <span>
                    
                    <textarea
                    placeholder="Type Your Message" 
                    required type="text" name="text"
                    multiline="true"
                    value = {message}
                    onChange = {({target})=> {
                            setMessage(target.value) 
                    }} 
                    id="repassword" ></textarea>

                </span>
                {isSending ? (
                <LinearProgress
                style={{
                    width: "70%",
                    transform: "translateY(-12px)",
                    borderRadius: "1px",
                    display: "flex",
                    margin: "0 auto",
                }}
            />
          ) : null}
                <br/><br />
                <span>
                    <button type="button" onClick={() => handleSendMess()} className="login-btn">Send Message</button>
                </span>
            </div>


        </div>



        <div className="footer-birth">

            <h4>This is a birthday letter dedicated to Thanh Thuy</h4>
            
            <p>Production & Operation by nDs</p> 

            <p>Network safety and security</p>

        
        </div>

    </div>
    }


    </>
        
}
 

