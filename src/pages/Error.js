import React, { Component } from 'react';
import Hero from "../components/Hero";
import {Link} from 'react-router-dom';
import Banner from '../components/Banner';
import {Helmet} from "react-helmet";
// import Loading from '../components/Loading';
import LoadingMini from '../components/Loading-mini';

//import {Grid, Cell, ProgressBar} from 'react-mdl';
class Error extends Component {
	 render() {
	 	return(
			 <>

 				<Hero>

					<Helmet>
						<title>Error | nDsWeb</title>
					</Helmet>
					<div className="loading-error-url">
						<LoadingMini />
					</div>
					
 					<Banner title='404' subtitle="Page Not Found">

 						<Link to='/' className="btn-primary">
 						Return Home
 						</Link>
 					 </Banner>
 				 </Hero>
				</>
	 		);
	 }
}
export default Error;