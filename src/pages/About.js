import React, { Component } from 'react';
import {Link, Route, Switch } from 'react-router-dom'
import {Helmet} from "react-helmet";
import DescriApp from "../../src/components/aboutApp/DescriApp" ;
import FeedbackApp from "../../src/components/aboutApp/FeedbackApp" ;
import ContributorsApp from "../../src/components/aboutApp/ContributorsApp" ;
import PrivateApp from "../../src/components/aboutApp/PrivateApp" ;
import HelpApp from "../../src/components/aboutApp/HelpApp" ;
<<<<<<< HEAD
import img from "../images/logoMain.svg";
import { Grid } from '@material-ui/core';
import { IoLogoFacebook, IoLogoTwitter, IoLogoLinkedin, IoLogoGithub } from 'react-icons/io';
import { VscGrabber, VscChromeClose } from 'react-icons/vsc';
export default class About extends Component {
	state={
		isOpen: false,
		isEnglish: false
	}
	handleToggle = () => {
		this.setState({isOpen: !this.state.isOpen})
	
	};
	handleToggleEnglish = () => {
		this.setState({isEnglish: !this.state.isEnglish})
	};

	openNewTab = (link) => {
		
			// window.location.assign(link);
			window.open(link, '_blank', 'noopener,noreferrer')
		
	}

	render() {
=======
import img from "../images/svgnds.png";
import { Grid } from '@material-ui/core';
import { IoLogoFacebook, IoLogoTwitter, IoLogoLinkedin, IoLogoGithub } from 'react-icons/io';
import { FaAlignLeft } from 'react-icons/fa';
export default class About extends Component {
	state={
		isOpen:false
	}
	handleToggle = () =>{
	this.setState({isOpen:!this.state.isOpen})
	
};
	 render() {
>>>>>>> baf3ed63bb22c8d11807d4c127297193e22183a8
		
	 	return(

			<div className="about-app">
				<Helmet>
<<<<<<< HEAD
					<title>About | nDsWeb</title>
				</Helmet>

=======
					<title>About | nDsBuilding</title>
				</Helmet>
>>>>>>> baf3ed63bb22c8d11807d4c127297193e22183a8
				<div className="video-hero jquery-background-video-wrapper demo-video-wrapper">
					<video className="jquery-background-video" muted autoPlay loop poster="https://images.pexels.com/photos/316093/pexels-photo-316093.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260">
						<source src="https://static.videezy.com/system/resources/previews/000/038/963/original/190816-samutprakarn.mp4"/>
						<source src="https://static.videezy.com/system/resources/previews/000/022/198/original/underwater-effect-background.mp4" />
					</video>
			
				<div className="page-width">
					<div className="video-hero--content">
<<<<<<< HEAD
					<h2>nDs-Website</h2>
					<p>operate according to the universe</p>
=======
					<h2>nDs-App</h2>
					<p>operate according to the universe</p>
					
				
>>>>>>> baf3ed63bb22c8d11807d4c127297193e22183a8
					</div>
				</div>
				</div>
			
		
			<div className="content">

				<div className="about-navbar">
					<div className="nav-header">

						<button type="button" 
	 						className="nav-btn"
							onClick={this.handleToggle}
						>
<<<<<<< HEAD
	 						{
								this.state.isOpen ? <VscChromeClose className="nav-icon" /> : <VscGrabber className="nav-icon" />
							}
	 					</button>
						<div onClick={this.handleToggleEnglish} className="toggle-lang">
=======
	 						<FaAlignLeft className="nav-icon" />
	 					</button>
						<div className="toggle-lang">
>>>>>>> baf3ed63bb22c8d11807d4c127297193e22183a8
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="25" height="25" aria-hidden="true" focusable="false" fill="currentColor">
							<path d="M217.982 201.586h-64.499c-5.537 0-10.026 4.489-10.026 10.026s4.489 10.026 10.026 10.026h53.547c-4.72 25.263-26.935 44.446-53.547 44.446-30.037 0-54.473-24.436-54.473-54.473s24.436-54.473 54.473-54.473c14.55 0 28.229 5.667 38.518 15.955 3.916 3.916 10.264 3.916 14.178 0 3.916-3.916 3.916-10.264 0-14.178-14.077-14.077-32.791-21.829-52.697-21.829-41.094 0-74.525 33.431-74.525 74.525 0 41.094 33.431 74.525 74.525 74.525s74.525-33.431 74.525-74.525c.001-5.536-4.488-10.025-10.025-10.025z"></path>
							<path d="M470.331 92.24H269.728l-26.935-81.355a10.025 10.025 0 00-9.518-6.875H41.669C18.693 4.01 0 22.703 0 45.679v332.412c0 22.976 18.693 41.669 41.669 41.669h203.145l27.073 81.369a10.026 10.026 0 009.513 6.861h188.932c22.976 0 41.669-18.693 41.669-41.669V133.909c-.001-22.976-18.694-41.669-41.67-41.669zM41.669 399.708c-11.919 0-21.616-9.697-21.616-21.616V45.679c0-11.919 9.697-21.616 21.616-21.616h184.364l70.691 213.516a.366.366 0 00.015.043l53.664 162.086H41.669zm295.78-116.433c.805 1.11 10.824 14.877 26.355 34.066-4.377 5.756-9.015 11.474-13.91 17.036l-29.712-89.74h87.441c-6.196 13.031-16.938 33.813-31.692 55.736-13.553-16.921-22.069-28.622-22.249-28.87-3.251-4.482-9.519-5.481-14.002-2.23-4.482 3.25-5.48 9.518-2.231 14.002zM265.946 419.76h75.162l-55.503 59.084-19.659-59.084zm226.002 46.561c0 11.919-9.697 21.616-21.616 21.616H304.575l67.015-71.339-.004-.003c.293-.312.571-.64.823-.991a10.025 10.025 0 001.39-9.022l-16.688-50.402c7.073-7.406 13.68-15.143 19.805-22.965 13.299 15.772 29.037 33.446 45.778 50.187 1.957 1.957 4.524 2.937 7.089 2.937s5.132-.979 7.089-2.937c3.916-3.916 3.916-10.264 0-14.178-17.461-17.461-34.013-36.244-47.687-52.632 21.251-30.503 35.033-59.504 40.535-71.954h21.454c5.537 0 10.026-4.489 10.026-10.026s-4.489-10.026-10.026-10.026h-66.173v-18.047c0-5.537-4.489-10.026-10.026-10.026s-10.026 4.489-10.026 10.026v18.046h-51.406l-37.178-112.292H470.33c11.919 0 21.616 9.697 21.616 21.616v332.412z"></path>
							</svg>
						</div>
					</div>
					
					<div className={this.state.isOpen ? "nav-items show-nav-items" : "nav-items"} >
<<<<<<< HEAD
						<Link to="/ndsweb/about">
=======
						<Link to="/about">
>>>>>>> baf3ed63bb22c8d11807d4c127297193e22183a8
							<div className="nav-item">
								Description
							</div>
						</Link>
<<<<<<< HEAD
						<Link to="/ndsweb/about/contributors">
=======
						<Link to="/about/contributors">
>>>>>>> baf3ed63bb22c8d11807d4c127297193e22183a8
							<div className="nav-item">
								Contributors
							</div>
						</Link>
<<<<<<< HEAD
						<Link to="/ndsweb/about/feedback">
=======
						<Link to="/about/feedback">
>>>>>>> baf3ed63bb22c8d11807d4c127297193e22183a8
							<div className="nav-item">
								FeedbackApp
							</div>
						</Link>
<<<<<<< HEAD
						<Link to="/ndsweb/about/privacy">
=======
						<Link to="/about/privacy">
>>>>>>> baf3ed63bb22c8d11807d4c127297193e22183a8
							<div className="nav-item">
								Privacy & Policy
							</div>
						</Link>
<<<<<<< HEAD
						<Link to="/ndsweb/about/help">
=======
						<Link to="/about/help">
>>>>>>> baf3ed63bb22c8d11807d4c127297193e22183a8
							<div className="nav-item">
								Instruction-Help
							</div>
						</Link>
					</div>
					

				</div>
				<div className="about-main">
					<Switch>
<<<<<<< HEAD
						<Route exact path="/ndsweb/about">
							<DescriApp isEnglish = {this.state.isEnglish} />
						</Route>

						<Route exact path="/ndsweb/about/privacy">
							<PrivateApp isEnglish = {this.state.isEnglish} />
						</Route>
						
						<Route exact path="/ndsweb/about/feedback">
							<FeedbackApp />
						</Route>
							{/*<Route path="/about/Otherlink" component={DonatePage} /> */}
						<Route exact path="/ndsweb/about/contributors">
							<ContributorsApp isEnglish = {this.state.isEnglish}/>
						</Route>
						<Route exact path="/ndsweb/about/help">
=======
						<Route exact path="/about">
							<DescriApp />
						</Route>

						<Route exact path="/about/privacy">
							<PrivateApp />
						</Route>
						
						<Route exact path="/about/feedback">
							<FeedbackApp />
						</Route>
							{/*<Route path="/about/Otherlink" component={DonatePage} /> */}
						<Route exact path="/about/contributors">
							<ContributorsApp />
						</Route>
						<Route exact path="/about/help">
>>>>>>> baf3ed63bb22c8d11807d4c127297193e22183a8
							<HelpApp />
						</Route>
						
					</Switch>
				</div>
			</div>
			<div className="footer-app">
				<div className="footer-app-left">
					<Grid
						// className={"playlistHeader"}
						container
						direction="column"
						alignItems="center"
						justify="space-between"
					>
<<<<<<< HEAD
						<div onContextMenu={(e)=> e.preventDefault()} className="logo-left">
							<img src={img} alt="logo Footer" />
=======
						<div className="logo-left">
							<img src={img} alt="logo Footer" />
							<span>nDs-App</span>
>>>>>>> baf3ed63bb22c8d11807d4c127297193e22183a8
						</div>
						<Link to={""}>
							<IoLogoTwitter className="cssIcons" />
						</Link>
						<Link to={""}>
							<IoLogoFacebook className="cssIcons" />
						</Link>
						<Link to={""}>
							<IoLogoLinkedin className="cssIcons" />
						</Link>
						<Link to={""}>
							<IoLogoGithub className="cssIcons" />
						</Link>

					</Grid>
									
					
				</div>
				<div className="footer-app-mid">
					<div className="list-footer">
<<<<<<< HEAD
						<div className="title-list-footer">nDsWeb</div>
						<div>
							<ul>
								<li>
									<Link to="/ndsweb/">
										<div className="">
											Home
=======
						<div className="title-list-footer">nDsApp</div>
						<div>
							<ul>
								<li>
									<Link to="/">
										<div className="">
											HomeApp
>>>>>>> baf3ed63bb22c8d11807d4c127297193e22183a8
										</div>
									</Link>
								</li>
								<li>
<<<<<<< HEAD
									<Link to="/ndsweb/music">
										<div className="">
											Music
=======
									<Link to="/page1">
										<div className="">
											MusicApp
>>>>>>> baf3ed63bb22c8d11807d4c127297193e22183a8
										</div>
									</Link>
								</li>
								<li>
<<<<<<< HEAD
									<Link to="/ndsweb/chat">
										<div className="">
											Chat
=======
									<Link to="/page3">
										<div className="">
											ChatApp
>>>>>>> baf3ed63bb22c8d11807d4c127297193e22183a8
										</div>
									</Link>
								</li>
								<li>
<<<<<<< HEAD
									<Link to="/ndsweb/weather">
										<div className="">
											Weather
=======
									<Link to="/page2">
										<div className="">
											WeatherApp
>>>>>>> baf3ed63bb22c8d11807d4c127297193e22183a8
										</div>
									</Link>
								</li>
								<li>
<<<<<<< HEAD
									<Link to="/ndsweb/retrille">
=======
									<Link to="/page4">
>>>>>>> baf3ed63bb22c8d11807d4c127297193e22183a8
										<div className="">
											Retrille
										</div>
									</Link>
								</li>
							</ul>
						</div>
					</div>
					<div className="list-footer">
						<div className="title-list-footer">External</div>
						<div>
							<ul>
								<li>
<<<<<<< HEAD
									<Link to="/ndsweb/about">
										<div className="" onClick={() => this.openNewTab("https://github.com")}>
=======
									<Link to="https://github.com/">
										<div className="">
>>>>>>> baf3ed63bb22c8d11807d4c127297193e22183a8
											GitHub
										</div>
									</Link>
								</li>
								<li>
<<<<<<< HEAD
									<Link to="/ndsweb/about">
										<div className="" onClick={() => this.openNewTab("https://www.mongodb.com")}>
=======
									<Link to="https://www.mongodb.com/">
										<div className="">
>>>>>>> baf3ed63bb22c8d11807d4c127297193e22183a8
											MongoDB
										</div>
									</Link>
								</li>
								<li>
<<<<<<< HEAD
									<Link to="/ndsweb/about">
										<div className="" onClick={() => this.openNewTab("https://reactjs.org")}>
=======
									<Link to="https://reactjs.org/">
										<div className="">
>>>>>>> baf3ed63bb22c8d11807d4c127297193e22183a8
											ReactJs
										</div>
									</Link>
								</li>
								<li>
<<<<<<< HEAD
									<Link to="/ndsweb/about">
										<div className="" onClick={() => this.openNewTab("https://nodejs.org")}>
=======
									<Link to="https://nodejs.org/">
										<div className="">
>>>>>>> baf3ed63bb22c8d11807d4c127297193e22183a8
											NodeJs
										</div>
									</Link>
								</li>
								<li>
<<<<<<< HEAD
									<Link to="/ndsweb/about">
										<div className="" onClick={() => this.openNewTab("https://id.heroku.com")}>
=======
									<Link to="https://id.heroku.com/">
										<div className="">
>>>>>>> baf3ed63bb22c8d11807d4c127297193e22183a8
											Heroku
										</div>
									</Link>
								</li>
							</ul>
						</div>
					</div>
					<div className="list-footer">
						<div className="title-list-footer">About</div>
						<div>
							<ul>
								<li>
<<<<<<< HEAD
									<Link to="/ndsweb/about">
=======
									<Link to="/about">
>>>>>>> baf3ed63bb22c8d11807d4c127297193e22183a8
										<div className="">
											Description
										</div>
									</Link>
								</li>
								<li>
<<<<<<< HEAD
									<Link to="/ndsweb/about/feedback">
=======
									<Link to="/about/feedback">
>>>>>>> baf3ed63bb22c8d11807d4c127297193e22183a8
										<div className="">
											Feedback
										</div>
									</Link>
								</li>
								<li>
<<<<<<< HEAD
									<Link to="/ndsweb/about/contributors">
=======
									<Link to="/about/contributors">
>>>>>>> baf3ed63bb22c8d11807d4c127297193e22183a8
										<div className="">
											Contributors
										</div>
									</Link>
								</li>
								<li>
<<<<<<< HEAD
									<Link to="/ndsweb/about/privacy">
=======
									<Link to="/about/privacy">
>>>>>>> baf3ed63bb22c8d11807d4c127297193e22183a8
										<div className="">
											Privacy & Policy
										</div>
									</Link>
								</li>
								<li>
<<<<<<< HEAD
									<Link to="/ndsweb/about/help">
=======
									<Link to="/about/help">
>>>>>>> baf3ed63bb22c8d11807d4c127297193e22183a8
										<div className="">
											Help-Instruction
										</div>
									</Link>
								</li>
								
							</ul>
						</div>
					</div>
				</div>
			</div>
			<div className="footer-app-light">
				<div className="footer-app-left-light">
					<p>Allowed to build and develop under the management of nDs</p>
<<<<<<< HEAD
					<p>14 Road/74 - Le Van Quoi, BHHA, TanBinh, HCMC</p>
					<p>Publicly Released Oldest: ThuDuc, November 20th 2020</p>
				</div>
				<div className="footer-app-right-light">
					nDsWebsite © 2022 nDs..,npHưng. All rights Unreserved
=======
					<p>XaLoHaNoi, LinhTrung, ThuDuc, HCMC</p>
					<p>Publicly Released: ThuDuc,Day Month Year</p>
				</div>
				<div className="footer-app-right-light">
					nDsApp © 2020 nDs.,SDG. All rights reserved
>>>>>>> baf3ed63bb22c8d11807d4c127297193e22183a8
				</div>
			</div>
			<div className="mess-nds">
				<p>THANK YOU FOR COMING TO US</p>
			</div>
			
		</div>
	 	);
	}
}
