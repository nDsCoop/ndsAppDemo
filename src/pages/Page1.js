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

    render() {
        const { store } = this.state;
        return (
            <Switch>
                <Route exact path="/ndsweb/weather">
                    <Helmet>
                        <title>Weather | nDsWeb</title>
                    </Helmet>
                    <App1 store = { store }
                    google={this.props.google}
                    zoom={4}
                    />
                </Route>
                <Route exact path="/ndsweb/weather/:slug">
                    <Helmet>
                        <title>Weather | nDsWeb</title>
                    </Helmet>
                    <App1 store = { store }
                    google={this.props.google}
                    zoom={4}
                    />
                </Route>
                <Route exact path="/ndsweb/weather/greeting/newuser&account">
                    <>
                    <GreetingApp4 store = { store } />
                    <Helmet>
                        <title>Greeting-Weather | nDsWeb</title>
                    </Helmet>
                    </>
                </Route>
                <Route component={Errors} />
            </Switch>
        )
    }
}
