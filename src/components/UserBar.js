import React, { Component } from 'react';
import defaultImg from '../images/logoMainLar.svg';
import loadingImg from '../images/loadingImg.gif'
import _ from 'lodash';
import classNames from 'classnames';
import { IconButton, Tooltip } from '@material-ui/core';
import { MdEdit, MdCheck } from 'react-icons/md';
import { RiImageEditFill } from 'react-icons/ri';
import { IoIosLogIn } from 'react-icons/io';
import { GoVerified, GoUnverified } from 'react-icons/go';
import Dropzone from "react-dropzone";
import {encrypt, encrypt2} from '../helpers/en_deCrypt';
// import axios from "axios";

import fetchJsonp from "fetch-jsonp";
import ChangePassword from './ChangePassword';
import SendVerifyCommunication from './SendVerifyCommunication';
const GeoAPI = "https://ipapi.co/jsonp";


export class UserBar extends Component {
    constructor(){
        super()
        this.state = {
            message: null,
            showUserFrom : false,
            loadingRequire: false,
            isLogin: true,
            editAcc: false,
            editPassword: false,
            isFormGetPassword : false,
            showFormVerifyCommunicate: false,
            showFormVerifyEmail: false,
            edit: '',
            type:'text',
            oldPassword: '',
            newPassword: '',
            reNewPassword: '',
            email: '',
            userId: '',
            user: {
                email: '',
                password: '',
                repassword: '',
                name: '',
                ipClient: null,
                birthday: '',
                country: '',
                phone: '',
                ID: '',
            },
            // fieldFocus: 'email',
        }
       
    }

    openUserForm = () =>{
        this.setState({showUserFrom: true});
        // this.state.isLogin ? this.setState({fieldFocus: 'email'}) : this.setState({fieldFocus: 'name'});
    }

    //today need fix focus for app in all page
    // focusMethod = (fieldFocus) =>{
    //     document.getElementById(fieldFocus).focus();
    // }
    

    handleSendGetPassword = (e) => {
        e.preventDefault();
        const {store} = this.props;
        const {email} = this.state;
        store.requestGetPassword(email).then((_) => {
            this.setState({
                message: {
                    body: `We have sent to ${email} a link, please check your email.`,
                    type: 'success'
                },
                email: null,
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

    isFormGetPassword = (e) => {
        e.preventDefault();
        this.setState({
            isFormGetPassword: true,
            showUserFrom: false,
            // fieldFocus: "password"
        })
    }


    handleEditPassword = (e) => {
        e.preventDefault();
        const {store} = this.props;
        const {oldPassword, newPassword, reNewPassword, user} = this.state;
        this.setState({
            message: null,
            loadingRequire: true
        }, () => {
            if(newPassword === reNewPassword){
               
                const hashNewPassword = encrypt2(encrypt(newPassword));
                const hashOldPassword = encrypt2(encrypt(oldPassword));

                store.editPassword(hashOldPassword, hashNewPassword, user.ipClient).then((_) => {
                    this.setState({
                        message: {
                            body: 'Password changed',
                            type: 'success'
                        },
                        oldPassword: null,
                        newPassword: null,
                        reNewPassword: null,
                        loadingRequire: false

                    })
                }).catch((err) => {
                    console.log(err);
                    this.setState({
                        message: {
                            body: err,
                            type: 'error'
                        },
                        loadingRequire: false
                    })
                    });

            }else{
                this.setState({
                    message: {
                        body: 'Password not Comfirm or an another Error',
                        type: 'error'
                    },
                    loadingRequire: false
                })
            }


        })
    }

    changeFormEdit = (e) => {
        e.preventDefault();
        this.setState({
            showUserMenu: false,
            editPassword: true,
            fieldFocus: "getEmail"
        });

    }

    handleCreateR = () => {
       
        const userId = this.generateId(12);
        let { user } = this.state;
        const field = 'ID';
        user[field] = userId;
        this.setState({ user: user})
        console.log('ID of user random: ', userId);
    }

    dec2hex = (dec) => {
        return dec < 10
        ? '0' + _.toString(dec)
        : dec.toString(16)
    }

    generateId = (len) => {
        var arr = new Uint8Array((len || 40) / 2)
        window.crypto.getRandomValues(arr)
        return Array.from(arr, this.dec2hex).join('')
    }

    changeControl = (e) => {
        e.preventDefault();
        this.handleCreateR();
        let {isLogin} = this.state;
        this.setState({
            isLogin: !isLogin,
        })
    }

    onDrop = (files) => {
        const {store} = this.props;
        // console.log("file goc: ",files);
        let formData = new FormData();
        formData.append("myImage", files[0]);
        store.uploadUserAvatar(formData);
        // console.log("file format: ",formData);
    }
    handleEditNow = (e) => {
        e.preventDefault();
        const { store } = this.props;
        const { user, edit } = this.state;
        store.editUser(edit, user[edit])


        this.setState({
            edit: '',
            editAcc: false
        })
    }
    fetchIPclient = () => {
        try{
            fetchJsonp(`${GeoAPI}`)
            .then(function(response) {
                return response.json();
              })
              .then(json => {
                let { user } = this.state;
                const field = 'ipClient';
                user[field] = json;
                console.log("user from device: ", user)
                this.setState({ user: user})
              })
              .catch(function(ex) {
                console.log("parsing failed", ex);
              });
        }
        catch (err){ console.log(err) }

      };
    onClickOutSide = (e) => {
        if(this.ref && !this.ref.contains(e.target)){
            console.log("Here click out side login form!");
            this.setState({
                showUserFrom: false,
                showUserMenu: false,
                editPassword: false,
                isFormGetPassword: false,
                message: null,
                
            })
        }
    }
    onClickhiddenshowFormVerifyCommunicate = () => {
        console.log("Here click out side login form!");
        this.setState({
            message: null,
            showFormVerifyCommunicate: false,
        })
    }
    componentDidMount(){
        window.addEventListener('mousedown', this.onClickOutSide);
        this.fetchIPclient();
        console.log('Didmount and fetch Client');
    }
    componentWillUnmount(){
        window.removeEventListener('mousedown', this.onClickOutSide);
        console.log('Unmount');
    }
   
    onSubmit = (e) => {

        const { store } = this.props;
        const { user , isLogin } = this.state;
        const hashPassword = encrypt2(encrypt(user.password));
        e.preventDefault();
        this.setState({
            message: null,
            loadingRequire: true
        }, () => {
            if(isLogin){
                try{
                    store.login(user.email, hashPassword, user.ipClient.ip).then((_) => {
                        const {user} = this.state;
                            user.ipClient = null;
                            user.password = null;
                            user.repassword = null;
                        this.setState({
                            message: null,
                            showUserFrom: false,
                            showUserMenu: false,
                            user: user,
                            loadingRequire: false
                        })
        
                    }).catch((err) => {
                        console.log(err);
                        this.setState({
                            message: {
                                body: err,
                                type: 'error'
                            },
                            loadingRequire: false
                        })
                    });
                }
                catch (err) {
                    console.log(err);
                    this.setState({
                        message: {
                            body: 'An error occurred in client, please try again later!',
                            type: 'error'
                        },
                        loadingRequire: false

                    })
                }
               
            } else {
                if(user.password === user.repassword){
                    user.password = hashPassword;
                    console.log(user)
                    store.register(user).then((_) => {
                        this.setState({
                            message: {
                                body: 'User created',
                                type: 'Success'
                            },
                            loadingRequire: false
                        }, () => {
                            // now login this user
                            store.login(user.email, hashPassword).then((_) => { 
                            //
                            const {user} = this.state;
                            user.ipClient = null;
                            user.password = null;
                            user.repassword = null;
                            user.phone = null;
                            this.setState({
                                message: null,
                                showUserFrom: false,
                                showUserMenu: false,
                                isFormGetPassword: false,
                                user : user,
                                loadingRequire: false
                            })
                            
                        }).catch((err) => {
                            console.log(err);
                            this.setState({
                                message: {
                                    body: err,
                                    type: 'error'
                                },
                                loadingRequire: false
                            })
                            });
                        })
                    }).catch((err) => {
                        console.log(err);
                        this.setState({
                            message: {
                                body: err,
                                type: 'error'
                            },
                            loadingRequire: false
                        })
                    });
                }else{
                    console.log(user.repassword, 'and' , user.password);
                    this.setState({
                        message: {
                            body: 'Password not Comfirm',
                            type: 'error'
                        },
                        loadingRequire: false
                    })
                }
                
            }
           
        })

    }

    onTxtfieldChange = (e) => {
        let { user } = this.state;
        const field = e.target.name;
        user[field] = e.target.value;
        this.setState({
            user: user
        });
    }
    onTxtfieldEChange = (e) => {
        let { user } = this.state;
        const field = e.target.name;
        user[field] = e.target.value;
        this.setState({
            user: user
        });
    }

    render() {
        const { user, message, isLogin, edit, type, editAcc, isFormGetPassword } = this.state;
        const { store } = this.props;
        const me = store.getCurrentUser();
        const profileImg = _.get(me, 'avatar');
        const name = _.get(me,'name');
        const ID = _.get(me, 'ID');
        const email = _.get(me, 'email');
        const country = _.get(me, 'country');
        const phone = _.get(me, 'phone');
        const birthday = _.get(me, 'birthday');
        const verified = _.get(me, 'verify');

       
        return (
    <>
        <div className="user-bar">
            
            { !me ?<> <button type="button" onClick={this.openUserForm} className="login-btn">Sign In</button>
                <div className="login-btn-mini">
                    <IconButton style={{ color: "rgba(199, 119, 199, 0.9)"}} onClick={this.openUserForm}>
                        <IoIosLogIn />
                    </IconButton>
                </div>
            </> : null}

            { me ? <> <div className="name-user">{_.get(me, 'name')}</div>
                <div className="img-user">
                    <img className="img-profile" src={profileImg ? `https://ndschatserver.herokuapp.com/${profileImg}` : defaultImg} onClick={(e) => this.setState({showUserMenu: true})}  alt="user-img"></img>
                </div> </> : null 
            }
           

            { me && this.state.showUserMenu ?  <div className="user-form" ref = {(ref) => this.ref = ref}>
                <form>
                {   this.state.loadingRequire ? <div className="loadingGif-User">
                        <img className="img-loading-require" src = {loadingImg} alt="" />
                    </div>
                    :
                    null
                }
                <ul className="form-container">
                    <li>
                        <h4>Your Account</h4>
                    </li>
                    {
                        editAcc ? <div>
                        <label style={{textTransform: 'capitalize'}} htmlFor={edit}>
                            {edit}
                        </label>
                        <div className="form-edit">
                            <div className="input-edit">
                            <input onChange={(e) => this.onTxtfieldEChange(e) } 
                            placeholder="type your change here"
                            required type={type} name={edit}
                            value = {_.get(user, {edit})} 
                            id={edit} ></input>
                            </div>
                        <div className="btn-edit">
                            <IconButton>
                                <MdCheck style={{ color: "rgba(23, 138, 8, 0.959)"}} onClick={this.handleEditNow} />
                            </IconButton>
                        </div>
                        </div>
                       
                    </div>
                    :
                    null
                    }
                    <li className ="header-menu">
                        <img src={`https://ndschatserver.herokuapp.com/${profileImg}`} alt="user-img" />
                        <div className="edit-avatar-icon">
                            <Dropzone onDrop={this.onDrop}>
                                {({getRootProps, getInputProps}) => (
                                    <section>
                                    <div {...getRootProps()}>
                                        <input {...getInputProps()} />
                                            <RiImageEditFill />
                                    </div>
                                    </section>
                                )}
                            </Dropzone>
                        </div>
                        <span>{name}{" "}{verified ? <Tooltip title="Account have been Verified" placement="left-start"><GoVerified style={{color: 'rgb(36, 139, 10)', fontSize: '1rem'}} /></Tooltip> : <GoUnverified style={{color: 'rgb(202, 161, 46)', fontSize: '1rem'}} onClick={() => this.setState({showFormVerifyCommunicate: true, showUserMenu: false})}/>}</span>
                    </li>
                    <div className ="body-menu">
                        <p htmlFor="email">Your Name: {name}</p>
                        <div>
                        <IconButton  style={{ color: "rgba(0, 0, 0, 0.5)"}}>
                            <MdEdit onClick = {() => this.setState({editAcc: true, edit: 'name', type: 'text'})} />
                        </IconButton>
                        </div>
                    </div>
                    <div className ="body-menu">
                        <p htmlFor="email">Birthday: {birthday}</p>
                        <div> <IconButton  style={{ color: "rgba(0, 0, 0, 0.5)"}}>
                            <MdEdit  onClick = {() => this.setState({editAcc: true, edit: 'birthday', type: 'date'})} />
                        </IconButton></div>
                    </div>
                    <div className ="body-menu">
                        <p htmlFor="email">ID User: {ID}</p>
                        <div> <IconButton  style={{ color: "rgba(0, 0, 0, 0.5)"}}>
                            <MdEdit  onClick = {() =>alert("You can't edit your ID!")} />
                        </IconButton></div>
                    </div>
                    <div className ="body-menu">
                        <p htmlFor="email">Email Address: {email}</p>
                        <div> <IconButton  style={{ color: "rgba(0, 0, 0, 0.5)"}}>
                            <MdEdit  onClick = {() =>alert("You can't edit your email address!")} />
                        </IconButton></div>
                    </div>
                    <div className ="body-menu">
                        <p htmlFor="email">Contact Number: {phone}</p>
                        <div> <IconButton  style={{ color: "rgba(0, 0, 0, 0.5)"}}>
                            <MdEdit  onClick = {() => this.setState({editAcc: true, edit: 'phone', type: 'number'})} />
                        </IconButton></div>
                    </div>
                    <div className ="body-menu">
                        <p htmlFor="email">Country: {country}</p>
                        <div> <IconButton  style={{ color: "rgba(0, 0, 0, 0.5)"}}>
                            <MdEdit  onClick = {() => this.setState({editAcc: true, edit: 'country'})} />
                        </IconButton></div>
                    </div>
                   
                    <div className="footer-menu">
                        <div className="img">
                            <img style={{maxHeight: "5rem", maxWidth: "5rem"}} src={defaultImg} alt="nds"/>
                        </div>
                        <div className="btn-cc">
                        <li>
                        <button onClick = { () => store.signOut()}
                        type="button" className="login-btn">Signout</button>
                        </li>
                    <li>
                        <button className="login-btn" onClick={this.changeFormEdit} >Change Password</button>
                    </li>
                        </div>
                    </div>
                </ul>
                </form>
                </div>
                :
                null
            }
             { !me && this.state.showUserFrom ? <div className="user-form" ref = {(ref) => this.ref = ref}>
                <form onSubmit= {this.onSubmit}>
                {   this.state.loadingRequire ? <div className="loadingGif-User">
                        <img className="img-loading-require" src = {loadingImg} alt="" />
                    </div>
                    :
                    null
                }
                <ul className="form-container">
                    <li>
                        <h4>Sign In / Register Your Account</h4>
                    </li>
                    <li>
                        { message ? <p className={classNames('app-msg', _.get(message, 'type'))}>
                            {_.get(message, 'body')}
                        </p> : null } 
                    </li>
                    {
                        !isLogin ? <li>
                        <label htmlFor="name">
                        Name
                        </label>
                        <input onChange={(e) => this.onTxtfieldChange(e) } 
                        placeholder="Your-Name" 
                        autoFocus
                        required type="text" name="name"
                        value = {_.get(user, 'name')} 
                        id="name" ></input>
                    </li>
                    :
                    null
                    }
                    
                    <li>
                        <label htmlFor="email">
                        Email
                        </label>
                        <input onChange={(e) => this.onTxtfieldChange(e) } 
                        placeholder="example.vn@nds.com" 
                        required type="email" name="email"
                        value = {_.get(user, 'email')} 
                        autoFocus
                        id="email" ></input>
                    </li>
                    <li>
                        <label htmlFor="password">Password</label>
                        <input onChange={(e) => this.onTxtfieldChange(e) }
                        autoComplete = {'off'} 
                        placeholder="Your-password" 
                        required type="password"
                        value = {_.get(user, 'password')} 
                        id="password" name="password" ></input>
                    </li>
                    {
                        !isLogin ? <li>
                        <label htmlFor="repassword">
                        Comfirm Password
                        </label>
                        <input onChange={(e) => this.onTxtfieldChange(e) } 
                        placeholder="Re-password" 
                        required type="password" name="repassword"
                        value = {_.get(user, 'repassword')} 
                        id="repassword" ></input>
                    </li>
                    :
                    null
                    }
                    <div className="footer-login">
                        <div className="img">
                            <img style={{maxHeight: "5rem", maxWidth: "5rem"}} src={defaultImg} alt="nds"/>
                        </div>
                        <div className="btn-cc">
                        <li>
                            <span onClick={this.isFormGetPassword} >Forget password?</span>
                        </li>
                        <li>
                            <button type="submit" className="login-btn">{isLogin ? 'Log In' : 'Create Now'}</button>
                        </li>
                        <li>
                        <button type="button" onClick = {this.changeControl}
                        className="login-btn" > { isLogin ? 'Create New Account?' : 'Already have an account?' } </button>
                      </li>
                        </div>
                    </div>
                </ul>
                </form>
                </div>
                :
                null
            }
                  {this.state.editPassword ? <div className="user-form" ref = {(ref) => this.ref = ref}>
                    <form onSubmit={this.handleEditPassword}>
                    {   this.state.loadingRequire ? <div className="loadingGif-User">
                        <img className="img-loading-require" src = {loadingImg} alt="" />
                        </div>
                        :
                        null
                    }
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
                            <label htmlFor="password">Current Password</label>
                            <input 
                            placeholder="Current password" 
                            required type="password" name="password"
                            value = {this.state.oldPassword} 
                            onChange = {({target})=>{
                                this.setState({ oldPassword: target.value })
                            }} 
                            autoFocus
                            id="password" ></input>
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
                            id="newPassword" name="newPassword" ></input>
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
                            <button type="submit" className="login-btn">Save New-Password</button>
                            </li>
                            </div>
                        </div>
                    </ul>
                    </form>
                    </div>
                    :
                    null
                }
                    {isFormGetPassword ? <div className="user-form" ref = {(ref) => this.ref = ref}>
                        <form onSubmit={this.handleSendGetPassword}>
                        <ul className="form-container">
                            <li>
                                <h4>Get Your Password</h4>
                            </li>
                            <li>
                                { message ? <p className={classNames('app-msg', _.get(message, 'type'))}>
                                    {_.get(message, 'body')}
                                </p> : null } 
                            </li>                    
                            <li>
                                <label htmlFor="text">Email</label>
                                <input 
                                placeholder="Your Email" 
                                required type="email" name="email"
                                value = {this.state.email} 
                                onChange = {({target})=>{
                                    this.setState({ email: target.value })
                                }} 
                                autoFocus
                                id="getEmail" ></input>
                            </li>
                            <div className="footer-menu">
                            <div className="img">
                                <img style={{maxHeight: "5rem", maxWidth: "5rem"}} src={defaultImg} alt="nds"/>
                            </div>
                            <div className="btn-cc">
                            <li>
                                <button type="submit" className="login-btn">Send Request</button>
                            </li>
                            </div>
                        </div>
                        </ul>
                        </form>
                        </div>
                        :
                        null
                    }
                    <ChangePassword store = { store }  />
                    <SendVerifyCommunication 
                    handleShowFormVerifyEmail = {() =>this.setState({showFormVerifyEmail: !this.state.showFormVerifyEmail})}
                    showFormVerifyEmail = {this.state.showFormVerifyEmail}
                    onClickOutSide ={this.onClickhiddenshowFormVerifyCommunicate} 
                    showFormVerifyCommunicate={this.state.showFormVerifyCommunicate} store = { store } />
        
        </div>
    </>
    )
    }
}

export default UserBar




