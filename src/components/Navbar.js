import React, { Component } from 'react';
import logo from '../images/logoMain.svg';
import {VscChromeClose, VscMenu} from 'react-icons/vsc';
import {Link, useHistory } from 'react-router-dom';
// import styled from 'styled-components';

class Navbar extends Component {
	state = {
		isOpen:false,
		active: 'home',
		prevScrollpos: window.pageYOffset,
	}
	

	toggleVisibility = () => {
		let currentScrollPos = window.pageYOffset;
		// console.log(currentScrollPos, this.state.prevScrollpos)
		if (this.state.prevScrollpos > currentScrollPos) {
			document.getElementById("app-navbar").style.top = "0";
		  } else {
			document.getElementById("app-navbar").style.top = "-66px";
		}
		this.setState({
			prevScrollpos: currentScrollPos
		})
	 }


	handleToggle = () =>{
	this.setState({isOpen:!this.state.isOpen})
	}

	//click outside close tab Emoji
    onClickOutSide = (e) => {
        if(this.ref && !this.ref.contains(e.target)){
            // console.log("Here click out side login form!");
            this.setState({
				isOpen:false,
            })
        }
	}

	// componentDidUpdate(){
        
    //     console.log("componentDidUpdat");  
    // }

	componentDidMount(){
		let url = window.location.pathname;
		console.log("componentDidMount", url);

		window.addEventListener('mousedown', this.onClickOutSide);
		window.addEventListener('scroll', this.toggleVisibility);

		switch(url){
			case '/ndsweb/': 
				this.setState({active: 'home'})
			break;
			case '/ndsweb/music': 
				this.setState({active: 'music'})
			break;
			case '/ndsweb/weather': 
				this.setState({active: 'page2'})
			break;
			case '/ndsweb/chat': 
				this.setState({active: 'page3'})
			break;
			case '/ndsweb/retrille': 
				this.setState({active: 'retrille'})
			break;
			case '/ndsweb/about': 
				this.setState({active: 'about'})
			break;
			case '/ndsweb/wheel': 
				this.setState({active: 'wheel'})
			break;
			default:
				break;
		}
	}

	// handleClick = () => {
	// 	let history = useHistory;
	// 	this.setState({active: 'music', isOpen: false})
	// 	let newUrlIS =  window.location.origin + "/ndsappbeta/music";
	// 	history.pushState({}, null, newUrlIS);
	
    // }

	componentWillUnmount = () => {
		console.log("componentWillUnmount");
		window.removeEventListener('mousedown', this.onClickOutSide);
		window.removeEventListener('scroll', this.toggleVisibility);
	}

	
	 render() {

	 	return(
	 		<nav id="app-navbar" className="app-navbar" ref = {(ref) => this.ref = ref}>
				<div onContextMenu={(e)=> e.preventDefault()} className="nav-center">

	 				<div onContextMenu={(e)=> e.preventDefault()} role="button" className="nav-header">
	 					<Link to="/ndsweb/">
	 						<img style={{maxHeight: "2.4rem", maxWidth: "2.4rem"}} className="logoApp" src={logo} alt="Beach Resort" />
	 					</Link>
	 					<button type="button" 
	 						className="nav-btn"
							onClick={this.handleToggle}
						>
						{
							this.state.isOpen ? <VscChromeClose className="nav-icon" /> : <VscMenu className="nav-icon" />
						}
	 					
	 					</button>
	 				</div>

					<ul className={this.state.isOpen ? "nav-links show-nav" : "nav-links"}>
						<li className={(this.state.active === 'home') ? 'active' : null }>
							<Link to="/ndsweb" onClick={() => this.setState({active: 'home', isOpen: false})} >Home</Link>
						</li>
						<li className={(this.state.active === 'music') ? 'active' : null }>
							<Link to="/ndsweb/music"  onClick={() => this.setState({active: 'music', isOpen: false})} >Music</Link>
						</li>
						<li className={(this.state.active === 'page2') ? 'active' : null }>
							<Link to="/ndsweb/weather" onClick={() => this.setState({active: 'page2', isOpen: false})} >Weather</Link>
						</li>
						<li className={(this.state.active === 'page3') ? 'active' : null }>
							<Link to="/ndsweb/chat" onClick={() => this.setState({active: 'page3', isOpen: false})}>Chat</Link>
						</li>
						<li className={(this.state.active === 'retrille') ? 'active' : null }>
							<Link to="/ndsweb/retrille" onClick={() => this.setState({active:'retrille', isOpen: false})}>ReTrille</Link>
						</li>
						<li className={(this.state.active === 'about') ? 'active' : null }>
							<Link  to="/ndsweb/about" onClick={() => this.setState({active: 'about', isOpen: false})}>About</Link>
						</li>
						<li className={(this.state.active === 'wheel') ? 'active' : null }>
							<Link to="/ndsweb/wheel" onClick={() => this.setState({active: 'wheel', isOpen: false})} >Wheel</Link>
						</li>
					</ul>
	 			</div>
	 		</nav>

	 		);
	 }
};

export default Navbar;