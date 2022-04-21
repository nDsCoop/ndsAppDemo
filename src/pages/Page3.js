import React, {Component} from 'react'
import App3 from '../components/App3';
import Store from '../store';
import {Route, Switch} from 'react-router-dom';
// import { Reconnect } from "./Reconnect";
import MainVideo from '../components/MainVideo';
import Errors from "./Error";
// import Loading from '../components/Loading';

// import Snow from '../components/Animation/Snow';
// import Rain from '../components/Animation/Rain';
// import Fancy from '../components/Animation/Fancy';
import {Helmet} from "react-helmet";
import {GreetingApp4} from '../components/GreetingApp4';
import {ChangePassword} from '../components/ChangePassword';

export default class Page3 extends Component {
    constructor(props){
        super(props);
        this.state = {
            store: new Store(this),
        }
    }
    render(){
        const { store } = this.state;
        return (
            <Switch>
                <Route exact path="/ndsweb/chat/login/:slug">
                    <>
                    <App3 store = { store } />
                    <Helmet>
                        <title>Chat | nDsWeb</title>
                    </Helmet>
                    </>
                </Route>
                <Route exact path="/ndsweb/chat">
                    <>
                    <App3 store = { store } />
                    <Helmet>
                        <title>Chat | nDsWeb</title>
                    </Helmet>
                    </>
                </Route>
                <Route exact path="/ndsweb/chat/change/password">
                    <>
                    <ChangePassword store = { store } />
                    <Helmet>
                        <title>Chat | nDsWeb</title>
                    </Helmet>
                    </>
                </Route>
                <Route exact path="/ndsweb/chat/greeting/newuser&account">
                    <>
                    <GreetingApp4 store = { store } />
                    <Helmet>
                        <title>Greetingt-ReTrille | nDsWeb</title>
                    </Helmet>
                    </>
                </Route>
               
                <Route exact path="/ndsweb/chat/Facemoment/:slug">
                    <>
                    <MainVideo store = { store } />
                    <Helmet>
                        <title>Face-moment | nDsWeb</title>
                    </Helmet>
                    </>
                </Route>
                {/* <Route exact path="/page3/snow">
                    <Snow />
                </Route>
                <Route exact path="/page3/rain">
                    <Rain />
                </Route>
                <Route exact path="/page3/fancy">
                    <Fancy />
                </Route> */}
                <Route component={Errors} />
            </Switch>
        )   
        }
   
}
