import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react';
import * as serviceWorker from './serviceWorker';
<<<<<<< HEAD
import  {BrowserRouter as Router} from 'react-router-dom';
// import NotificationProvider from './notifications/NotificationProvider';



ReactDOM.render(
  <React.StrictMode>
    <Router>
    {/* <NotificationProvider> */}
=======
import NotificationProvider from './notifications/NotificationProvider'
import {
  BrowserRouter as Router
} from "react-router-dom";


ReactDOM.render(
    <Router>

>>>>>>> baf3ed63bb22c8d11807d4c127297193e22183a8
     <Auth0Provider
      domain="ndscoop.us.auth0.com"
      clientId="VjJpWQ2c7EELPIisJatPwQMM4Mh1DjsR"
      redirectUri={window.location.origin}
    >
<<<<<<< HEAD
      {/* <NotificationProvider> */}
        <App />
      {/* </NotificationProvider> */}
   
         
            
    </Auth0Provider>
    {/* </NotificationProvider> */}
         
    </Router>
    
  </React.StrictMode>,
=======
      <NotificationProvider>
        <App />
      </NotificationProvider>
   
    </Auth0Provider>
         
    </Router>,
>>>>>>> baf3ed63bb22c8d11807d4c127297193e22183a8
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA


serviceWorker.unregister();
