import React, { Component } from 'react';
import defaultImg from '../images/svgnds.png';
import _ from 'lodash';
import classNames from 'classnames';
// import { IconButton } from '@material-ui/core';
// import { MdEdit, MdCheck } from 'react-icons/md';
// import { RiImageEditFill } from 'react-icons/ri';
// import Dropzone from "react-dropzone";
import {encrypt, encrypt2} from '../helpers/en_deCrypt';

import fetchJsonp from "fetch-jsonp";
import { Redirect } from 'react-router-dom';
const GeoAPI = "https://ipapi.co/jsonp";



export class ChangePassword extends Component {
    constructor(){
        super()
        this.state = {

            isShowForm: false,
            message: null,
            // type: '',
            newPassword: '',
            reNewPassword: '',
            emailDefault: '',
            tokenDefault: '',
            email: '',
            ipClient: '',
            changed: false,
            backHome: false,
        }


    }
    fetchIPclient = () => {
        try{
            fetchJsonp(`${GeoAPI}`)
            .then(function(response) {
                return response.json();
              })
              .then(json => {
                this.setState({ ipClient: json})
              })
              .catch(function(ex) {
                console.log("parsing failed", ex);
              });
        }
        catch (err){ console.log(err) }

      };
    handleEditPassword = (e) => {
        e.preventDefault();
        const { store } = this.props;
       
        const {newPassword, reNewPassword, emailDefault, tokenDefault, email, ipClient, changed} = this.state;
        if(changed){
            this.setState({
                message: null,
                backHome: true
            })
        }
        if(email !== emailDefault) {
            this.setState({
                message: {
                    body: 'Email not same Your require',
                    type: 'error'
                },
            })
            
        }else{
            if(reNewPassword === newPassword){
                const hashNewPasswowrd = encrypt2(encrypt(newPassword));
                store.requestChangePassword(email, hashNewPasswowrd, tokenDefault, ipClient).then((_) => {
                    this.setState({
                        message: {
                            body: 'Saved Successfull, You can login with new password',
                            type: 'success'
                        },
                        changed: true,
                        email: null,
                        reNewPassword: null,
                        newPassword: null,
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
               
            }
            else{
                this.setState({
                    message: {
                        body: 're-Password not Match',
                        type: 'error'
                    },
                })
            }
        }
        
    }
    componentDidMount(){
        this.fetchIPclient();
        // console.log("state change: ", this.state.changed)
        const emailDefault = window.location.search.substring(1);
        const tokenDefault = window.location.hash.substring(1);
        if(emailDefault && tokenDefault){
            this.setState({
                isShowForm: true,
                message: null,
                emailDefault: emailDefault,
                tokenDefault: tokenDefault,
            })
        }

        // console.log(emailDefault, tokenDefault);
        // console.log('Didmount and fetch ipClient');
    }
    componentWillUnmount(){
        console.log('Unmount');
    }
    render() {
        const {message, backHome} = this.state
        if(backHome){
            return <Redirect to={"/page3"}/>
        }
        return (
            <>
                {this.state.isShowForm ? <div className="user-form">
                    <form onSubmit={this.handleEditPassword}>
                    <ul className="form-container">
                        <li>
                            <h4>Change Password</h4>
                        </li>
                        <li>
                            { message ? <p className={classNames('app-msg', _.get(message, 'type'))}>
                                {_.get(message, 'body')}
                            </p> : null } 
                        </li>                    
                        <li>
                            <label htmlFor="email">Email Address</label>
                            <input 
                            placeholder="Your Email Address" 
                            required type="email" name="email"
                            value = {this.state.email} 
                            onChange = {({target})=>{
                                this.setState({ email: target.value })
                            }} 
                            id="email" ></input>
                        </li>
                        <li>
                            <label htmlFor="password">New Password</label>
                            <input 
                            autoComplete = {'off'} 
                            placeholder="New-password" 
                            required type="password"
                            value = {this.state.newPassword} 
                            onChange = {({target})=>{
                                this.setState({ newPassword: target.value })
                            }} 
                            id="password" name="password" ></input>
                        </li>
                        <li>
                            <label htmlFor="repassword">Comfirm new Password</label>
                            <input
                            placeholder="Re-password" 
                            required type="password" name="repassword"
                            value = {this.state.reNewPassword}
                            onChange = {({target})=>{
                                this.setState({ reNewPassword: target.value })
                            }} 
                            id="repassword" ></input>
                        </li>
                        <div className="footer-menu">
                            <div className="img">
                                <img style={{maxHeight: "5rem", maxWidth: "5rem"}} src={defaultImg} alt="nds"/>
                            </div>
                            <div className="btn-cc">
                            <li>
                                <button type="submit" className="login-btn">{!this.state.changed ? 'Save New-Password' : 'Back Home Chat Page' }</button>
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
export default ChangePassword