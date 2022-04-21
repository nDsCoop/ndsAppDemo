import { OrderedMap } from 'immutable';
import _ from 'lodash';
import Service from './service';
import Realtime from './realtime';
// import moment from "moment";
import translate from 'translate';
import {ObjectID} from './helpers/objectid';
import bcrypt from 'bcryptjs';
import axios from "../src/apis/axios";

export default class Store {
    constructor(appComponent){
        this.app = appComponent;
        this.service = new Service();
        this.messages = new OrderedMap();
        this.channels = new OrderedMap();
        this.messageDefaults = new OrderedMap();
        this.messageVoices = new OrderedMap();
        this.listTypeMessageDefaults = new OrderedMap();

        this.activeChannelId = null;
        this.user = this.getUserFromLocalStorage();
        this.token = this.getTokenFromLocalStorage();
        this.users = new OrderedMap();
        this.realtime = new Realtime(this);
        this.fetchUserChannels();
        this.search = {
            users: new OrderedMap(),
        }

        this.markList = new OrderedMap();
        this.allMarkOther = new OrderedMap();


    }

                
    //function edit mark
    editMark(data){

        // console.log(data)
        const userToken = this.getUserTokenId();       
        // console.log(data)
       
            return new Promise((resolve, reject) => {

                // return resolve("successFull")

                if(userToken){
                    const options = {
                        headers: {
                            authorization: userToken,
                        }
                    }
                //send request 'api/editmarks' to server
                this.service.post('api/editmarks', data, options).then((res) => {

                    // console.log("this mark edited in store return callback: ", res.data);
                    //proccess new mark to add cache store for user cant see it
                        // window.sessionStorage.removeItem('marksListOfMe')
                        // this.processlistMarkMe(res.data)
                    //after seend change to server to every one cant see new mark if it is public
                    window.sessionStorage.removeItem('marksListOfMe')
                    return resolve("Mark be done edit")
                    

                }).catch((err) => {
                    const message = _.get(err, 'response.data.error.message', 'An Error Occured!');
                    return reject(message);
            });
            // this.update()

            }else{
                return reject("Need login an Account to Active miMarks")
            }
        })
    }

    //get all mark list from store
    getAllMarkOther(){

        return this.allMarkOther.valueSeq()

    }

    //get all mark list of other user from db server
    fetchAllMarkOther(){
        const userToken =this.getUserTokenId();
        const configReTrille = window.sessionStorage.getItem("allMarkOther");
        let config = null
        try {
            config = JSON.parse(configReTrille);
        }catch (err) {console.log(err)}

        //get list mark from session store
        if(config && userToken){
          
            // console.log('Marks in cache store', config)
            _.each(config, (item) => {
                const id = _.get(item, '_id', '')
                this.allMarkOther = this.allMarkOther.set(id, item)
                this.update()
            })
            // return callback( null, 'successFetchData');

        }else{
            if(userToken){
                const options = {
                    headers: {
                        authorization: userToken,
                    }
                }
                    //send request 'api/marks/allother' to server
                    this.service.get(`api/marks/allother`, options).then((res) => {
    
                        // console.log("data marks form server",)
                        //create new mark array of other user
                       const marks = res.data
                        _.each(marks, (mark) => {
                            // this.messageDefaults.push(messagevoice)
                            const loggedUser = this.getCurrentUser();
                            const id = _.get(mark, '_id', '')
                            if( _.get(loggedUser, '_id') !== _.get(mark, 'userId')){
                                console.log(id)
                            this.allMarkOther = this.allMarkOther.set(id, mark)
                            }
                            
                        })
            
                    }).catch((err) => {
                        console.log(err);
                    })
               
            }
            this.update()
        }
        
    }

    processData = async (item) => {
        try{
            // console.log(item.country)
            await fetch(`https://disease.sh/v3/covid-19/countries/${item.country}`)
            .then(function(response) {
                return response.json();
            })
            .then(data => {
                item.covid19 = {
                    continent: data.continent,
                    flag: data.countryInfo.flag,
                    iso2: data.countryInfo.iso2,
                    caseCvid19: data.cases,
                    recoveredCvid19: data.recovered,
                    deathsCvid19: data.deaths,
                    recoveredPerOneMillionCvid19: data.recoveredPerOneMillion
                }
                // console.log("mark after render 0 ", item)
                const id = _.get(item, '_id', '')
                this.markList = this.markList.set(id, item)
              
                
            })
            this.update()
        }catch (err) {console.log(err)}
       
       
    }

    //get info current from store and get from api open weatherapi
    processlistMarkMe = async (item) => {
       
            try{
              
                // console.log(item.lat, item.lng)
                await fetch(`https://api.weatherapi.com/v1/forecast.json?key=510cbd14438a4e33bcc15040202911&q=${(item.lat).toFixed(2)},${(item.lng).toFixed(2)}&day=4`)
                    .then(function(response) {
                        return response.json();
                    })
                    .then(data => {


                                item.name = data.location.name
                                item.country = data.location.country
                                item.localtime = data.location.localtime
                                item.current = {
                                    cloud: data.current.cloud,
                                    humidity: data.current.humidity,
                                    feelslike_c: data.current.feelslike_c,
                                    temp_c: data.current.temp_c,
                                    gust_kph: data.current.gust_kph,
                                    is_day: data.current.is_day,
                                    last_updated: data.current.last_updated,
                                    precip_mm: data.current.precip_mm,
                                    pressure_mb: data.current.pressure_mb,
                                    uv: data.current.uv,
                                    vis_km: data.current.vis_km,
                                    wind_degree: data.current.wind_degree,
                                    wind_dir: data.current.wind_dir,
                                    wind_kph: data.current.wind_kph,
                                    descript: data.current.condition.text,
                                    icon: data.current.condition.icon
            
                                }
                                item.hour = data.forecast.forecastday[0].hour
                                item.astro = {
                                    moon_illumination: data.forecast.forecastday[0].astro.moon_illumination,
                                    moon_phase: data.forecast.forecastday[0].astro.moon_phase,
                                    moonrise: data.forecast.forecastday[0].astro.moonrise,
                                    moonset: data.forecast.forecastday[0].astro.moonset,
                                    sunrise: data.forecast.forecastday[0].astro.sunrise,
                                    sunset: data.forecast.forecastday[0].astro.sunset,
                                }
                                //get info and process data before save new info to store
                                this.processData(item)

                            })
                           
                    .catch(function(ex) {
                    console.log("parsing failed", ex);
                    });
               
            }
            catch (err){ 
                console.log(err) 
            }
    
    }

    //get list mark of user
    getMarksOfMe(){
        
        return this.markList.valueSeq();
    }


    //get all mark list of current user
    fetchMarksListOfMe(callback = () => {}){
        const userToken =this.getUserTokenId();
        const configReTrille = window.sessionStorage.getItem("marksListOfMe");
        let config = null
        try {
            config = JSON.parse(configReTrille);
        }catch (err) {console.log(err)}

        if(config && userToken){
          
            // console.log('Marks in cache store', config)
            _.each(config, (item) => {
                const id = _.get(item, '_id', '')
                this.markList = this.markList.set(id, item)
                this.update()
            })
            return callback( null, 'successFetchData');
        }else{
            // const userToken =this.getUserTokenId();
            if(userToken){
            const options = {
                headers: {
                    authorization: userToken,
                }
            }
            this.service.get(`api/marks/me`, options).then((res) => {
                const markList = res.data;
                // console.log("marks from db: ", res.data);
                let temp = markList.length
                _.each(markList, (item) => {
                    
                    this.processlistMarkMe(item)
                    temp -= 1;
                    if(temp === 0){
                        return callback( null, 'successFetchData');
                    }
                })
                
               

            }).catch((err) => {

                console.log("An error fetch messagevoices", err);
            })
        }
        }
        
        this.update()
        
    }

   
    // add mark to db
    addNewMark = (data) => {
        const userToken = this.getUserTokenId();       
        // console.log(data)
       
            return new Promise((resolve, reject) => {

                // return resolve("successFull")
                if(userToken){
                    const options = {
                        headers: {
                            authorization: userToken,
                        }
                    }

                //send request add new mark
                this.service.post('api/marks', data, options).then((res) => {

                    // console.log("newMark Created ", res.data);
                    //proccess new mark to add cache store for user cant see it
                        window.sessionStorage.removeItem('marksListOfMe')
                        this.processlistMarkMe(res.data)
                    //after seend change to server to every one cant see new mark if it is public
                  
                    return resolve("The message has been added successful")
                    

                }).catch((err) => {
                    const message = _.get(err, 'response.data.error.message', 'An Error Occured!');
                    return reject(message);
            });
            // this.update()

            }else{
                return reject("Need login an Account to Active miMarks")
            }
        })
    }

    // translate data with request language
    translateBody = (data) => {
        let msgLang = null;
        //if add langmic need change here to proccess info
        let micLang = null;
        const configReTrille = window.sessionStorage.getItem("configReTrille");
        try {
            let config = JSON.parse(configReTrille);
            if(config){
                msgLang = config.msgLang;
                micLang = config.micLang
            }
        }
        catch(err) {
            console.log(err);
        }
        // console.log(msgLang, micLang)
            //we can use this language to translate
        if(data){
            return new Promise((resolve, reject) => {
                if(msgLang !== 'en'){
                    console.log("translated")
                    translate.engine = 'google';
                    translate.key = 'AIzaSyCHUCmpR7cT_yDFHC98CZJy2LTms-IwDlM';
                    translate(data, { from: 'en', to: `${msgLang}` }).then(text => {
                        // console.log(text)
                        return text ? resolve(text) : reject("error translate")
                    })
                }else{
                    console.log("nontranslate")
                    return data ? resolve(data) : reject("error translate")
                }
               
            })
            
        }
       
    }

    proccessTranscript (transcript, callback = () =>{}){
    
        // console.log(transcript);
        const messageList = this.messageDefaults.valueSeq().toArray();
        // console.log(messageList);
        let messageList2 = [];
        let messageList3 = [];
       
        messageList.forEach(function(item) {
            // console.log("here", typeof(`${item.type}`), typeof(`${transcript}`) )
            if(`${transcript}`.includes(`${item.type}`)){
                // console.log("here")
                console.log("here", `${item.type}`, `${transcript}` )
                messageList2.push(item);
            }
          })

        messageList2.forEach(function(item) {
            if(`${transcript}`.includes(`${item.keyWord}`)){
                console.log("here")
                messageList3.push(item);
            }
        })
        if(messageList3.length){

                const replyObj = messageList3[Math.floor(Math.random()*messageList3.length)];
                console.log(replyObj)
        
            return callback(null, replyObj);
        }else{
            return callback({message:"Topic or Keyword does not exist yet, please add the one you want"}, null)
        }
        
    }

    //add new Voice message
    addMessageVoice(transcript) {
        if(transcript){

            // let lang = null;
            // const configReTrille = window.sessionStorage.getItem("configReTrille");
            // try {
            //     let config = JSON.parse(configReTrille);
            //     if(config){
            //         lang = config.msgLang;
            //     }
            // }
            // catch(err) {
            //     console.log(err);
            // }
            // console.log(transcript)
           
            
           
            return new Promise((resolve, reject) => {
                const userToken = this.getUserTokenId();
                if(userToken){
                    //find compare message 
                    this.proccessTranscript(transcript, (err, result) => {
                        if(err){
                            console.log('err')
                            //call translate function
                            this.translateBody(transcript).then((res) => {

                                const currentUser =this.getCurrentUser();
                                const messageId = new ObjectID().toString();
                                const message = {
                                    _id: messageId,
                                    body : res,
                                    userId: _.get(currentUser, '_id'),
                                    msgOriginId: null,
                                    showAuthor: null,
                                    created: new Date(),
                                    me: true,
                                    user: {
                                        name: 'You',
                                        nameOri: _.get(currentUser, 'name'),
                                        avatar: _.get(currentUser, 'avatar'),
                                        ID: _.get(currentUser, 'ID'),
                                    }
                                
                                }
                                this.messageVoices = this.messageVoices.set(messageId, message);
                                this.update()
                            }).catch((err) => {
        
                                console.log("An error translating");
                            })
                            
                            return reject(err.message); 
                        }
                        //call translate function
                        this.translateBody(transcript).then((res) => {

                            const currentUser =this.getCurrentUser();
                            const messageId = new ObjectID().toString();
                            const message = {
                                _id: messageId,
                                body : res,
                                userId: _.get(currentUser, '_id'),
                                msgOriginId: null,
                                showAuthor: null,
                                created: new Date(),
                                me: true,
                                user: {
                                    name: 'You',
                                    nameOri: _.get(currentUser, 'name'),
                                    avatar: _.get(currentUser, 'avatar'),
                                    ID: _.get(currentUser, 'ID'),
                                }
                            
                            }
                            // console.log(message)
                            this.messageVoices = this.messageVoices.set(messageId, message);
                        
                        }).catch((err) => {

                            console.log("An error translating");
                        })
                        setTimeout(() => {
                            //call translate function
                            this.translateBody(result.txtMessage).then((res) => {
                                const messageIdReply = new ObjectID().toString();
                                const reply = {
                                    _id: messageIdReply,
                                    body : res,
                                    userId: null,
                                    msgOriginId: result._id,
                                    showAuthor: result.showAuthor,
                                    created: new Date(),
                                    me: false,
                                    user: {
                                        name: 'reTrille',
                                        nameOri: result.user.name,
                                        avatar: result.user.avatar,
                                        ID: result.user.ID,
                                    }
                                }
        
                            
                                this.messageVoices = this.messageVoices.set(messageIdReply, reply);
                                this.update()
                            }).catch((err) => {
        
                                console.log("An error translating");
                            })
                            
                        }, 68)
                        console.log('result', result.txtMessage)
                        return resolve(result.txtMessage);
                        
                    })
                }else{
                    return reject("Need login an Account to Active Retrille")
                }
            })
           
        
        }else{
            console.log("An Error Occured")
        }
    }

    //get list type voice from store
    getTypeVoices(){

        return this.listTypeMessageDefaults.valueSeq();
    }

     //get list message voice from store
    getMessageVoices(){

        // let messages = new OrderedMap();
        // console.log("get messageVoice", this.messageVoices.valueSeq().toArray())
        this.messageVoices = this.messageVoices.sort((a, b) => b.created - a.created);

        return this.messageVoices.valueSeq();
    }

    //fecth type voice from 
    fetchTypeVoices() {
       
        const userToken =this.getUserTokenId();
        if(userToken){
            const options = {
                headers: {
                    authorization: userToken,
                }
            }
                //send request 'api/messagevoices/types' to server
                this.service.get(`api/messagevoices/types`, options).then((res) => {
                
                    const types = res.data;
                    // console.log(types)
                    types.map((data, key) => {
                        // console.log(key,data)
                        this.listTypeMessageDefaults = this.listTypeMessageDefaults.set(key, data)
                    })

                    return
 
        
                }).catch((err) => {
                    console.log(err);
                })
           
        }
        this.update()
    }
    //fecth messagevoice from db 
    fetchMessageVoice() {
        const userToken =this.getUserTokenId();
        if(userToken){
            const options = {
                headers: {
                    authorization: userToken,
                }
            }
            //send request 'api/messagevoices/all' to server
            this.service.get(`api/messagevoices/all`, options).then((res) => {
                const messagevoices = res.data;
                // console.log("message form db: ", messagevoices);
                _.each(messagevoices, (messagevoice) => {
                    // this.messageDefaults.push(messagevoice)
                    const id = _.get(messagevoice, '_id', '')
                    // console.log(id)
                    this.messageDefaults = this.messageDefaults.set(id, messagevoice)
                })
                // _.each(channels, (c) => {
                //     this.realtime.onAddChannel(c);
                // });

                // const firstChannelId = _.get(channels, '[0]._id', null);
                // this.fetchChannelMessages(firstChannelId);
            }).catch((err) => {

                console.log("An error fetch messagevoices", err);
            })
        }
        this.update()
    }
    //add new message voice default into db
    addMessageVoiceDefault(data){
        const userToken = this.getUserTokenId();
       
        // console.log(data)
                return new Promise((resolve, reject) => {
                    if(userToken){
                        const options = {
                            headers: {
                                authorization: userToken,
                            }
                        }
                  
                    //we need proccessing translate date to english before sent to server
                    // {[...Array(product.countInStock).keys()].map( x =>
                    //     <option key={x + 1} value={x + 1}>{x + 1}</option>
                    //     )}
                    //send request 'api/messagevoices' to server
                    this.service.post('api/messagevoices', data, options).then((res) => {

                        // console.log("Account Created ", res.data);

                        return resolve("The message has been added successful")

                    }).catch((err) => {
                        const message = _.get(err, 'response.data.error.message', 'An Error Occured!');
                        return reject(message);
                });

            }else{
                return reject("Need login an Account to Active ReTrille")
            }
        })

    }

    //function verify user
    sendVerifyCommunication(info){
        const userToken = this.getUserTokenId();
        const emailObj = {email: info.email}
        if(userToken){

            return new Promise((resolve, reject) => {
                //send request 'api/users/checkemail' to server
                this.service.post('api/users/checkemail', emailObj).then((res) =>{
                    
                    info.token = res.data;
                    _.unset(info.token, 'user'); 
                    info.user = res.data.user;
                    // console.log("user is: ", info)
                    const post = {
                        info: info,
                        timestamp: new Date(),
                        }
                        //send request to email of user
                    axios
                        .post('/ndsapi/require/verifycommunication', post)
                        .then(function(response) {
                          // console.log(response.data.status);
                          console.log("Successfull");
                          // also clear the form
                        })
                        .catch(function(error) {
                          console.log("Error is sending!");
                          if (error.response) {
                            if (error.response.status === 429) {
                              console.log("Error is sending to server!");
                            }
                          }
                        });
                    emailObj.tokenId = res.data._id;
                    return resolve(emailObj)

                    }).catch((err) => {
                        const message = _.get(err, 'response.data.error.message', 'An Error Occured!');
                        return reject(message);
                });
            })

        }

    }

    // edit password 
    editPassword(oldPassword, newPassword, ipClient){

        const userToken = this.getUserTokenId();
        const contents = {
            oldPassword: oldPassword,
            newPassword: newPassword
        }
        if(userToken){
            const options = {
                headers: {
                    authorization: userToken,
                }
            }

            return new Promise((resolve, reject) => {
                // console.log(contents);
                //send request 'api/users/editpassword' to server
                this.service.post('api/users/editpassword', contents, options).then((res) => {
                    //soon add code process
                    if(!res.data.success){
                        console.log(res.data.error)
                    }
                    const currentUser =this.getCurrentUser();
                    const email = _.get(currentUser, 'email', '');
                    const name = _.get(currentUser, 'name', '')
                    const post = {
                        email: email,
                        name: name,
                        ip: ipClient.ip,
                        country: ipClient.country,
                        city: ipClient.city,
                    }
                    // console.log(post);
                    // send to email of user 
                    axios
                        .post('/ndsapi/announce/changeinfouser', post)
                        .then(function(response) {
                            console.log("Successful");
                        }).catch(err => console.log(err))

                    return resolve(currentUser)


                }).catch((err) => {
                    const message = _.get(err, 'response.data.error.message', 'Changeing Password Error!');
                    return reject(message);
                });
            })

        }
    }

    //request change password from user
    requestChangePassword(email, password, tokenId, ipClient){
        const infoObj = {email: email, password: password}
        const options = {
            headers: {
                authorization: tokenId,
            }
        }
        // console.log(infoObj)
        return new Promise((resolve, reject) => {
            this.service.post('api/users/changepassword', infoObj, options).then((res) =>{

                // console.log("Changed Password ", res.data);

                const post = {
                    email: email,
                    name: email,
                    ip: ipClient.ip,
                    country: ipClient.country,
                    city: ipClient.city,
                }
                // console.log(post);
                  // send to email of user 
                axios
                    .post('/ndsapi/announce/changeinfouser', post)
                    .then(function(response) {
                        console.log("Successful");
                    }).catch(err => console.log(err))

                return resolve(res.data);
                
            }).catch((err) => {
                const message = _.get(err, 'response.data.error.message', 'Error send require, try again later!');
                return reject(message);
            });
        })
    }

    //send request forget password
    requestGetPassword(email){
        
        const emailObj = {email: email}
        // console.log(emailObj)
        return new Promise((resolve, reject) => {
            //send request 'api/users/checkemail' to server
            this.service.post('api/users/checkemail', emailObj).then((res) =>{

                // console.log("Account Created ", res.data);

                const post = {
                    email: email,
                    name: res.data.user.name,
                    tokenId: res.data._id,
                }
                // console.log(post);
                // send to email of user 
                axios
                    .post('/ndsapi/announce/getinfouser', post)
                    .then(function(response) {
                        console.log("Successful");
                    }).catch(err => console.log(err))
                    res.data = null;
                return resolve(emailObj);
                
            }).catch((err) => {
                const message = _.get(err, 'response.data.error.message', 'Email not exsit!');
                return reject(message);
            });
        })
    }
    

    //upload avatar User
    uploadUserAvatar(formData){
        const userToken = this.getUserTokenId();

        if(userToken){
            const options = {
                headers: {
                    authorization: userToken,
                }
            }
            //send request 'api/user/uploadavatar' to server
            this.service.post('api/user/uploadavatar', formData, options).then((res) => {

                // console.log(res.data.success);
                if(!res.data.success){
                    console.log(res.data.error)
                }
                if (res.data.success) {
                    this.editInfoUser('avatar', res.data.url )
                }

            }).catch((err) => {
                console.log("Send Error: ", err);
            });
        }
    }

    //function render edit user
    editUser(field, value){
        if(value){
            // console.log(field, value , typeof(value));
            this.editInfoUser(field, value);
        }
        
    }

    //set theme local store
    setThemeToLocalStorage(isDark = false ){

        // console.log("Select theme Dark: ", isDark);
        localStorage.setItem('themeOfChat', isDark);
       
    }

    //get theme t from local store
    getThemeFromLocalStorage(){
        // console.log("auto get theme")
        let theme = null;
        const data = localStorage.getItem('themeOfChat');
        if(data){
            try{
                theme = data;
            }
            catch (err){
                console.log(err);
            }
        }
        console.log("Get theme Dark from localStorage: ", theme);
        return theme;
       
    }

    //upload file type photo or video message
    upLoadfile(formData){
        const userToken = this.getUserTokenId();
        // console.log('File wav get in store: ',formData);
        if(userToken){

            this.service.post('api/messages/uploadfiles', formData).then((res) => {

                // console.log(res.data.success);
                if(!res.data.success){
                    console.log(res.data.error)
                }
                if (res.data.success) {
                    const messageId = new ObjectID().toString();
                    const channel = this.getActiveChannel();
                    const channelId = _.get(channel , '_id', null);
                    const currentUser = this.getCurrentUser();
                    const message = {
                        _id: messageId,
                        channelId: channelId,
                        body : res.data.url,
                        userId: _.get(currentUser, '_id'),
                        type:"VideoOrImage",
                        me: true,
                };
                this.addMessage(messageId, message);

            }
            }).catch((err) => {
                console.log("Send files Error: ", err);
            });
        }
    }

    //fetch user channel message
    fetchUserChannels(){
        const userToken =this.getUserTokenId();
        if(userToken){
            const options = {
                headers: {
                    authorization: userToken,
                }
            }
            //send request 'api/me/channels' to server
            this.service.get(`api/me/channels`, options).then((res) => {
                const channels = res.data;
                _.each(channels, (c) => {
                    this.realtime.onAddChannel(c);
                });

                const firstChannelId = _.get(channels, '[0]._id', null);
                this.fetchChannelMessages(firstChannelId);
            }).catch((err) => {

                console.log("An error fetch user channlels", err);
            })
        }
    }

    //add user to cache temp store
    addUserToCache(user){
        if(!user.avatar){
            user.avatar = this.loadUserAvatar(user);
        }
        const id = _.toString(user._id);
        this.users = this.users.set(id, user);
        return user;
    }

    //get user id token from temp store
    getUserTokenId(){
        return _.get(this.token, '_id', null);
    }

    //add default avatar for user not exist avatar
    loadUserAvatar(user){

            return `useravatars\\default_imgSvg_usernDs.svg`
       
    }

    //search user name with same key word
    startSearchUsers(q = ""){
        this.search.users = this.search.users.clear();
        //query to backend server and get list of users
        const data = {search : q};
        //get current user it own
        const currentUser =this.getCurrentUser();
        const currentUserId = _.get(currentUser, '_id');
       
        // if(_.trim(search).length){
        //    searchItems = users.filter((user) =>_.get(user, '_id') !== currentUserId && _.includes(_.toLower(_.get(user, 'name')), keyword));
        // }
        
        //send request to 'api/users/search' server
        this.service.post('api/users/search', data).then((res) => {
            //list off users match
            const users = _.get(res, 'data', []);
            // console.log("Get from server: ", users);
            _.each(users, (user) => {
               //cache to this.users
               //add user to this.search.users
                if(!user.avatar){
                    user.avatar = this.loadUserAvatar(user);
                }
                const userId = `${user._id}`;
                if(userId !== currentUserId){
                    this.users = this.users.set(userId, user);
                    this.search.users = this.search.users.set(userId, user);
                }
                 if(!_.trim(q).length){
                    this.search.users = new OrderedMap();
                }
           });
           this.update();

        }).catch((err) => {
            console.log("Searching Error", err);
        }); 
    }

    //set User Token to local store
    setUserToken(accessToken){
        if(!accessToken){
            this.localStorage.removeItem('token');
            this.token = null;
            return;
        }
        this.token = accessToken;
        localStorage.setItem('token', JSON.stringify(accessToken));
    }

    //clear all data stored from cache
    clearCacheData(){
        this.channels = this.channels.clear();
        this.users = this.users.clear();
        this.messages = this.messages.clear();
    }

    //sign out account 
    signOut(){

        const userId = _.toString(_.get(this.user, '_id', null));
        //logout in cache
        this.users = this.users.update(userId, (user) => {
            if(user) {
                user.online = false;
            }
            return user;
        })
        //request server and logout this user
        const tokenId = _.get(this.token, '_id', null);
        this.isConnected();
        this.user = null;
        localStorage.removeItem('me');
        localStorage.removeItem('token');
        sessionStorage.removeItem('allMark')
        sessionStorage.removeItem('marksListOfMe')
        sessionStorage.removeItem('allMarkOther')
        if(userId){
            this.users = this.users.remove(userId);
        }

        //after logout
        this.clearCacheData()

        const options = {
            headers : {
                authorization: tokenId
            }
        }
        this.service.get('api/user/logout', options);
   
        this.update()

    }


    //get Token from local store
    getTokenFromLocalStorage(){
        // console.log("get token from local")
        if(this.token){
            return this.token;
        }

        let token = null;
        const data = localStorage.getItem('token');
        if(data){
            try{
                token = JSON.parse(data);
            }
            catch (err){
                console.log(err);
            }
            
        }
        return token;
    }

    //get user from locak store
    getUserFromLocalStorage(){
        // console.log("get user from local")
        let user = null;
        const data = localStorage.getItem('me');
         try {
                user = JSON.parse(data);
         }
         catch(err) {
             console.log(err);
         }
         if(user){
            //connect to backend server verify this user
            const token = this.getTokenFromLocalStorage();
            const tokenId = _.get(token, '_id');
            const options = {
                headers: {
                    authorization: tokenId,
                }
            }
            //send request 'api/users/me' to server
            this.service.get('api/users/me', options).then((res) => {
                //user login with token id
                const accessToken = res.data;
                const user = _.get(accessToken, 'user');
                console.log("here is user ", user)
                this.setCurrentUser(user);
                this.setUserToken(accessToken);

            }).catch(err => {
                this.signOut();
            });
        }

         return user;
    }    
        
    //set current user into local store
    setCurrentUser(user){
        if(!user.avatar){
            user.avatar = this.loadUserAvatar(user);
        }
        this.user = user;
        if(user){
            
            localStorage.setItem('me', JSON.stringify(user));
            //save to local store
            const userId =`${user._id}`;
            this.users = this.users.set(userId, user);

        }
        this.update();
    }

    //register new account
    register(user){
        const saltRounds = 10;
        //none real this is fake to try hacker
        // console.log(user.password)
        const password = bcrypt.hashSync(user.password.content, saltRounds);
        console.log("Email Register is: ", user.email);
        console.log("Password Register is: ", password);
        return new Promise((resolve, reject) => {
            this.service.post('api/users', user).then((res) =>{

                // console.log("Account Created ", res.data);

                // const post = {
                //     email: user.email,
                //     name: user.name,
                // }
                // axios
                //     .post('/ndsapi/announce/welcome', post)
                //     .then(function(response) {
                //         console.log("Successful");
                //     }).catch(err => console.log(err))

                return resolve(res.data);
                
            }).catch((err) => {
                const message = _.get(err, 'response.data.error.message', 'An Error register, Try again!');
                return reject(message);
            });
        })

    }
 

   

    login(email = null, password = null, ipClient = null){
        const userEmail = _.toLower(email);

        const user = {
            email: userEmail,
            password: password,
            ipClient: ipClient,
        }

        console.log("Logining with: ", user);
        return new Promise((resolve, reject) => {
            
            //send request 'api/users/login' to server
            this.service.post('api/users/login', user).then((res) => {
                // that mean successful login
                const accessToken = _.get(res, 'data'); 
                const user = _.get(accessToken, 'user');
                user.email = email;
                // console.log("Logining with: ", user);
                this.setCurrentUser(user);
                this.setUserToken(accessToken);
                this.realtime.connect();

                // begin fetch user's channel
                this.fetchUserChannels();
                // this.fetchMessageVoice();
                // this.fetchTypeVoices();
                return resolve(email)
                // Call to realtime and connect again to socket server with this user

            }).catch((err) => {
                // login error
                
                const message = _.get(err, 'response.data.error.message', 'An error require to server, Try again!');
                console.log("Logining with error is: ", message);
                return reject(message);

            })

        });
        // const _this = this;
        // return new Promise((resolve, reject) => {
        //     const user = users.find((user) => user.email === userEmail);
        //     if( user ) {
        //         _this.setCurrentUser(user);
        //     }
        //     return user ? resolve(user) : reject("User not found!")
        // });
    }

    //add user to channel prepare for a new channel
    addUserToChannel(channelId, userId) {
        const channel = this.channels.get(channelId);
        if(channel) {
            channel.members = channel.members.set(userId, true);
            this.channels = this.channels.set(channelId, channel);
            this.update();
        }
      
    }

    //get list search user 
    getSearchUsers(){
        // const keyword = _.toLower(search);

        // let searchItems = new OrderedMap();
        // const currentUser =this.getCurrentUser();
        // const currentUserId = _.get(currentUser, '_id');
       
        // if(_.trim(search).length){
        //    searchItems = users.filter((user) =>_.get(user, '_id') !== currentUserId && _.includes(_.toLower(_.get(user, 'name')), keyword));
        // }
        // console.log(this.search.users.valueSeq())
        return this.search.users.valueSeq();
    }

    //create new channel
    onCreateNewChannel(channel = {}){
        const channelId = _.get(channel, "_id");
        this.addChannel(channelId, channel );
        this.setActiveChannelId(channelId);
    
    }

    //get current user
    getCurrentUser(){
        return this.user;
    }

    //fetch channel message of current user
    fetchChannelMessages(channelId){

        let channel = this.channels.get(channelId);
            if( channel && !_.get(channel, 'isFetchMessages')){

                const token = _.get(this.token, '_id');
                const options = {
                    headers: {
                        authorization: token,
                    }
                }
                //send request 'api/channels/${channelId}/messages' to server 
                this.service.get(`api/channels/${channelId}/messages`, options).then((res) => {
                    channel.isFetchMessages = true;

                    const messages = res.data;
                
                    _.each(messages, (message) => {
                        this.realtime.onAddMessage(message);
                    });
                    this.channels = this.channels.set(channelId, channel);

                }).catch((err) => {
                    console.log("An error fetching channel 's messages", err);

                }
            )}
        }   
    
    
    // connect to socket wss
    isConnected(){
        return this.realtime.isConnected;
    }

    //set channel is active
    setActiveChannelId(id) {
        this.activeChannelId = id;
        this.fetchChannelMessages(id);
        this.update();
    }

    //get active channel
    getActiveChannel(){
        const channel = this.activeChannelId ? this.channels.get(this.activeChannelId) : this.channels.first();
        return channel;
    }
    
    // call function from realtime to fetch message from cache or db
    setMessage(message, notify = false){
        const id = _.toString(_.get(message, '_id'));
        this.messages = this.messages.set(id, message);
        const channelId = _.toString(message.channelId);
        const channel = this.channels.get(channelId);

        if (channel) {
            channel.messages = channel.messages.set(id, true);
            channel.lastMessage = _.get(message, 'body', '');
            channel.notify = notify;

            this.channels = this.channels.set(channelId, channel);
        } else {

            // fetch to the server with channel info
            this.service.get(`api/channels/${channelId}`).then((response) => {


                const channel = _.get(response, 'data');

                /*const users = _.get(channel, 'users');
                _.each(users, (user) => {

                    this.addUserToCache(user);
                });*/

                this.realtime.onAddChannel(channel);


            })
        }
        this.update();
    }

    //send edit user to realtime
    editInfoUser(field, value){
        if(value){

        const obj = {
            payload: value,
            field: field,
        }
            this.realtime.send(
                {
                    action: 'edit_user',
                    payload: {obj},
                }
            );
        }
    this.update();
    }

    //send status type of user to channel
    addTyping(channel, typing = false){
        
        if(channel){
            const userId = `${_.get(this.user, '_id', null)}`;
            const channelId = _.get(channel, '_id');
            const obj = {
                channelId: channelId,
                payload: typing,
                typier: userId,
            }
            // console.log("channel typing: ", channelId);
            this.realtime.send(
                {
                    action: 'typing_status',
                    payload: {obj},
                }
            );
        }
        this.update();
    }


    //add new message to active channel 
    addMessage(id, message = {}){

        const user = this.getCurrentUser();
        message.user = user;
        this.messages = this.messages.set(id, message);
        //add new message to 
        const channelId = _.get(message, 'channelId');
        if(channelId){

            
            let channel = this.channels.get(channelId);

            channel.lastMessage = _.get(message, 'body', '');
            //now i send this channel to the server
            
           this.realtime.send(
               {
                    action: 'create_channel',
                    payload: channel,
                }
            );
            // send to the via websocket to create new message and notify other
            this.realtime.send(
                {
                    action: 'create_message',
                    payload: message,
                }
            );

            channel.messages = channel.messages.set(id, true);


            channel.isNew = false;
            this.channels = this.channels.set(channelId, channel);
        }
        this.update();
    }

    
    //remove user in a channel
    removeMemberFromChannel( channel = null, user = null){
        if(!channel || !user ){
            console.log("Not fine any channel")
            return;
        }
        console.log(channel,user)
        const channelId = _.get(channel, '_id')
        const userId = _.get(user, '_id');

        // console.log(channel)
        this.realtime.send(
            {
            action: "remove_memberChannel",
            payload: {
                channel: channel,
                userId: userId
                }
            }
        )

        const data = {
            _id: userId,
            channelId: channelId
        }

        //remove user when search user to add into new channel
        // const titleChannel =  _.get(channel, 'title')
        const userToken = this.getUserTokenId();
      
    
        // channel.members = channel.members.remove(userId);
        // this.channels = this.channels.set(channelId, channel);
       
        if(userToken) {

            const options = {
                headers: {
                    authorization: userToken,
                }
            }

             //send request to 'api/channels/remove/user' server
             this.service.post('api/channels/remove/user', data, options).then((res) => {

                // console.log(res.data)
                channel.members = channel.members.remove(userId);
                

                const userCurrent = this.getCurrentUser();
                const userIdCurrent = _.get(userCurrent, '_id');

                
                if(userId === userIdCurrent) {
                    
                    channel.members = null;
                    channel.messages = null;
                    channel.lastMessage = 'NaN';
                    this.channels = this.channels.set(channelId, channel);
                }
                else { 
                    this.channels = this.channels.set(channelId, channel);
                }


                this.update();
            })


        }
        
    }

    removeMemberChannelFormRealtime(channel = null, user = null){
        if(!channel || !user ){
            console.log("Not fine any channel")
            return;
        }

        const channelId = _.get(channel, '_id')
        // const userId = _.get(user, '_id');
        

        const userCurrent = this.getCurrentUser();
        const userIdCurrent = _.get(userCurrent, '_id');

        if(user === userIdCurrent) {
            // channel.members = channel.members.remove(user);
            channel.members = null;
            channel.messages = null;
            channel.lastMessage = 'NaN';
            this.channels = this.channels.set(channelId, channel);
        }
        // else { 
        //     this.channels = this.channels.set(channelId, channel);
        // }

        this.fetchUserChannels();

        this.update();

    }
    //get Message from cache
    // getMessages(){
    //     return this.messages.valueSeq();
    // }
    
    //get and render messages from channel stored in cache
    getMessagesFromChannel(channel){
        let messages = new OrderedMap();

        if(channel && channel.members){
            channel.messages.forEach((value, key) => {

                const message = this.messages.get(key);
                messages = messages.set( key, message);
    
            });
        }

        return messages.valueSeq();
        
    }


    //get member list from channel
    getMembersFromChannel(channel){
        let members = new OrderedMap();
        if(channel && channel.members){
            channel.members.forEach((value, key) => {

                const userId = `${key}`
                const user = this.users.get(userId);
                // console.log("User from Channel: ", user);
                const loggedUser = this.getCurrentUser();
                if( _.get(loggedUser, '_id') !== _.get(user, '_id')){
                    members = members.set(key, user);
                   
                }
            });
               
        }
        return members.valueSeq();
    }

    // add channels
    addChannel(index, channel = {}){
        this.channels = this.channels.set(`${index}`, channel);
        // console.log(channel);
        // console.log("Mess get from server to client: ", channel);
        this.update();
    }

    //get channel list
    getChannels(){
        this.channels = this.channels.sort((a, b) => a.updated - b.updated);
        return this.channels.valueSeq();
    }


    //force update store component
    update(){
        this.app.forceUpdate();
    }
}

