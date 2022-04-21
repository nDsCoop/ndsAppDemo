import React, {Component} from 'react'
import App4 from '../components/App4';
import Store from '../store';
import {Route, Switch} from 'react-router-dom';
// import MainVideo from '../components/MainVideo';
import Errors from "./Error";
// import Loading from '../components/Loading';
// import RainAmina from '../components/RainAmina';
// import Snow from '../components/Animation/Snow';
// import Rain from '../components/Animation/Rain';
// import Fancy from '../components/Animation/Fancy';
import {Helmet} from "react-helmet";

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
<<<<<<< HEAD
                <Route exact path="/ndsweb/retrille">
=======
                <Route exact path="/page4">
>>>>>>> baf3ed63bb22c8d11807d4c127297193e22183a8
                    <>
                    <App4 store = { store } />
                    <Helmet>
                        <title>ReTrille | nDsBuilding</title>
                    </Helmet>
                    </>
                </Route>
<<<<<<< HEAD
                <Route exact path="/ndsweb/retrille/:slug">
=======
                <Route exact path="/page4/:slug">
>>>>>>> baf3ed63bb22c8d11807d4c127297193e22183a8
                    <>
                    <App4 store = { store } />
                    <Helmet>
                        <title>ReTrille | nDsBuilding</title>
                    </Helmet>
                    </>
                </Route>
                {/* <Route exact path="/page3/change/password">
                    <>
                    <App3 store = { store } />
                    <Helmet>
                        <title>Chat | nDsBuilding</title>
                    </Helmet>
                    </>
                </Route> */}
                {/* <Route exact path="/page3/Facemoment/:slug">
                    <>
                    <MainVideo store = { store } />
                    <Helmet>
                        <title>Face-moment | nDsBuilding</title>
                    </Helmet>
                    </>
                </Route> */}
                <Route component={Errors} />
            </Switch>
        )   
        }
   
}
