import React, {Component} from 'react'
import {Wheel} from '../components/Wheel';
import Store from '../store';
import {Route, Switch} from 'react-router-dom';
import Errors from "./Error";

import {Helmet} from "react-helmet";
import Firework from '../components/Animation/Firework';

export default class Page4 extends Component {
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

                <Route exact path="/ndsweb/wheel">
                    <>
                    <Wheel store = { store } />
                    <Helmet>
                        <title>Wheel | nDsWeb</title>
                    </Helmet>
                    </>
                </Route>

                <Route exact path="/ndsweb/wheel/firework">
                    <>
                    <Firework />
                    <Helmet>
                        <title>Firework | nDsWeb</title>
                    </Helmet>
                    </>
                </Route>
        
                <Route component={Errors} />
            </Switch>
        )   
        }
   
}
