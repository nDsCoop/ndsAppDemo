import React, { Component } from 'react';
import defaultImg from '../images/svgnds.png';
import _ from 'lodash';
import classNames from 'classnames';
import { IconButton } from '@material-ui/core';
// import { MdEdit, MdCheck } from 'react-icons/md';
import { TiDeleteOutline } from 'react-icons/ti';
// import Dropzone from "react-dropzone";
// import {encrypt, encrypt2} from '../helpers/en_deCrypt';
import fetchJsonp from "fetch-jsonp";
// import { Redirect } from 'react-router-dom';
import UpLoadFilePhoto from './UpLoadFilePhoto';
import axios from '../apis/axios'
// const macaddress = require('macaddress');
const GeoAPI = "https://ipapi.co/jsonp";

class SendVerifyCommunication extends Component {
    constructor(){
        super()
        this.state = {
            message: null,
            typeIdentify: 'peopleID',
            info : {
                email: '',
                ipClient: '',
                age: '',
                fullName: '',
                fullAddress: '',
                numbermobile: '',
                currentLive: '',
                gender: '',
                nationality: '',
                deviceName: '',
                profession: '',
                company: '',
            },
            step1: false,
            step2: false,
            token: '',
            email: '',
            backHome: false,
            messages: [],
        }


    }


   

    fetchIPclient = () => {
        try{
            fetchJsonp(`${GeoAPI}`)
            .then(function(response) {
                return response.json();
              })
              .then(json => {
                let { info } = this.state;
                const field = 'ipClient';
                info[field] = json;
                this.setState({ info: info})
              })
              .catch(function(ex) {
                console.log("parsing failed", ex);
              });
        }
        catch (err){ console.log(err) }

    }

    handleSendRequire = (e) =>{
        e.preventDefault();
        const { store } = this.props;
        const { info, step1} = this.state;
        if(step1){
            this.setState({
                message: {
                    body: "Step proccessing Verify",
                    type: 'success'
                }
            })
            this.props.onClickOutSide();
            this.props.handleShowFormVerifyEmail();
            console.log("Step 2 proccessing")
        }else{
            this.setState({
                message: null
            }, () => {
                if(info.email){
    
                    store.sendVerifyCommunication(info).then((response) => {
                        // console.log("data response ", response)
                        this.setState({
                            message: {
                                body: 'First Step Is Succeeded',
                                type: 'success'
                            },
                            token: response.tokenId,
                            email: response.email,
                            step1: true
    
                        })
                    }).catch((err) => {
                        console.log(err);
                        this.setState({
                            message: {
                                body: err,
                                type: 'error'
                            }
                        })
                        });
    
                }else{
                    this.setState({
                        message: {
                            body: 'An another Error',
                            type: 'error'
                        }
                    })
                }
    
            })
        }
       
    }
    onTxtfieldChange = (e) => {
        let { info } = this.state;
        const field = e.target.name;
        info[field] = e.target.value;
        this.setState({
            info: info
        });
    }

    componentDidMount(){
        window.addEventListener('mousedown', this.onClickOutSide0);
        this.fetchIPclient();
        console.log('Didmount and fetch Client', this.state.changed)
    }
    componentWillUnmount(){
        window.removeEventListener('mousedown', this.onClickOutSide0);
        console.log('Unmount');
    }
    componentDidUpdate(){
       
    }
    onClickOutSide0 = (e) => {
        if(this.ref && !this.ref.contains(e.target)){
            // console.log("Here click out side login form!");
            this.props.onClickOutSide();
        }
    }
    delImage = (img) => {
        const {messages} = this.state;
        let message = _.filter(messages, (currentObject) => {
            return currentObject.id !== img;
        });
        this.setState({
            messages: message
        })
       
    }
    setSuccessful = () => {
        this.setState({
            message: {
                body: 'Sent successful! We check it out as soon as possible.',
                type: 'success'
            },
            backHome: true,
            step2: true,
            token: null,
            messages: [],
            typeIdentify: 'peopleID'
        })
    }
    renderMessage = (data) => {
        // console.log('===========', data)
        return (
        <>
             <div className="icon-del-image">
                <IconButton style={{fontSize: '2rem'}}>
                    <TiDeleteOutline onClick={() => {
                        this.delImage(data.id)
                    }} />
                </IconButton>
            </div>
            <img
                style={{
                width: '100%',
                height: 200,
                cursor: 'pointer',
                }}
                src={data.data}
                alt='img-update'>
            </img>
           
        </>
        )
      }


    sendEmailVerify = (e) => {
        e.preventDefault();
        let images = [];
        const { messages, typeIdentify, token, step2, email } = this.state;
        messages.map((data) => {
          return images = _.uniq(_.concat(images, data.data))
        })
        // console.log("will send: ", images)
        if(step2){
            this.setState({
                message: null  
            })
            this.props.handleShowFormVerifyEmail();
        }
        
        const post = {
            email: email,
            token: token,
            images: images,
            type: typeIdentify,
        }
        
        if(email && token){
            axios
            .post('/ndsapi/mail/verifyuser', post)
            .then(function(response) {
                console.log(response.data.status);
                console.log("Successful");
            }).catch(err => console.log(err))
            this.setSuccessful()
            return 'successfull'
        }else{
            this.setState({
                message: {
                    body: 'Error when send info, try again.',
                    type: 'error'
                }
            })
        }

    }


    render() {
        const {message, info, messages} = this.state
        const { showFormVerifyCommunicate , showFormVerifyEmail } = this.props
        return (
            <>
                {showFormVerifyCommunicate ? <div className="user-form" ref = {(ref) => this.ref = ref}>
                    <form onSubmit={this.handleSendRequire}>
                    <ul className="form-container">
                        <li>
                            <h4>Form Require Verify Communication</h4>
                        </li>
                        <li>
                            { message ? <p className={classNames('app-msg', _.get(message, 'type'))}>
                                {_.get(message, 'body')}
                            </p> : null } 
                        </li>
                        {!this.state.step1 ? <><li>
                            <label htmlFor="email">Email Address</label>
                            <input 
                            placeholder="Email Registed" 
                            required type="email" name="email"
                            value = {_.get(info, "email", '')}
<<<<<<< HEAD
                            onChange={(e) => this.onTxtfieldChange(e)}
                            autoFocus
=======
                            onChange={(e) => this.onTxtfieldChange(e) }
>>>>>>> baf3ed63bb22c8d11807d4c127297193e22183a8
                            id="email" ></input>
                        </li>
                        <li>
                            <label htmlFor="fullname">Full Name</label>
                            <input 
                            autoComplete = {'off'} 
                            placeholder="FullName" 
                            required type="text"
                            value = {_.get(info, "fullName", '')} 
                            onChange={(e) => this.onTxtfieldChange(e) }
                            id="fullName" name="fullName" ></input>
                        </li>
                        <li>
                            <label htmlFor="address">Full Address</label>
                            <input 
                            placeholder="Full Address" 
                            required type="text" name="fullAddress"
                            value = {_.get(info, "fullAddress", '')}
                            onChange={(e) => this.onTxtfieldChange(e) }
                            id="fullAddress" ></input>
                        </li>
                        <li>
                            <label htmlFor="currentlive">Staying</label>
                            <input 
                            placeholder="Staying Address" 
                            required type="text" name="currentLive"
                            value = {_.get(info, "currentLive", '')}
                            onChange={(e) => this.onTxtfieldChange(e) }
                            id="currentLive" ></input>
                        </li>
                        <li>
                            <label htmlFor="gender">Gender</label>
                            <form className="form-radio-gender">
                            <input type="radio" id="male" name="gender" value="male" checked={this.state.gender} onChange={(e) => this.onTxtfieldChange(e) } />
                            <label for="male">Male</label><br />
                            <input type="radio" id="female" name="gender" value="female" checked={this.state.gender} onChange={(e) => this.onTxtfieldChange(e) } />
                            <label for="female">Female</label><br />
                            <input type="radio" id="other" name="gender" checked={this.state.gender} value="lesbian" onChange={(e) => this.onTxtfieldChange(e) } />
                            <label for="other">Lesbian</label>
                            <input type="radio" id="other" name="gender" checked={this.state.gender} value="other" onChange={(e) => this.onTxtfieldChange(e) } />
                            <label for="other">Other</label>
                            </form>
                        </li>
                        <li>
                            <label htmlFor="age">Your Age</label>
                            <input 
                            placeholder="25" 
                            required type="number" name="age"
                            value = {_.get(info, "age", '')}
                           onChange={(e) => this.onTxtfieldChange(e) }
                            id="age" ></input>
                        </li>
                        <li>
                            <label htmlFor="munberphone">Your Number Mobile</label>
                            <input 
                            placeholder="0123456789" 
                            required type="number" name="numbermobile"
                            value = {_.get(info, "numbermobile", '')}
                           onChange={(e) => this.onTxtfieldChange(e) }
                            id="numbermobile" ></input>
                        </li>
                        <li>
                            <label htmlFor="nationality">Nationality</label>
                            <input 
                            placeholder="Nationality" 
                            required type="text" name="nationality"
                            value = {_.get(info, "nationality", '')}
                            onChange={(e) => this.onTxtfieldChange(e) }
                            id="nationality" ></input>
                        </li>
                        <li>
                            <label htmlFor="profession">Profession</label>
                            <input 
                            placeholder="Your profession" 
                            required type="text" name="profession"
                            value = {_.get(info, "profession", '')}
                            onChange={(e) => this.onTxtfieldChange(e) }
                            id="profession" ></input>
                        </li>
                        <li>
                            <label htmlFor="company">Name Company</label>
                            <input 
                            placeholder="Name Company" 
                            required type="text" name="company"
                            value = {_.get(info, "company", '')}
                           onChange={(e) => this.onTxtfieldChange(e) }
                            id="company" ></input>
                        </li>
                        <li>
                            <label htmlFor="email">Device Name</label>
                            <input 
                            placeholder="Your Device Name" 
                            required type="text" name="deviceName"
                            value = {_.get(info, "deviceName", '')}
                           onChange={(e) => this.onTxtfieldChange(e) }
                            id="deviceName" ></input>
                        </li></>
                        :
                        <li>
                            <p>
                            Request has been saved<br />
                            <b>NEXT YOU NEED TO SEND IDENTICATED PROOF THAT IT IS YOU</b><br />
                            Click the button below to continue
                            </p>
                        </li>

                        }                    
                       
                        <div className="footer-menu">
                            <div className="img">
                                <img style={{maxHeight: "5rem", maxWidth: "5rem"}} src={defaultImg} alt="nds"/>
                            </div>
                            <div className="btn-cc">
                            <li>
                                <button type="submit" className="login-btn">{!this.state.step1 ? 'Save Require' : 'Continue Send Email' }</button>
                            </li>
                            </div>
                        </div>
                    </ul>
                    </form>
                    </div>
                    :
                    null
                }
                 {showFormVerifyEmail ? <div className="user-form" ref = {(ref) => this.ref = ref}>
                    <form onSubmit={this.sendEmailVerify}>
                    <ul className="form-container">
                        <li>
                            <h4>Send Email Verify to nDsApp Group</h4>
                        </li>
                        <li>
                            { message ? <p className={classNames('app-msg', _.get(message, 'type'))}>
                                {_.get(message, 'body')}
                            </p> : null } 
                        </li>                    
                        <li>
                        <label>
                            <p>Type of identification:</p>
                            <select value={this.state.typeIdentify} onChange={(event) => this.setState({typeIdentify: event.target.value})}>
                                <option value="peopleID">People ID</option>
                                <option value="driverLicense">Driver License</option>
                                <option value="passport">Passport</option>
                                <option value="otherLicense">Equivalent Identity License</option>
                            </select>
                        </label>
                        </li>
                        <li>
                            <UpLoadFilePhoto  sendMessage={(message) => {
                                this.setState(prevState => {
                                    return {messages: [...prevState.messages, message]}
                                })
                            }}/>

                            <div className="photo-verify">
                                { 
                                messages.map(data => (
                                    <div key={data.id}>
                                        {(this.renderMessage(data))}
                                    </div>
                                ))
                                }
                            </div>
                        </li>

                       
                        <div className="footer-menu">
                            <div className="img">
                                <img style={{maxHeight: "5rem", maxWidth: "5rem"}} src={defaultImg} alt="nds"/>
                            </div>
                            <div className="btn-cc">
                            <li>
                                <button type="submit" className="login-btn">{!this.state.step2 ? 'Send Email Require' : 'Back Home Chat' }</button>
                            </li>
                            </div>
                        </div>
                    </ul>
                    </form>
                    </div>
                    :
                    null
                }




            </>

        )
    }

}
export default SendVerifyCommunication