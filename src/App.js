import React, { Component } from 'react';
import './App.css';
// import './style.css';

import Home from "./pages/Home";
// import Errors from "./pages/Error";
import {Route, Switch} from 'react-router-dom';
import Navbar from './components/Navbar';
import Page1 from './pages/Page1';
import Page2 from './pages/Page2';
import AuthWrapper from "./pages/AuthWrapper";
import PrivateRoute from "./pages/PrivateRoute";
// import Login from './pages/Login';
import Page3 from './pages/Page3';
// import Page4 from './pages/Page4';
import About  from './pages/About';
import Maintenance from './pages/Maintenance';
import Landing from './pages/Landing';

class App extends Component {
	 render() {
	 	return(
			<AuthWrapper>
				<Navbar />
			
				<Switch>
					<PrivateRoute path="/ndsweb" exact={true}>
						<Home />
					</PrivateRoute>

					<Route path="/ndsweb/weather">
						<Page1 />
					</Route>
					
					{/* <Route path="/ndsweb/retrille">
						<Page4 />
					</Route> */}
					{/* <Route path="/login">
						<Login/>
					</Route>  */}

					{/* chat */}
					<Route path="/ndsweb/chat">
						<Page3 />
					</Route>

					{/* music */}
					<Route path="/ndsweb/music"> 
						<Page2 />
					</Route>

					<Route path="/ndsweb/wheel">
						<Landing />
					</Route> 

					<Route path="/ndsweb/about">
						<About/>
					</Route>
	

					<Route component={Maintenance} />
				</Switch>
			
		
			</AuthWrapper>			

  		);
	}
}

export default App;
