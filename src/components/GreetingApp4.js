import React, { useState } from "react";

import Banner from "./Banner";
// import _ from 'lodash';
import {encrypt, encrypt2} from '../helpers/en_deCrypt';
import fetchJsonp from "fetch-jsonp";
import { Redirect } from "react-router-dom";
import Hero from "./Hero";
import { Link } from "@material-ui/core";



export const GreetingApp4 = (props) => {

    
    const [url, setUrl] = useState();
    const [me, setMe] = useState(null);
    //const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [email, setEmail] = useState(null);
    const [passWord, setPassWord] = useState(null);
    const [ID, setID] = useState(null);
    const [ipClient, setIpClient] = useState(null);
    const [isContinue, setIsContinue] = useState(null);
    //const [isShowGreeting, setIsShowGreeting] = useState(true);
    const [isHaveAccount, setIsHaveAccount] = useState(false);
    const [user, setUser] = useState()
    const GeoAPI = "https://ipapi.co/jsonp";


    const createQuicklyNewAcc = () => {
        //create Random info account
        
        const chars = ["ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz","0123456789", "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"];
        const randPassWord = [5,3,2].map(function(len, i) { return Array(len).fill(chars[i]).map(function(x) { return x[Math.floor(Math.random() * x.length)] }).join('') }).concat().join('').split('').sort(function(){return 0.5-Math.random()}).join('');
        const randEmail = (randPassWord.slice(0,6) + '@gmail.com').toString()
        const randName = 'nDs' + randPassWord.slice(0,4)

        const hashPassword = encrypt2(encrypt(randPassWord));

        setEmail(randEmail);
        setPassWord(randPassWord)

        console.log(randEmail)
        console.log(randPassWord)
        setUser({
            email: randEmail,
            password: hashPassword,
            name: randName,
            ipClient: ipClient,
            birthday: '',
            country: '',
            phone: '',
            ID: ID
        })
        
        setIsHaveAccount(true);
        
    }
    const loginWithRandAccountAndManage = () => {
        // console.log(user)
        const store = props.store;
        // setIsShowGreeting(false)
            store.register(user).then((_) => {
                 // now login this user
                    store.login(user.email, user.password).then((_) => { 
                        // console.log("login redirectToManage")
                        setIsContinue(2)
                }).catch((err) => {
                    console.log(err);
                   
                    });
            }).catch((err) => {
                console.log(err);
                setError(err)
            });
           
        
    }
    const loginWithRandAccountAndContinue = () => {
        // console.log(user)
        const store = props.store;
        // setIsShowGreeting(false)
            store.register(user).then((_) => {
                 // now login this user
                    store.login(user.email, user.password).then((_) => { 
                        // console.log("login redirectToRetrille")
                        setIsContinue(1)
                }).catch((err) => {
                    console.log(err);
                   
                    });
            }).catch((err) => {
                console.log(err);
                setError(err)
            });
      
        
    }


    const fetchIPclient = () => {
        try{
            fetchJsonp(`${GeoAPI}`)
            .then(function(response) {
                return response.json();
              })
              .then(json => {
                    setIpClient(json)
              })
              .catch(function(ex) {
                console.log("parsing failed", ex);
              });
        }
        catch (err){ console.log(err) }

    };


    const generateId = (len) => {
        var arr = new Uint8Array((len || 40) / 2)
        window.crypto.getRandomValues(arr)
        return Array.from(arr).join('')
    }

    const handleCreateR = () => {
       
        const userId = generateId(12).slice(-12);
        setID(userId)
        // console.log('ID of user random: ', userId);
    }



    React.useEffect(() => {
        
        const store = props.store;
        fetchIPclient()
        handleCreateR()
        let url = window.location.pathname;

        console.log(url)

        if(url === '/ndsappbeta/weather/greeting/newuser&account'){
            setUrl('ndsappbeta/weather/newaccount#')
        } else {
            setUrl('page4/newaccount#')
        }
        const me = store.getCurrentUser();

        if(me !== null){
            setMe(me)
        }

    }, [])

    if(isContinue === 1) {
        // window.location.replace('http://localhost:3000/page4/quickaccount/login#'+{email}&{ID})
        return (<Redirect to={`/${url}${email}&${ID}+${ipClient.country}+${ipClient.city}+${ipClient.ip}`} />)
    }
    if(isContinue === 2) {
        // window.location.replace('http://localhost:3000/page3/quickaccount/login#'+{email}&{ID})
        return (<Redirect to={`/ndsappbeta/chat/login/newaccount#${email}&${ID}+${ipClient.country}+${ipClient.city}+${ipClient.ip}`} />)
    }

    const render = () => (
        <>
            {
                error ? <p className='err-greeting' style={{color: 'rgb(202, 60, 17)'}}>{error}</p> : null
            }
            {
                (!me) ? <>
                    {
                        !isHaveAccount ? <>
                            <Link onClick={() => setIsContinue(2)} to className="btn-primary">
                                Back to Chat
                            </Link>
                            <div></div>
                            <a to className="btn-primary" onClick={createQuicklyNewAcc}>
                                Quickly a New Account 
                            </a>
                        </>
                        :
                        <>
                            <h5>Info Account</h5>
                            <span style={{whiteSpace: 'nowrap'}}>Email: <strong>{email}</strong></span><br /> 
                            <span style={{whiteSpace: 'nowrap'}}>Password: <strong>{passWord}</strong></span>
                            <br />
                            <br />
                            <a to className="btn-primary" onClick={loginWithRandAccountAndContinue}>
                                Login now
                            </a>
                            <br /><br />
                            <a to className="btn-primary" onClick={loginWithRandAccountAndManage}>
                                account manager
                            </a>
                        </>
                    }
                </>
                :
                <>
                    <h4>Hi, <strong>{email}</strong> | Login Successfull</h4>
                
                </>
                }

        </>
    )
            
    if(url === 'page4/newaccount#'){
        return (
            <Hero>
                    <Banner title="ReTrille" subtitle={isHaveAccount ? "Automatic unsafe accounts, carefully and verify your account" : "You need to enter your account to access ReTrille"}>
                        
                        {render()}
                    
                    </Banner>
            </Hero>
        
        )
    } else {
        return (
            <Hero>
                    <Banner title="WeatherApp" subtitle={isHaveAccount ? "Automatic unsafe accounts, carefully and verify your account" : "You need to enter your account to access WeatherApp"}>
                        
                        {render()}
                    
                    </Banner>
            </Hero>
        
        )
    }
    
}
 

