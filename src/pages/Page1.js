import React, { Component } from "react"
import App1 from "../components/App1"
import Store from '../store';
import {Helmet} from "react-helmet";
import { GreetingApp4 } from "../components/GreetingApp4";
import { Switch, Route } from "react-router-dom";
import Errors from "./Error";

export default class Page1 extends Component {
    constructor(props){
        super(props);
        this.state = {
            store: new Store(this),
        }
    }
<<<<<<< HEAD

=======
>>>>>>> baf3ed63bb22c8d11807d4c127297193e22183a8
    render() {
        const { store } = this.state;
        return (
            <Switch>
<<<<<<< HEAD
                <Route exact path="/ndsweb/weather">
                    <Helmet>
                        <title>Weather | nDsWeb</title>
=======
                <Route exact path="/page2">
                    <Helmet>
                        <title>Weather | nDsBuilding</title>
>>>>>>> baf3ed63bb22c8d11807d4c127297193e22183a8
                    </Helmet>
                    <App1 store = { store }
                    google={this.props.google}
                    zoom={4}
                    />
                </Route>
<<<<<<< HEAD
                <Route exact path="/ndsweb/weather/:slug">
                    <Helmet>
                        <title>Weather | nDsWeb</title>
=======
                <Route exact path="/page2/:slug">
                    <Helmet>
                        <title>Weather | nDsBuilding</title>
>>>>>>> baf3ed63bb22c8d11807d4c127297193e22183a8
                    </Helmet>
                    <App1 store = { store }
                    google={this.props.google}
                    zoom={4}
                    />
                </Route>
<<<<<<< HEAD
                <Route exact path="/ndsweb/weather/greeting/newuser&account">
                    <>
                    <GreetingApp4 store = { store } />
                    <Helmet>
                        <title>Greeting-Weather | nDsWeb</title>
                    </Helmet>
                    </>
                </Route>
                <Route component={Errors} />
=======
                <Route exact path="/page2/greeting/newuser&account">
                    <>
                    <GreetingApp4 store = { store } />
                    <Helmet>
                        <title>Greeting-Weather | nDsBuilding</title>
                    </Helmet>
                    </>
                </Route>
                 <Route component={Errors} />
>>>>>>> baf3ed63bb22c8d11807d4c127297193e22183a8
            </Switch>
        )
    }
}
