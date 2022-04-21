import React, { Component } from 'react'
import { FaAlignLeft, FaEye } from 'react-icons/fa';
import {Link, Route, Switch, Redirect } from 'react-router-dom'
import defaultImg from '../images/svgnds.png';
import _ from 'lodash';
import classNames from 'classnames';
import { IconButton } from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';
import { MdContentCopy, MdRefresh, MdReport, MdReportProblem } from 'react-icons/md';
import { BsMic, BsFileText, BsPlus } from 'react-icons/bs';
import { AiOutlineSetting, AiOutlineQuestionCircle } from 'react-icons/ai';
import { RiChatVoiceLine, RiSubtractLine, RiVolumeMuteLine } from 'react-icons/ri';
import { GiSpeaker } from 'react-icons/gi';
import { BiMessageAdd, BiDotsVerticalRounded, BiHide } from 'react-icons/bi';
import { VscReport } from 'react-icons/vsc';
import translate from 'translate';
import dataVoices from './data.js/dataVoicesApp4'
import dataLang from './data.js/dataLangApp4'
import dataMic from './data.js/dataLangMic'
import dataListQuestion from './data.js/dataListQuestions'
import LoadingMini from './Loading-mini';
// import {ObjectID} from '../helpers/objectid';
// import {NotificationContext} from '../notifications/NotificationProvider'
// import {addTranslate} from '../notifications/NotificationProvider'
import NotificationProvider from '../notifications/NotificationProvider';
import Draggable from './Draggable';



// const formEl = React.useRef(null);
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
const recognition = new SpeechRecognition()
recognition.continous = true
recognition.interimResults = true
// recognition.lang = 'es-ES'
// recognition.lang = 'zh-TW'
// recognition.lang = 'ja-JP'
// recognition.lang = 'ko-KR'
// recognition.lang = 'hi-IN'
// recognition.lang = 'ar-EG'
// recognition.lang = 'ru-RU'
// recognition.lang = 'sv-SE'
// recognition.lang = 'pt-BR'
// recognition.lang = 'pl-PL'
// recognition.lang = 'it-IT'
// recognition.lang = 'zu-ZA'
// recognition.lang = 'fr-FR'
// recognition.lang = 'de-DE' german
// recognition.lang = 'da-DK' Danish
// recognition.lang = 'nl-NL' Dutch
// recognition.lang = 'ms-MY'
// recognition.lang = 'id-ID'
// recognition.lang = 'ro-RO'
recognition.lang = 'en-GB'
// recognition.lang = 'en-US'
// recognition.lang = 'vi-VN'
// recognition.lang = 'tr-TR'



export default class App4 extends Component {
    
    constructor(props){
    super(props);
    this.state = {
        isOpen:false,
        listening: false,
        isChat: true,
        isWrite: false,
        isShowFormAddMessage: false,
        isShowInstruction: false,
        reportViolations: null,
        activeQuestTxt: false,
        questKey: [],
        messageVoice: '',
        message: null,
        type: null,
        typesListMessage: [],
        txtMessage:  null,
        keyWord: null,
        typeTranslated: null,
        txtMessageTranslated: null,
        keyWordTranslated: null,
        langMessage: 'en',
        checkNewMessageDefault: false,
        showAuthor: true,
        showToolsMsg: false,
        showInfoUserId: null,
        msgTranslate: null,
        newNotification: null,
        typeNoti: null,
        addNotiSignal: false,
        isHiddenMsg: false,
        isMuteVoice: false,
        changeConfig: false,
        reload: false,
        detailConfig: {
            notifiLang: 'vi',
            msgLang: 'en',
            micLang: 'en',
            voice: 0,
            rate: 1,
            pitch: 1,
            }
        }
    }
    // UNSAFE_componentWillMount(){
    // 	let items = JSON.parse(localStorage.getItem('task')) || [];
    // 	this.setState({
    // 		items: items,
    // 	})
    // }
    // _uniq(str1){
    //     let str = str1;
    //     let uniql = "";
    //     for (var x=0; x < str.length; x++){

    //         if(uniql.indexOf(str.charAt(x))==-1){
    //             uniql += str[x];  
    //         }
    //     }   
    //     return uniql;  
    // }

    toggleAccountUser = (me) => {
        if(!me){
            window.location.replace("/page3/greeting/newuser&account");
        }else{
            window.location.replace("/page3");
        }
    }
    
    speakParagraph = (e) => {
        e.preventDefault();
        try{
            let tempText = document.getElementById('final').innerHTML;
        // console.log(tempText)
        if(tempText){
            this.readOutLoud(tempText)
        }

        }
        catch(err){
            console.log(err)
        }
        
    }
    
    toggleActiveQuestion = (key) => {
        // console.log(key)

        const {questKey} = this.state;
        if(questKey.includes(key.toString())){

            let temps = _.difference(questKey, [key.toString()])
            // console.log(temps)
            this.setState({
                questKey: temps
            }) 

        }else{

            let temps = _.uniq([...questKey, key.toString()]);
            // console.log(temps)
            this.setState({
                questKey: temps
            })  

        }
        
    }

    handleSubmitReportMessage = (e) => {
        e.preventDefault();
        const {reportViolations} = this.state;
        console.log(reportViolations);
        this.setState({
            reportViolations: null,
            message: {
                body: 'Currently we do not provide a server to report violation because of some personal reasons for users, you can contact the author via message information at Chat App'
            },
        })
        setTimeout(() => {
            this.setState({
                reportViolations: null,
            })
        }, 8000)
    }
    proccessData = (data, key) => {
        const {langMessage} = this.state;
        switch(key){
           case 1:
                if(langMessage !== 'en'){
                    this.translateDefaultMessage(data).then((res) => {
                        console.log("translated")
                        this.setState({
                            typeTranslated: res,
                        })
                    })
                    
                }else{
                    console.log("translated")
                    this.setState({ 
                        typeTranslated: data
                    })
                }
        
           break;

           case 2:
                if(langMessage !== 'en'){
                    this.translateDefaultMessage(data).then((res) => {
                        console.log("translated")
                        this.setState({
                            keyWordTranslated: res,
                        })
                    })
                    
                }else{
                    console.log("translated")
                    this.setState({ 
                        keyWordTranslated: data 
                    })
                }
            break;
            case 3:
                if(langMessage !== 'en'){
                    this.translateDefaultMessage(data).then((res) => {
                        console.log("translated")
                        this.setState({
                            txtMessageTranslated: res,
                        })
                    })
                    
                }else{
                    console.log("translated")
                    this.setState({ 
                        txtMessageTranslated: data
                    })
                }

            break;
            default: 
            break;

       }

    }

    handleSetting = (e) => {
        e.preventDefault();
        const {showSettingVoice} = this.state;
        this.setState({
            showSettingVoice: !showSettingVoice,
            changeConfig: false
        })
    }

    handleSubmitChangeConfig = (e) => {
        e.preventDefault()
        const { detailConfig, changeConfig } = this.state
        // console.log(detailConfig)
        if(!changeConfig) {
            this.setState({
                changeConfig: true
            })
            window.sessionStorage.setItem("configReTrille",  JSON.stringify(detailConfig))
        }else{
           this.readOutLoud('I really like the traditional Vietnamese ao dai')
        }
       
    }



    onTxtfieldChange = (e) => {
        try{
            let { detailConfig } = this.state;
            const field = e.target.name;
            detailConfig[field] = e.target.value;
            this.setState({
                detailConfig: detailConfig
            });
        }
        catch (err) {
            console.log(err)
        }
        
    }

   
    refresh_write = (element, element2) => {
        document.getElementById(element).innerHTML = "";
        document.getElementById(element2).innerHTML = "";
        recognition.stop()
        recognition.onend = () => {
          console.log("Stopped listening per click")
        }

    }
    hidden_data = (element) => {
        document.getElementById(element).innerHTML = "";
    }

    copy_data = (id) => {
        var r = document.createRange();
        r.selectNode(document.getElementById(id));
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(r);
        document.execCommand('copy');
        window.getSelection().removeAllRanges();
        alert("Successful Copied!");
        
    }
    toggleActiveWindow = (key) => {
        recognition.stop()
        recognition.onend = () => {
          console.log("Stopped listening per click")
        }
        this.setState({
            isChat: false,
            isWrite: false,
            isShowFormAddMessage: false,
            isShowInstruction: false,
            messages: null
        })

        switch(key){
            case 1 :
                this.setState({
                    isChat: true,
                })
            break;
            case 2 :
                this.setState({
                    isWrite: true,
                })
            break;
            case 3 :
                this.setState({
                    isShowFormAddMessage: true,
                })
            break;
            case 4 :
                this.setState({
                    isShowInstruction: true,
                })
            break;
            default:
                break;
        }

    }

    toggleSubmit = (e) => {
        e.preventDefault();
        const { type, keyWord, txtMessage, langMessage } = this.state;
        if(type && keyWord && txtMessage && langMessage.length > 1){
        
            this.setState({
                message: {
                    body: 'The message has been recorded, Them need to be checked in seconds, its all automatic',
                    type: 'success'
                },
                txtMessage: null,
                checkNewMessageDefault: true

            })
            this.proccessData(type, 1);
            this.proccessData(keyWord, 2);
            this.proccessData(txtMessage, 3);
            setTimeout(() => {
              
                    this.handlSubmit(e)
              
            }, 6000)

        }else{
            this.setState({
                message: {
                    body: 'An error inputs must is filled out',
                    type: 'error'
                },
                checkNewMessageDefault: false
            })
        }
        
    }



    handlSubmit = (e) => {
        e.preventDefault();
        const {store} = this.props;
        const {showAuthor, typeTranslated, keyWordTranslated, txtMessageTranslated } = this.state;

        const data = {
            type: typeTranslated,
            keyWord: keyWordTranslated,
            txtMessage: txtMessageTranslated,
            showAuthor: showAuthor,
        }      
        console.log(data)
        this.setState({
            message: {
                body: 'Proccessing Data',
                type: 'error'
            },
        }, () => {
            if(typeTranslated.length > 1 && keyWordTranslated.length > 5 && txtMessageTranslated.length > 10 && txtMessageTranslated.length < 80){
            
                store.addMessageVoiceDefault(data).then((response) => {
                    // console.log("data response ", response)
                    this.setState({
                        message: {
                            body: response,
                            type: 'success'
                        },
                        txtMessage: null,
                        checkNewMessageDefault: false

                    })
                }).catch((err) => {
                    console.log(err);
                    this.setState({
                        message: {
                            body: err,
                            type: 'error'
                        },
                        checkNewMessageDefault: false
                    })
                    });

            }else{
                this.setState({
                    message: {
                        body: 'Length of type, keyWord Or Message is too short or message is too long',
                        type: 'error'
                    },
                    checkNewMessageDefault: false
                })
            }

        })
    
    }
    beforeReadLoud = (data) => {
        console.log("here state mute" ,this.state.isMuteVoice)
        if(!this.state.isMuteVoice){
            this.readOutLoud(data)
        }
    }

    readOutLoud = (message) => {
            const { detailConfig } = this.state; 
            const speech = new SpeechSynthesisUtterance();
            let voices = window.speechSynthesis.getVoices();
            // console.log(voices);
            speech.text = message;
            speech.volume = 1;
            speech.rate = detailConfig.rate;
            speech.pitch = detailConfig.pitch;
            speech.lang = voices[`${detailConfig.voice}`];
            speech.voice = voices[`${detailConfig.voice}`];
            speech.voiceURI = voices[`${detailConfig.voice}`];
            window.speechSynthesis.speak(speech);
    }


    toggleListen2 = (e) => {
        e.preventDefault();
        const { store } = this.props;
        let transcript = null;
        try{
            recognition.start();
            console.log('listening?', this.state.listening)
        }
        catch (err) {
            console.log("An Error Occured")
        }
        recognition.onstart = () => {
            console.log("Listening!")
        }
        recognition.onresult = (event) => {
            // console.log(event)
           const current = event.resultIndex;
           transcript = event.results[current][0].transcript;
        //    document.getElementById('final2').innerHTML = transcript;
        //    console.log(transcript)
           
        }
        recognition.onend = () => {
            const {detailConfig} = this.state;
            console.log("Stopped listening", transcript)

            try{     

                if(detailConfig.micLang !== 'en'){
                    //before sent transcript need to translate english language
                   this.translateTranscriptBeforeSend().then((res) => {
                        store.addMessageVoice(res).then((response) => {
                            if(response){
                                console.log(response)
                                store.getMessageVoices();
                                this.beforeReadLoud(response)
                                
                            }
                        }).catch((err) => {
                            // console.log(err);
                            const error = 'I dont understand what you said, you can teach me at Add Message';
                            this.readOutLoud(err || error)
                        });
                   })
               }else{
                    store.addMessageVoice(transcript).then((response) => {
                        if(response){
                            console.log(response)
                            this.beforeReadLoud(response)
                            store.getMessageVoices()
                        
                        }
                    }).catch((err) => {
                        // console.log(err);
                        const error = 'I dont understand what you said, you can teach me at Add Message';
                        this.readOutLoud(err || error)
                        store.getMessageVoices()
                    });
    
               }
                
            }
            catch (err) {
                console.log(err)
            }
            // this.readOutLoud(transcript);

        }

        recognition.onerror = event => {
            console.log("Error occurred in recognition: " + event.error)
        }

    }




    toggleListen = () => {
        this.setState({
          listening: !this.state.listening
        },
        this.handleListen)
      }

      handleListen = () => {
       
        console.log('listening?', this.state.listening)
    
        if (this.state.listening) {
          recognition.start()
        //   console.log("here is original: " ,recognition)
          recognition.onend = () => {
            console.log("...continue listening...")
            recognition.start()
          }
    
        } else {
          recognition.stop()
          recognition.onend = () => {
            console.log("Stopped listening per click")
          }
          
        }
    
        recognition.onstart = () => {
          console.log("Listening!")
        }
    
       
        let finalTranscript = ''
        recognition.onresult = event => {
          let interimTranscript = ''
    
          for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) finalTranscript += transcript + ' ';
            else interimTranscript += transcript;
          }
          document.getElementById('interim').innerHTML = interimTranscript
          document.getElementById('final').innerHTML = finalTranscript
         
  
          recognition.onerror = event => {
            console.log("Error occurred in recognition: " + event.error)
          }
      
        }
        
    }
    translateTranscriptBeforeSend = data => {
        const {detailConfig} = this.state
        if(data){
            return new Promise((resolve, reject) => {
                console.log("translated")
                translate.engine = 'google';
                translate.key = process.env.REACT_APP_keyAPITrans;
                translate(data, { from: `${detailConfig.micLang}`, to: 'en' }).then(text => {
                    // console.log(text)
                    return text ? resolve(text) : reject(null)
                })
            })
            
        }
    
    }

    translateDefaultMessage = data => {
        if(data){
            return new Promise((resolve, reject) => {
                console.log("translated")
                translate.engine = 'google';
                translate.key = process.env.REACT_APP_keyAPITrans;
                translate(data, { from: `${this.state.langMessage}`, to: 'en' }).then(text => {
                    // console.log(text)
                    return text ? resolve(text) : reject(null)
                })
            })
            
        }
    
    }
    translateMessage = data => {
        const {detailConfig} = this.state
        translate.engine = 'google';
        translate.key = process.env.REACT_APP_keyAPITrans;
        translate(data, { from: `${detailConfig.micLang}`, to: 'vi' }).then(text => {
            // let nameStr = "Translate is: "+text+".";
            this.setState({
                newNotification: text,
                typeNoti: "none",
                addNotiSignal: true
            })
            setTimeout(() => {
                this.setState({
                    addNotiSignal: false
                })
                // console.log(this.state.addNotiSignal)
            }, 1000)
        })
    }
   

    renderMessage = (userType, data) => {
        // console.log('===========', data)
        const msgDiv = (
            <>
            {/* <div className="avatar">
                <img src={data.user.avatar ? `http://localhost:8080/${_.get(data.user, 'avatar')}` : defaultImg} alt="avatar-user" />
            </div> */}
            <div className="msg">
                <div className="msg-details">
                    <p>{data.user.name}</p>
                    <p>
                    {this.state.showToolsMsg ?  <div className="tools-msg-retrille">
                        <IconButton style={{fontSize: '1rem', color: 'rgba(255,255,255,0.3)'}}>
                            <GiSpeaker onClick={() => this.readOutLoud(data.body)}/>
                        </IconButton>
                        <IconButton style={{fontSize: '1rem', color: 'rgba(255,255,255,0.3)'}}>
                            <VscReport onClick={() => this.translateMessage(data.body)} />
                        </IconButton>
                        <IconButton style={{fontSize: '1rem', color: 'rgba(255,255,255,0.3)'}}>
                            <MdReport onClick={() => this.setState({showInfoUserId: data._id})} />
                        </IconButton>
                        { this.state.showInfoUserId === data._id ?
                            <div className="info-msg">
                               { data.showAuthor ?
                            <><p>{data.user.nameOri}{" "}</p>
                            <p>{data.user.ID}</p></>
                            :
                            null}
                            </div>
                            :
                            null  
                        }
                       
                        <IconButton style={{fontSize: '1rem', color: 'rgba(255,255,255,0.3)'}}>
                            <MdReportProblem onClick={() => this.setState({reportViolations: data})} />
                        </IconButton>
                    </div>
                    : null}
                    </p>
                   
                </div>

                <div className="message">{data.body}</div>
               
            </div>
            </>
        )
    
        return (
            <>{
                this.state.isHiddenMsg ? null : <li className={userType} > {msgDiv} </li>
            }</>
        )
    
    }

    scrollMessagesToBottom = () => {
        if(this.messagesRef){
            this.messagesRef.scrollTop = this.messagesRef.scrollHeight;
        }
    }

    NotificationRequireAccount = () => {
        this.setState({
            newNotification: "Require Login an Account",
            typeNoti: "err",
            addNotiSignal: true
        })
        setTimeout(() => {
            this.setState({
                addNotiSignal: false
            })
            // console.log(this.state.addNotiSignal)
        }, 1000)
    } 

    componentDidMount(){
        // window.addEventListener('mousedown', this.onClickInSide)
        const { store } = this.props;
        store.fetchMessageVoice();
        //Need add MessageVoice and Type in cache temp
        store.fetchTypeVoices();
        console.log("fetch messagevoice from bd");
        const configReTrille = window.sessionStorage.getItem("configReTrille");
        const { detailConfig } = this.state
        try {
            let config = JSON.parse(configReTrille);
            console.log(config)
            if(config){
                detailConfig.rate = config.rate;
                detailConfig.pitch = config.pitch;
                detailConfig.voice = config.voice;
                detailConfig.msgLang = config.msgLang;
                detailConfig.notifiLang = config.notifiLang
                this.setState({
                    detailConfig: detailConfig
                })
            }else{
                window.sessionStorage.setItem("configReTrille",  JSON.stringify(detailConfig))
            }

        }

        catch(err) {
            console.log(err);
        }


        const me = store.getCurrentUser();
        if(!me){
            this.NotificationRequireAccount()
        
        }
    }
    
    // componentWillUnmount(){
    //     window.removeEventListener('mousedown', this.onClickInSide);
    //     console.log('Unmount');
    // }

    componentDidUpdate(prevProps){

        // console.log(this.state.txtMessageTranslated, this.state.keyWordTranslated, this.state.typeTranslated)
        this.scrollMessagesToBottom();
        // if (prevProps.resource !== this.props.resource) {
        //     this.setState({addNotiSignal: false})
        // }

    }
    
    
    
    handleToggle = () =>{
        this.setState({isOpen:!this.state.isOpen})
    }
  
    render() {

        const { store } = this.props;
        const { showToolsMsg, isHiddenMsg, isMuteVoice, showSettingVoice, detailConfig, reportViolations}= this.state;
        const me = store.getCurrentUser();
        const profileImg = _.get(me, 'avatar');
        const name = _.get(me, 'name') || 're-Trille';
        const messages = store.getMessageVoices();
        const types  = store.getTypeVoices();
        // if(!me){
        //     return (
        //       <Redirect to="/page3" />
        //     )
        //   } 
     
        // typeList.forEach(function(item){
        //     types.push(item)
        // });
        // let types = [];
        let listQuestions = []
        let lang  = [];
        let voices = [];
        let mic = [];
       
        Object.keys( dataListQuestion).forEach(function(key) {
            listQuestions.push( dataListQuestion[key])
        });
        Object.keys(dataLang).forEach(function(key) {
            lang.push(dataLang[key])
        });
        Object.keys(dataVoices).forEach(function(key) {
            voices.push(dataVoices[key])
        });
        Object.keys(dataMic).forEach(function(key) {
            mic.push(dataMic[key])
        });

        return (
            <div className="app4">
               <div className="about-navbar">
					<div className="nav-header">
						<button type="button" 
	 						className="nav-btn"
							onClick={this.handleToggle}
						>
	 						<FaAlignLeft className="nav-icon" />
	 					</button>
						<div className="toggle-lang">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="25" height="25" aria-hidden="true" focusable="false" fill="currentColor">
							<path d="M217.982 201.586h-64.499c-5.537 0-10.026 4.489-10.026 10.026s4.489 10.026 10.026 10.026h53.547c-4.72 25.263-26.935 44.446-53.547 44.446-30.037 0-54.473-24.436-54.473-54.473s24.436-54.473 54.473-54.473c14.55 0 28.229 5.667 38.518 15.955 3.916 3.916 10.264 3.916 14.178 0 3.916-3.916 3.916-10.264 0-14.178-14.077-14.077-32.791-21.829-52.697-21.829-41.094 0-74.525 33.431-74.525 74.525 0 41.094 33.431 74.525 74.525 74.525s74.525-33.431 74.525-74.525c.001-5.536-4.488-10.025-10.025-10.025z"></path>
							<path d="M470.331 92.24H269.728l-26.935-81.355a10.025 10.025 0 00-9.518-6.875H41.669C18.693 4.01 0 22.703 0 45.679v332.412c0 22.976 18.693 41.669 41.669 41.669h203.145l27.073 81.369a10.026 10.026 0 009.513 6.861h188.932c22.976 0 41.669-18.693 41.669-41.669V133.909c-.001-22.976-18.694-41.669-41.67-41.669zM41.669 399.708c-11.919 0-21.616-9.697-21.616-21.616V45.679c0-11.919 9.697-21.616 21.616-21.616h184.364l70.691 213.516a.366.366 0 00.015.043l53.664 162.086H41.669zm295.78-116.433c.805 1.11 10.824 14.877 26.355 34.066-4.377 5.756-9.015 11.474-13.91 17.036l-29.712-89.74h87.441c-6.196 13.031-16.938 33.813-31.692 55.736-13.553-16.921-22.069-28.622-22.249-28.87-3.251-4.482-9.519-5.481-14.002-2.23-4.482 3.25-5.48 9.518-2.231 14.002zM265.946 419.76h75.162l-55.503 59.084-19.659-59.084zm226.002 46.561c0 11.919-9.697 21.616-21.616 21.616H304.575l67.015-71.339-.004-.003c.293-.312.571-.64.823-.991a10.025 10.025 0 001.39-9.022l-16.688-50.402c7.073-7.406 13.68-15.143 19.805-22.965 13.299 15.772 29.037 33.446 45.778 50.187 1.957 1.957 4.524 2.937 7.089 2.937s5.132-.979 7.089-2.937c3.916-3.916 3.916-10.264 0-14.178-17.461-17.461-34.013-36.244-47.687-52.632 21.251-30.503 35.033-59.504 40.535-71.954h21.454c5.537 0 10.026-4.489 10.026-10.026s-4.489-10.026-10.026-10.026h-66.173v-18.047c0-5.537-4.489-10.026-10.026-10.026s-10.026 4.489-10.026 10.026v18.046h-51.406l-37.178-112.292H470.33c11.919 0 21.616 9.697 21.616 21.616v332.412z"></path>
							</svg>
						</div>
					</div>
					
					<div className={this.state.isOpen ? "nav-items show-nav-items" : "nav-items"} >
                        
                        <a href={"javascript:void(0)"}>
							<div onClick={() => this.toggleActiveWindow(1)} className={classNames('nav-item', {'active': this.state.isChat })}>
								ReTrille
							</div>
						</a>
                       
						<a href={"javascript:void(0)"}>
							<div onClick={() => this.toggleActiveWindow(2)} className={classNames('nav-item', {'active': this.state.isWrite})}>
                                Writting Voice
							</div>
						</a>
                        
						<a href={"javascript:void(0)"}>
							<div onClick={() => this.toggleActiveWindow(3)}  className={classNames('nav-item', {'active': this.state.isShowFormAddMessage })}>
								Add Messgage
							</div>
						</a>
                      
                        <a href={"javascript:void(0)"}>
							<div onClick={() => this.toggleActiveWindow(4)}  className={classNames('nav-item', {'active': this.state.isShowInstruction })}>
								Instruction
							</div>
						</a>
					</div>        
                </div>

                <div className="main-retrille">
                    <div className="left-retrille">
                        <div onClick={() =>this.toggleAccountUser(me)} className="img-user-retrille" >
                           
                            <div className="user-img-channel">
                                <img className="img-profile" src={profileImg ? `http://localhost:8080/${profileImg}` : defaultImg}  alt="user-img"></img>
                            </div>
                          
                            <span>{name}</span>
                        </div>  
                        <ul className="left-navbar-retrille">
                            <li className={this.state.isChat ? "active" : null } onClick={() => this.toggleActiveWindow(1)}>
                                <span><Tooltip title="ReTrille" placement="left-start">
                                    <IconButton style={{fontSize: '1rem', color: 'hsl(186, 100%, 94%)'}}>
                                        <RiChatVoiceLine />
                                    </IconButton></Tooltip>
                                </span>
                                <p>Retrille</p>
                            </li>
                            <li className={this.state.isWrite ? "active" : null } onClick={() => this.toggleActiveWindow(2)}>
                                <span><Tooltip title="Writting" placement="left-start">
                                    <IconButton style={{fontSize: '1rem', color: 'hsl(186, 100%, 94%)'}}>
                                        <BsFileText />
                                    </IconButton></Tooltip>
                                </span>
                                <p>Writting Voice</p>
                            </li>
                            <li className={this.state.isShowFormAddMessage ? "active" : null } onClick={() => this.toggleActiveWindow(3)}>
                                <span><Tooltip title="Add Message" placement="left-start">
                                    <IconButton style={{fontSize: '1rem', color: 'hsl(186, 100%, 94%)'}}>
                                        <BiMessageAdd />
                                    </IconButton></Tooltip>
                                </span>
                                <p>Add Message</p>
                            </li>
                            <li className={this.state.isShowInstruction ? "active" : null } onClick={() => this.toggleActiveWindow(4)}>
                                <span><Tooltip title="Instruction" placement="left-start">
                                    <IconButton style={{fontSize: '1rem', color: 'hsl(186, 100%, 94%)'}}>
                                        <AiOutlineQuestionCircle/>
                                    </IconButton>
                                    </Tooltip>
                                </span>
                                <p>Instruction</p>
                            </li>
                            {/* <li>
                                <span>
                                    <IconButton style={{fontSize: '1rem', color: 'hsl(186, 100%, 94%)'}}>
                                        <BsMic/>
                                    </IconButton>
                                </span>
                                <p>something</p>
                            </li> */}
                           
                        </ul>
                    </div>

                    {
                    this.state.isChat ?   
                    <div className="right-retrille">
                        <div className="right-retrille-main">
                            <div className="chat-content-retrille">
                            <ul className="chat" ref={(ref) => this.messagesRef = ref}>
                          
                            {messages.map((data, index) => (
                                <div key={data._id}>
                                    {data.me ? this.renderMessage('self', data) : (this.renderMessage('other', data))}
                                </div>
                            ))}


                            </ul>
                            </div>
                            {!(reportViolations === null) ? <Draggable style={{
                                        zIndex: 1111,
                                        position: 'absolute',
                                        cursor: 'move',
                                        maxHeight: '40rem',
                                        left: '50%',
                                        marginRight: '1rem', 
                                        transform: 'translate(-50%, 0)',
                                    }}>
                                <div className="form-config-retrille">
                                    <form onSubmit={this.handleSubmitReportMessage}>
                                    <ul>
                                        <li>
                                            <h4>Report Violations</h4>
                                        </li>
                                        <li>
                                            { this.state.message ? <p className={classNames('app-msg', _.get(this.state.message, 'type'))}>
                                                {_.get(this.state.message, 'body')}
                                            </p> : null } 
                                        </li>
                                        <div className="deliver"></div>
                                        <label>Infos Message</label>
                                        <li>
                                
                                        </li>
                                        <li>
                                           
                                        </li>
                                       
                                        <li>
                                            <button type="submit" id="speakBtn" className="login-btn">{(this.state.reportViolations === null) ? "Close Report" : "Send Report" }</button>
                                        </li>
                                    </ul>
                                    </form>
                                </div>
                            </Draggable>
                            :
                            null
                            }
                            {showSettingVoice ? <Draggable style={{
                                        zIndex: 1111,
                                        position: 'absolute',
                                        cursor: 'move',
                                        maxHeight: '40rem',
                                        left: '50%',
                                        marginRight: '1rem', 
                                        transform: 'translate(-50%, 0)',
                                    }}>
                                <div className="form-config-retrille">
                                    <form onSubmit={this.handleSubmitChangeConfig}>
                                    <ul>
                                        <li>
                                            <h4>Configuration-reTrille</h4>
                                        </li>
                                        <div className="deliver"></div>
                                        <span><h5>Micro Language</h5></span>
                                        <li>
                                            <line className="voice-form">
                                            <label>Micro</label>
                                            <input name="" value = {_.get(detailConfig, 'micLang')} onChange={(e) => this.onTxtfieldChange(e) } list="micList"></input>
                                            <datalist id="micList">
                                                {mic.map((data, key) => {
                                                    return (
                                                        <option key={key} label={data.name} value={data.value}></option>
                                                    )
                                                })}
                                            </datalist>
                                            </line>
                                        </li>
                                        <span><h5>Language Translate</h5></span>
                                        <li>
                                            <span>
                                                <label for="langNoti">Notification Language</label>
                                                <input name="notifiLang" id="langNoti" value = {_.get(detailConfig, 'notifiLang')} onChange={(e) => this.onTxtfieldChange(e) } list="browsers"></input>
                                            </span>
                                            
                                            <span>
                                                <label for="langMessage">Message Language</label>
                                                <input name="msgLang" id="langMessage" value = {_.get(detailConfig, 'msgLang')} onChange={(e) => this.onTxtfieldChange(e) } list="browsers"></input>
                                            </span>
                                            <datalist id="browsers">
                                                {lang.map((data, key) => {
                                                    return (
                                                        <option key={key} label={data.name} value={data.value}></option>
                                                    )
                                                })}
                                            </datalist>
                                        </li>
                                        <span><h5>Voice Speaker</h5></span>
                                        <li>
                                            <line className="voice-form">
                                            <label>Voice</label>
                                            <input name="voice" value = {_.get(detailConfig, 'voice')} onChange={(e) => this.onTxtfieldChange(e) } list="voicesList"></input>
                                            <datalist id="voicesList">
                                                {voices.map((data, key) => {
                                                    return (
                                                        <option key={key} label={data.name} value={data.value}></option>
                                                    )
                                                })}
                                            </datalist>
                                            </line>
                                        </li>
                                        <li>
                                            <span>
                                                <label for="rateFld">Speed</label>
                                                <input name="rate" type="number" id="rateFld" min="0.2" max="2" step="0.1" value = {_.get(detailConfig, 'rate')} onChange={(e) => this.onTxtfieldChange(e) } />
                                            </span>
                                            <span>
                                                <label for="rateFld">Pitch</label>
                                                <input name="pitch" type="number" id="rateFld" min="0.2" max="2" step="0.1" value = {_.get(detailConfig, 'pitch')} onChange={(e) => this.onTxtfieldChange(e) } />
                                            </span>
                                        </li>
                                        <li>
                                            <button type="submit" id="speakBtn" className="login-btn">{this.state.changeConfig ? "Test Speaker" : "Save Config" }</button>
                                        </li>
                                    </ul>
                                    </form>
                                </div>
                            </Draggable>
                            :
                            null
                            }
                            {/* <span>{this.state.msgTranslate}</span> */}
                            <div className="right-navbar">
                                <ul className="right-navbar-write">
                                    <li onClick={() => this.setState({showToolsMsg: !showToolsMsg})}>
                                        <span><Tooltip title="Show Tools Messages" placement="left-start">
                                            <IconButton style={{fontSize: '1rem', color: 'hsl(186, 100%, 94%)'}}>
                                                <BiDotsVerticalRounded />
                                            </IconButton></Tooltip>
                                        </span>
                                        <p></p>
                                    </li>
                                    <li onClick={() => this.setState({isMuteVoice: !isMuteVoice})}>
                                        <span><Tooltip title="Mute Voice" placement="left-start">
                                            <IconButton style={{fontSize: '1rem', color: 'hsl(186, 100%, 94%)'}}>
                                                {isMuteVoice ? <RiVolumeMuteLine/> : <GiSpeaker />}
                                            </IconButton></Tooltip>
                                        </span>
                                        <p></p>
                                    </li>
                                    <li onClick={() => this.setState({isHiddenMsg: !isHiddenMsg})} >
                                        <span><Tooltip title="Hidden Messages" placement="left-start">
                                            <IconButton style={{fontSize: '1rem', color: 'hsl(186, 100%, 94%)'}}>
                                                {isHiddenMsg ? <BiHide /> : <FaEye /> }
                                            </IconButton></Tooltip>
                                        </span>
                                        <p></p>
                                    </li>
                                    <li onClick={this.handleSetting} tooltip="">
                                        <span><Tooltip title="Setting-VS" placement="left-start">
                                            <IconButton style={{fontSize: '1rem', color: 'hsl(186, 100%, 94%)'}}>
                                                <AiOutlineSetting />
                                            </IconButton></Tooltip>
                                        </span>
                                        <p></p>
                                    </li>
                                    
                                
                                    
                                </ul>
                            </div>  
                        </div>
                        <div className="retrille-main-content" >

                            <li>
                            <div className="input-mic-retrille">
                                <div className="icon-mic-retrille">
                                    <span>
                                        <BsMic style={{fontSize: '2rem', color: 'rgba(199, 99, 199, 0.9)'}} onClick = {this.toggleListen2}/>                                  
                                    </span>
                                </div>
                                {/* <span>Click and Hold</span> */}
                            </div>
                            </li>

                        </div>
                    </div>
                    :
                    null
                    }
                    {
                    this.state.isWrite ? 
                    
                    <div className="right-retrille">
                        <div className="right-retrille-main">
                        <div className="chat-content-retrille">
                            <div className="chat-write-main">
                                <div className="chat-write-final" ref={(ref) => this.messagesRef = ref}>
                                    <div className="chat-write-final-content" id='final'>Paragraph is edited</div>
                                </div>
                                <div className="chat-write-interim" id='interim' >temporary word</div>
                            </div>
                        </div>
                        <div className="right-navbar">
                        <ul className="right-navbar-write">
                            <li onClick={() => this.copy_data('final')}>
                                <span><Tooltip title="Copy Text" placement="left-start">
                                    <IconButton style={{fontSize: '1rem', color: 'hsl(186, 100%, 94%)'}}>
                                        <MdContentCopy />
                                    </IconButton></Tooltip>
                                </span>
                                <p></p>
                            </li>
                            <li onClick={this.speakParagraph}>
                                <span><Tooltip title="Speak Text" placement="left-start">
                                    <IconButton style={{fontSize: '1rem', color: 'hsl(186, 100%, 94%)'}}>
                                        <GiSpeaker />
                                    </IconButton></Tooltip>
                                </span>
                                <p></p>
                            </li>
                            <li onClick={() => this.hidden_data('final')} >
                                <span><Tooltip title="Hidden Text" placement="left-start">
                                    <IconButton style={{fontSize: '1rem', color: 'hsl(186, 100%, 94%)'}}>
                                        <BiHide />
                                    </IconButton></Tooltip>
                                </span>
                                <p></p>
                            </li>
                            <li onClick={() => this.refresh_write('final', 'interim')} tooltip="">
                                <span><Tooltip title="Refresh Text" placement="left-start">
                                    <IconButton style={{fontSize: '1rem', color: 'hsl(186, 100%, 94%)'}}>
                                        <MdRefresh />
                                    </IconButton></Tooltip>
                                </span>
                                <p></p>
                            </li>
                            
                            {/* <li>
                                <span>
                                    <IconButton style={{fontSize: '1rem', color: 'hsl(186, 100%, 94%)'}}>
                                        <BsMic/>
                                    </IconButton>
                                </span>
                                <p></p>
                            </li> */}
                        </ul>
                    </div>
                    </div>

                        <div className="retrille-main-content" >
                            <li>
                                <div className="input-mic-retrille">
                                    <div className="icon-mic-retrille">
                                        <span>
                                            <BsMic style={{fontSize: '2rem', color: 'rgba(199, 99, 199, 0.9)'}} onClick = {this.toggleListen}/>                                  
                                        </span>
                                    </div>
                                    {/* <span>Click and Hold</span> */}
                                </div>
                            </li>
                        </div>
                        
                    </div>
                    : 
                    null
                    }
                    {
                        this.state.isShowFormAddMessage ? 
                        <div className="right-retrille">
                            <div className="chat-content-retrille">
                                <div className="form-addmessgage-retrille">
                                    <ul>
                                        {this.state.checkNewMessageDefault ? <li>
                                            <LoadingMini></LoadingMini>
                                        </li> : null}
                                        <li>
                                            <p>Add Your Message for Retrille</p>
                                        </li>
                                        <li>
                                            { this.state.message ? <p className={classNames('app-msg', _.get(this.state.message, 'type'))}>
                                                {_.get(this.state.message, 'body')}
                                            </p> : null } 
                                        </li>
                                        
                                        <li>
                                        <span>
                                            <label htmlFor="text">Type message</label>
                                            <input value={this.state.type} onChange={(event) => {
                                                this.setState({type: event.target.value})
                                            }} list="browsers"></input>
                                            <datalist id="browsers">
                                                {types.map((data, key) => {
                                                    return (
                                                        <option key={key} value={data}></option>
                                                    )
                                                })}
                                            </datalist>
                                        </span>

                                        <span>
                                            <label htmlFor="text">Language message</label>
                                            <input value={this.state.langMessage}
                                            onChange={(event) => this.setState({ langMessage: event.target.value })} list="browser"></input>
                                        </span>
                                            <datalist id="browser">
                                                {lang.map((data, key) => {
                                                    return (
                                                        <option key={key} label={data.name} value={data.value}></option>
                                                    )
                                                })}
                                            </datalist>
                                        </li>
                                        <li>
                                            <label htmlFor="text">Key word</label>
                                            <input 
                                            placeholder="Your Key word" 
                                            required type="text" name="keyWord"
                                            value = {this.state.keyWord} 
                                            onChange = {({target}) =>
                                                this.setState({keyWord: target.value})
                                            } 
                                            id="keyWord" ></input>
                                        </li>
                                        <li>
                                        <label htmlFor="message">Message</label>
                                            <input 
                                            placeholder="Your Message" 
                                            required type="text" name="txtMessage"
                                            value = {this.state.txtMessage} 
                                            onChange = {({target})=>
                                                this.setState({txtMessage: target.value})
                                            } 
                                            id="txtMessage" ></input>
                                            <lable className="check-show-author">
                                                <input type="checkbox" name="showAuthor" id="showAuthor"
                                                checked={this.state.showAuthor} onChange={(e) => this.setState({showAuthor: e.target.checked})}
                                                />
                                                <span  htmlFor="showAuthor" className="checkmark" >Show name's author</span>
                                            </lable>
                                        </li>
                                        <li> 
                                            <button disabled={this.state.checkNewMessageDefault ? true : false} onClick = {this.toggleSubmit}
                                            type="button" className="login-btn">Add Message</button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="retrille-main-content" onClick={() => this.toggleActiveWindow(1)}>
                                <li>
                                <div className="input-mic-retrille">
                                    <div className="icon-mic-retrille">
                                        <span>
                                            <BsMic style={{fontSize: '2rem', color: 'rgb(255,255,255)'}} onClick = {this.toggleListen2}/>                                  
                                        </span>
                                    </div>
                                    {/* <span>Click and Hold</span> */}
                                </div>
                                </li>

                            </div>
                        </div>
                        : null
                    }
                      {
                        this.state.isShowInstruction ? 
                        <div className="right-retrille">
                            <div className="instruction-retrille">
                                {listQuestions.map((quest, key) =>{
                                    
                                    return <div key={key} className={`instruction ${(this.state.questKey.includes(key.toString()) ? 'active' : null)}`}>
                                        <div onClick={() => this.toggleActiveQuestion(key)} className="header-quest">
                                            <span>{quest.title}</span>
                                            <span>
                                                <IconButton>
                                                    { (this.state.questKey.includes(key.toString())) ? <RiSubtractLine /> : <BsPlus /> }
                                                </IconButton>
                                            </span>
                                        </div>
                                        {/* <div className={`body-quest ${this.state.activeQuestTxt ? "active" : ""}`}> */}
                                        <div className={`body-quest ${(this.state.questKey.includes(key.toString()) ? 'active' : null)}`}>
                                            {quest.resolve}<br />{quest.resolve1}<br />{quest.resolve2}<br />{quest.resolve3}<br />{quest.resolve4}
                                        </div>
                                    </div>

                                })}
                            </div>
                        </div>
                        : null
                    }
                </div>

                <NotificationProvider state = {this.state.addNotiSignal} type = {this.state.typeNoti} message = {this.state.newNotification} />

            </div>
        )

    }

}
