import React, { Component } from 'react';
import './App.css';
// import './style.css';

import Home from "./pages/Home";
// import Errors from "./pages/Error";
import {Route, Switch} from 'react-router-dom';
import Navbar from './components/Navbar';
<<<<<<< HEAD
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
=======
// import Page1 from './pages/Page1';
// import Page2 from './pages/Page2';
import AuthWrapper from "./pages/AuthWrapper";
import PrivateRoute from "./pages/PrivateRoute";
// import Login from './pages/Login';
// import Page3 from './pages/Page3';
// import Page4 from './pages/Page4';
import About  from './pages/About';
import Maintenance from './pages/Maintenance';

>>>>>>> baf3ed63bb22c8d11807d4c127297193e22183a8

class App extends Component {
	 render() {
	 	return(
			<AuthWrapper>
				<Navbar />
<<<<<<< HEAD
			
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
			
		
=======
				<Switch>
					 <PrivateRoute path="/" exact={true}>
						<Home />
					</PrivateRoute>

					{/* <Route path="/page1">
						<Page2/>
					</Route>
					<Route path="/page2">
						<Page1/>
					</Route>
					<Route path="/page3">
						<Page3/>
					</Route>
					<Route path="/page4">
						<Page4/>
					</Route>
					<Route path="/login">
						<Login/>
					</Route> 
					*/}

					<Route path="/about">
						<About/>
					</Route> 
					{/* <Route component={Errors} /> */}
					<Route component={Maintenance} />
				</Switch>
>>>>>>> baf3ed63bb22c8d11807d4c127297193e22183a8
			</AuthWrapper>			

  		);
	}
}

export default App;
<<<<<<< HEAD
=======

>>>>>>> baf3ed63bb22c8d11807d4c127297193e22183a8
