import React, { Component} from 'react'

import classNames from 'classnames';
<<<<<<< HEAD
import loadingImg from '../images/loadingImg.gif'
=======
>>>>>>> baf3ed63bb22c8d11807d4c127297193e22183a8
// import styled from 'styled-components';
// import Banner from './Banner';

import StyledHero from './StyleHero';
<<<<<<< HEAD
import { FaMap, FaRegMap } from 'react-icons/fa';
=======
import { FaAlignLeft, FaMap, FaRegMap } from 'react-icons/fa';
>>>>>>> baf3ed63bb22c8d11807d4c127297193e22183a8
import { Tooltip, IconButton, Card, CardContent } from '@material-ui/core';
import { RiSubtractLine, RiMap2Fill, RiPlaneLine } from 'react-icons/ri';
import { BsPlus } from 'react-icons/bs';
import { SiOpenstreetmap } from 'react-icons/si'
import { IoIosPlanet } from 'react-icons/io';
<<<<<<< HEAD
import { VscGrabber, VscChromeClose } from 'react-icons/vsc';
=======
>>>>>>> baf3ed63bb22c8d11807d4c127297193e22183a8
import { BiSort, BiCurrentLocation, BiDotsHorizontalRounded, BiRadioCircleMarked } from 'react-icons/bi';
import { AiOutlineQuestionCircle } from 'react-icons/ai';
import InfoBox from './app1Content/InfoBox';
import Table from './app1Content/Table';
import LineGraph from './app1Content/LineGraph';
import MapCv from './app1Content/Map';
import MainMap from './app1Content/MainMap';
import 'leaflet/dist/leaflet.css';
import { MdAirplanemodeInactive, MdLocalHospital } from 'react-icons/md';
<<<<<<< HEAD
import { Redirect, Link } from 'react-router-dom';
=======

>>>>>>> baf3ed63bb22c8d11807d4c127297193e22183a8
import _ from 'lodash';
import Charts from './app1Content/charts';
// import GetPositionMap from '../external/GetPosition';
import defaultImg from '../images/svgnds.png';

import { withGoogleMap, GoogleMap, withScriptjs, Marker } from "react-google-maps";
import Autocomplete from 'react-google-autocomplete';
import Geocode from "react-geocode";
import ChartForecast from './app1Content/chartForecast';
import NotificationProvider from '../notifications/NotificationProvider';
import MapPlane from './app1Content/mapPlane';
import Draggable from './Draggable';
import Moment from 'react-moment';
import LoadingMini from './Loading-mini';
import { TiWeatherPartlySunny } from 'react-icons/ti';
Geocode.setApiKey("AIzaSyD57PRHJQSQ5XQOuNtAWpRBOP-UCX5pSzA");
Geocode.enableDebug();


const numeral = require('numeral');

const CountriesAPI = "https://disease.sh/v3/covid-19/countries";

// const apiKeyGetGeo = 'AIzaSyD57PRHJQSQ5XQOuNtAWpRBOP-UCX5pSzA'

//Weatherapi
<<<<<<< HEAD
// const url1 = 'https://api.weatherapi.com/v1/forecast.json?key=510cbd14438a4e33bcc15040202911&q=10.068,102.316&days=2'

//get astronomy today
// const url3 = 'http://api.weatherapi.com/v1/astronomy.json?key=510cbd14438a4e33bcc15040202911&q=48.8567,2.3508'

//MetaWeather
//get neer name city with latlong enter
// const url6 = 'https://www.metaweather.com/api/location/search/?lattlong=10.068,102.316'
=======

// const url1 = 'https://api.weatherapi.com/v1/forecast.json?key=510cbd14438a4e33bcc15040202911&q=10.068,102.316&days=2'

//get astronomy today

// const url3 = 'http://api.weatherapi.com/v1/astronomy.json?key=510cbd14438a4e33bcc15040202911&q=48.8567,2.3508'


//MetaWeather
//get neer name city with latlong enter
// const url6 = 'https://www.metaweather.com/api/location/search/?lattlong=10.068,102.316'



>>>>>>> baf3ed63bb22c8d11807d4c127297193e22183a8
//Meteorologisk Institutt
 

//const url7 = 'https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=10.068&lon=102.316'
<<<<<<< HEAD

=======
>>>>>>> baf3ed63bb22c8d11807d4c127297193e22183a8
//get global map img

//https://globe.adsbexchange.com/

//https://nds.tphcm:Hippo956592@opensky-network.org/api/states/all?lamin=45.8389&lomin=5.9962&lamax=47.8229&lomax=10.5226
//https://nds.tphcm:Hippo956592@opensky-network.https://api.met.no/weatherapi/geosatellite/1.4?area=global&size=normal&time=2020-11-29T03:30:00Z&type=infraredorg/api/states/all?icao24=88816c&icao24=3e1bf9
//https://nds.tphcm:Hippo956592@opensky-network.org/api/states/all
//https://nds.tphcm:Hippo956592@opensky-network.org/api/tracks/all?icao24=3c4b26&time=0
<<<<<<< HEAD
//https://api.openaq.org/v1/locations?country[]=NL

export default class App1 extends Component {
=======
//
//
//https://api.openaq.org/v1/locations?country[]=NL





export default class App4 extends Component {
>>>>>>> baf3ed63bb22c8d11807d4c127297193e22183a8
    
  constructor(props){
  super(props);
  this.state = {
    height: window.innerHeight,
    readMore: false,
    img: null,
<<<<<<< HEAD
    loadingRequire: false,
=======
>>>>>>> baf3ed63bb22c8d11807d4c127297193e22183a8
    isOpen:false,
    listening: false,
    isChat: true,
    isWrite: false,
    isShowFormAddMessage: false,
    isShowInstruction: false,
    countries : [0],
    country: 'worldwide',
    infoCountry: {},
    tableData: [],
    isSortAsending: null,
    mapCountries: [],
    colorBtnSort: 'rgba(0, 0, 0, 0.8)',
    mapZoom: 3,
    mapCenter:{ lat: 10.80046091336176, lng: 106.66498382539065 },
    casesType: 'cases',

    markPos: 'mymark',
    mapZoomMain: 3,
    mapCenterMain:{ lat: 10.80046091336176, lng: 106.66498382539065 },
    activeMark: 'default',

    questKey: [],
    isFormAddNewMark: false,
    txtMessage: null,
    isShowMark: true,
    txtNameMark: null,
    city: '',
    area: '',
    state: '',
    public: true,
    mapPosition: {
        lat: 10.80046091336176,
        lng: 106.66498382539065,
    },
    markerPosition: {
        lat: 10.80046091336176,
        lng: 106.66498382539065,
    },
    
    zoom: 6,
    message: null,
    newNotification: null,
    typeNoti: null,
    addNotiSignal: null,

    isLoadingMarks: true,
    listMarkMe: [],
    markForecast: [],
    showSettingVoices: false,

    amountPlanes: null,
    lastContact: new Date(),
    listPlanes: [],
    amountPlanesOfMark: null,
    lastContactOfMark: new Date(),
    showDetailPlanesKey: null,
    showDetailPlanes: false,
    isAllPlanes: 1,
    isRealtimePlane: 0,
    typeOfMap: 0,
    mapMarkfindPlane: null,
    mapMarkfindPlaneRealtime: null,
<<<<<<< HEAD
    markPosRealtime: 'Chose Mark',
    isLoginPage: false,
    urlReDirect: ''
=======
    markPosRealtime: 'Chose Mark'
>>>>>>> baf3ed63bb22c8d11807d4c127297193e22183a8
  }

}



onChangeMarkSelectRealtime = (event) => {
    // console.log(event.target.value)

    const {store} = this.props
    const markList = store.getMarksOfMe()


        _.each(markList.toArray(), (mark) => {
           
        if(mark.nameMark === event.target.value){
            // console.log(mark)
            this.setState({
                markPosRealtime: mark.nameMark,
                mapMarkfindPlaneRealtime: { lat: mark.lat, lng: mark.lng },
                mapZoomMain: 10
            })

        }
    })
   
}


toggleChangeIsPlanes = (e) => {
    e.preventDefault()
    const {isAllPlanes} = this.state
    if(isAllPlanes === 2) {
        this.setState({
            isAllPlanes: false,
            isRealtimePlane: 1,
        })
    }else{
        this.setState({
            isAllPlanes: 2,
            isRealtimePlane: 0
        })
    }
    
}

<<<<<<< HEAD

=======
toggleAccountUser = (me) => {
    if(!me){
        window.location.replace("/page2/greeting/newuser&account");
    }else{
        window.location.replace("/page3");
    }
}
>>>>>>> baf3ed63bb22c8d11807d4c127297193e22183a8


infoPlanesOfMark = (amountPlanes, lastContact) => {

    this.setState({
        amountPlanesOfMark: amountPlanes,
        lastContactOfMark: new Date(lastContact),
        // listPlanesOfMark: listPlanes,
    })
}


infoPlanes = (amountPlanes, lastContact, listPlanes) => {


    // console.log(amountPlanes, new Date(lastContact), listPlanes)
    this.setState({
        amountPlanes: amountPlanes,
        lastContact: new Date(lastContact),
        listPlanes: listPlanes,
    })
}

getCity = ( addressArray ) => {
    let city = '';
    for( let i = 0; i < addressArray.length; i++ ) {
     if ( addressArray[ i ].types[0] && 'administrative_area_level_2' === addressArray[ i ].types[0] ) {
      city = addressArray[ i ].long_name;
      return city;
     }
    }
};

getArea = ( addressArray ) => {
    let area = '';
    for( let i = 0; i < addressArray.length; i++ ) {
     if ( addressArray[ i ].types[0]  ) {
      for ( let j = 0; j < addressArray[ i ].types.length; j++ ) {
       if ( 'sublocality_level_1' === addressArray[ i ].types[j] || 'locality' === addressArray[ i ].types[j] ) {
        area = addressArray[ i ].long_name;
        return area;
       }
      }
     }
    }
};
getState = ( addressArray ) => {
    let state = '';
    for( let i = 0; i < addressArray.length; i++ ) {
     for( let i = 0; i < addressArray.length; i++ ) {
      if ( addressArray[ i ].types[0] && 'administrative_area_level_1' === addressArray[ i ].types[0] ) {
       state = addressArray[ i ].long_name;
       return state;
      }
     }
    }
};
onChange = ( event ) => {
    this.setState({ [event.target.name]: event.target.value });
};
onInfoWindowClose = ( event ) => {
};

onPlaceSelected = ( place ) => {
    // console.log(place.geometry.location.lat(), place.geometry.location.lng())
   
    const address = place.formatted_address,
        addressArray =  place.address_components,
        
        city = this.getArea( addressArray ),
        area = this.getCity( addressArray ),
        state = this.getState( addressArray ),
        latValue = place.geometry.location.lat(),
        lngValue = place.geometry.location.lng();

        this.setState({
        address: ( address ) ? address : '',
        area: ( area ) ? area : '',
        city: ( city ) ? city : '',
        state: ( state ) ? state : '',
        markerPosition: {
            lat: latValue,
            lng: lngValue
        },
        mapPosition: {
            lat: latValue,
            lng: lngValue
        },
        zoom: 13
    })
};

onMarkerDragEnd = ( event ) => {
    // console.log( 'event', event );
    let newLat = event.latLng.lat(), newLng = event.latLng.lng();
    // console.log(newLat, newLng)
    Geocode.fromLatLng( newLat , newLng ).then(
        response => {
        const address = response.results[0].formatted_address,
        addressArray =  response.results[0].address_components,
        city = this.getArea( addressArray ),
        area = this.getCity( addressArray ),
        state = this.getState( addressArray );
        this.setState({
            address: ( address ) ? address : '',
            area: ( area ) ? area : '',
            city: ( city ) ? city : '',
            state: ( state ) ? state : '',
            markerPosition: {
                    lat: newLat,
                    lng: newLng
                },
                mapPosition: {
                    lat: newLat,
                    lng: newLng
                },
            zoom: 13,
            })
        },
        error => {
        console.error(error);
        }
    );
};

toggleAddMark = (e) => {
    e.preventDefault();
    // console.log('click')
    const {isFormAddNewMark} = this.state
    this.setState({
        isFormAddNewMark: !isFormAddNewMark,
        message: null
    })
}
toggleSubmit = (e) => {
    e.preventDefault()

    const {store} = this.props
    const me = store.getCurrentUser();
    const {city, area, state, mapPosition, txtMessage, txtNameMark, isShowMark} = this.state
    console.log(city, area, state, mapPosition)
    const data = {
        nameMark: txtNameMark,
        city: city,
        district: area,
        state: state,
        lat: mapPosition.lat,
        lng: mapPosition.lng,
        public: isShowMark,
        message: txtMessage
    }
<<<<<<< HEAD
    this.setState({loadingRequire: true})
=======
>>>>>>> baf3ed63bb22c8d11807d4c127297193e22183a8

    if(me){
        if(mapPosition.lat && mapPosition.lng && txtNameMark){
            store.addNewMark(data).then((response) => {
                console.log("data response ", response)
    
                this.setState({
                    message: {
                        body: response,
                        type: 'success'
                    },
                    txtMessage: null,
<<<<<<< HEAD
                    loadingRequire: false
=======
>>>>>>> baf3ed63bb22c8d11807d4c127297193e22183a8
    
                })
            }).catch((err) => {
                console.log(err);
                this.setState({
                    message: {
                        body: err,
                        type: 'error'
                    },
<<<<<<< HEAD
                    loadingRequire: false
=======
>>>>>>> baf3ed63bb22c8d11807d4c127297193e22183a8
                })
                });
        }else{
            this.setState({
                message: {
                    body: 'Latitude Longitude, Name mark is require',
                    type: 'error'
                },
<<<<<<< HEAD
                loadingRequire: false
=======
>>>>>>> baf3ed63bb22c8d11807d4c127297193e22183a8
            })
        }
    } else {
        this.setState({
            message: {
                body: 'Need login an Account to add New Mark',
                type: 'error'
            },
<<<<<<< HEAD
            loadingRequire: false
=======
>>>>>>> baf3ed63bb22c8d11807d4c127297193e22183a8
        })
    }
    
}

toggleActiveWindow = (key) => {
  // recognition.stop()
  // recognition.onend = () => {
  //   console.log("Stopped listening per click")
  // }
  this.setState({
      isChat: false,
      isWrite: false,
      isShowFormAddMessage: false,
      isShowInstruction: false,
      messages: null
  })

  switch(key){
      case 1 :
          this.setState({
              isChat: true,
          })
      break;
      case 2 :
          this.setState({
              isWrite: true,
          })
      break;
      case 3 :
          this.setState({
              isShowFormAddMessage: true,
          })
      break;
      case 4 :
          this.setState({
              isShowInstruction: true,
          })
      break;
      default:
          break;
  }

}
toggleActiveQuestion = (key) => {
    // console.log(key)

    const {questKey} = this.state;
    if(questKey.includes(key.toString())){

        let temps = _.difference(questKey, [key.toString()])
        // console.log(temps)
        this.setState({
            questKey: temps
        }) 

    }else{

        let temps = _.uniq([...questKey, key.toString()]);
        // console.log(temps)
        this.setState({
            questKey: temps
        })  

    }
    
}

getAircraft = () => {
    fetch(``)
    .then(response => {
        console.log(response);
    })
    .catch(err => {
        console.error(err);
    });
}

createTimeUnix = () => {
    console.log("Iso time: ",new Date(1606650458 * 1000).toISOString());
}



geoFindMe() {

    // function success(position) {
    //     const latitude  = position.coords.latitude;
    //     const longitude = position.coords.longitude;
    //     console.log(latitude, longitude)
    // }
    // function error() {
    //   console.log('Unable to retrieve your location');
    // }
  
    if (!navigator.geolocation) {
        console.log('Unable to retrieve your location')
    } else {
     
      navigator.geolocation.getCurrentPosition((success, error)=>{
            if(success){

                this.setState({ mapCenterMain: [success.coords.latitude, success.coords.longitude]})
               
            }else{
                console.log('Unable to retrieve your location', error);
            }
      });
    }
  
  }


toggleChangeTypeSort = (e) => {
    e.preventDefault();
    const sortData = this.sortAscending(this.state.tableData)
    const sortData1 = this.sortDescending(this.state.tableData)
    const {isSortAsending} = this.state
    if(isSortAsending === null){
        this.setState({
            isSortAsending: true,
            tableData: sortData,
            colorBtnSort: 'rgba(214, 40, 16, 0.966)'
        })
    }else if(isSortAsending){
        this.setState({
            isSortAsending: false,
            tableData: sortData1,
            colorBtnSort: 'rgba(32, 124, 8, 0.966)'
        })
    }else{
        this.setState({
            isSortAsending: null,
            colorBtnSort: 'rgba(0, 0, 0, 0.8)'
        })
    }
}

sortAscending = (data) => {
    const sortData = [...data]
    if(sortData.length) {
        return sortData.sort((a, b) => a.cases - b.cases)
    }else{
        return sortData
    }
}

sortDescending = (data) => {
    const sortData = [...data]
    if(sortData.length) {
        return sortData.sort((a, b) => b.cases - a.cases)
    }else{
        return sortData
    }
}

fetchWorldwide = () => {
    
    try{
        fetch(`https://disease.sh/v3/covid-19/all`)
        .then(function(response) {
            return response.json();
          })
          .then(data => {
            this.setState({infoCountry: data})
            // console.log(data)
          })
          .catch(function(ex) {
            console.log("parsing failed", ex);
          });
    }
    catch (err){ console.log(err) }
}


fetchCountries = async () => {
    try{
        await fetch(`${CountriesAPI}`)
        .then(function(response) {
            return response.json();
          })
          .then(json => {
              const countries = json.map((country) =>(
                {
                    name: country.country,
                    value: country.countryInfo.ios2
                }
              ))

            this.setState({ 
                countries: countries,
                tableData: json,
                mapCountries: json,
            })
           
            
          })
          .catch(function(ex) {
            console.log("parsing failed", ex);
          });
    }
    catch (err){ console.log(err) }

}

onChangeMarkSelect = (event) => {
    // console.log(event.target.value)

    const {store} = this.props
    const markList = store.getMarksOfMe()
    let temp = 0
    const {mapCenterMain} = this.state
    // console.log(this.state.mapMarkfindPlane)
    this.setState({
        markPos: 'mymark1',
        mapMarkfindPlane: null
    })
    // console.log(markList.toArray())
    if(event.target.value === 'mymark'){
        console.log("mymark")
        fetch(`https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${mapCenterMain.lat}&lon=${mapCenterMain.lng}`)
        .then(response => response.json())
        .then(data => {
            
            this.setState({
                markForecast: data.properties.timeseries
            })
        
        })

        this.setState({
                markPos: 'mymark',
                activeMark: 'mymark',
                mapCenterMain:mapCenterMain,
                mapMarkfindPlane: null,
                // mapZoom: 4,
                mapZoomMain: 8
            })
    }else{
        _.each(markList.toArray(), (mark) => {
            temp += 1  
        if(mark.nameMark === event.target.value){
            fetch(`https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${mark.lat}&lon=${mark.lng}`)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    markForecast: data.properties.timeseries
                })
            //   console.log(data.properties.timeseries)
            
            })
            // console.log(mark, temp)
            this.toggleActiveQuestion(temp-1)
            this.setState({
                markPos: mark.nameMark,
                activeMark: mark._id,
                mapCenterMain:{ lat: mark.lat, lng: mark.lng },
                mapMarkfindPlane: { lat: mark.lat, lng: mark.lng },
                // mapCenter: { lat: mark.lat, lng: mark.lng },
                mapZoomMain: 12
            })
<<<<<<< HEAD
=======


>>>>>>> baf3ed63bb22c8d11807d4c127297193e22183a8
        }
        })
    }
   
}

onChangeCountrySelect = async (event) => {
    // console.log(event.target.value)
    const {mapCenter} = this.state
    this.setState({country: event.target.value})
    const url = event.target.value === 'worldwide' ? "https://disease.sh/v3/covid-19/all"
    : `https://disease.sh/v3/covid-19/countries/${event.target.value}`

    await fetch(url)
    .then(response => response.json())
    .then(data => {
        if((event.target.value !== 'worldwide') && data.countryInfo.lat){
            this.setState({
                infoCountry: data,
                mapCenter:  [data.countryInfo.lat, data.countryInfo.long],
                mapZoom: 4,
            })
        }else{
            this.setState({
                infoCountry: data,
                mapCenter:  mapCenter,
                mapZoom: 4,
            })
        }

    })

}

_onResi = () => {
    this.setState({height: window.innerHeight});
}

componentWillUnmount(){
   
    window.removeEventListener('resize', this._onResi);
    // console.log("CWillUnMount");
}



componentDidMount(){
    
    const {store} = this.props
    store.fetchAllMarkOther();
    store.fetchMarksListOfMe((err, result) => {

        if(result){
            // console.log('here')
            this.setState({
                isLoadingMarks: false
            })
        }
    });
    
    // this.processlistMarkMe();
    this.fetchCountries();
    this.fetchWorldwide();
    this.createTimeUnix()
    // console.log('Didmount and fetch Client');
    window.addEventListener('resize', this._onResi);
   
}

handleToggle = () =>{
  this.setState({isOpen:!this.state.isOpen})
}



render(){
    const {store} = this.props;
    const {countries, infoCountry, showSettingVoice, showDetailPlanesKey, showDetailPlanes, readMore} = this.state;

    const me = store.getCurrentUser();
    const nameUser = _.get(me, 'name') || 'weatherApp';
    const allMarkList = store.getAllMarkOther();
    if(allMarkList.toArray().length){
        // console.log(markList.toArray())
        window.sessionStorage.setItem("allMarkOther",  JSON.stringify(allMarkList))
    }
    const markList = store.getMarksOfMe();
    if(markList.toArray().length){
        // console.log(markList.toArray())
        window.sessionStorage.setItem("marksListOfMe",  JSON.stringify(markList))
    }
    // console.log(markList.toArray())
    
    const formatStatInfo = (data) => data ? `+${numeral(data).format("0.0a")}` : "+0"

    const AsyncMap = withScriptjs(
        withGoogleMap(
        props => (

            <GoogleMap google={this.props.google}
            defaultZoom={this.state.zoom}
            defaultCenter={{ lat: this.state.mapPosition.lat, lng: this.state.mapPosition.lng }}
            >
            
            <Autocomplete
                style={{
                width: '32%',
                maxWidth: '100%',
                position: 'absolute',
                height: '34.5px',
                top: '8.4rem',
                right: '4.6rem'
                }}
                onPlaceSelected={ this.onPlaceSelected }
                types={['(regions)']}
                // componentRestrictions={{country: "us"}}
            />          
            {/*Marker*/}
            <Marker google={this.props.google}
                    draggable={true}
                    onDragEnd={ this.onMarkerDragEnd }
                    position={{ lat: this.state.markerPosition.lat, lng: this.state.markerPosition.lng }}
            />
            <Marker />
    
            {/* <InfoWindow
                onClose={this.onInfoWindowClose}
                position={{ lat: ( this.state.markerPosition.lat + 0.0018 ), lng: this.state.markerPosition.lng }}
            >
                <div>
                <span style={{ padding: 0, margin: 0 }}>{ this.state.address }</span>
                </div>
            </InfoWindow> */}
            </GoogleMap>
     )
    )
    );
<<<<<<< HEAD

    //need fix use Redirect

    const toggleAccountUser = () => {
        if(!me){
                // window.location.href = "/ndsappbeta/weather/greeting/newuser&account";
            this.setState({
                isLoginPage: true,
                urlReDirect: '/ndsappbeta/weather/greeting/newuser&account'
            })
            // return (
            //     <Redirect to={"/ndsappbeta/weather/greeting/newuser&account"}/>
            // )
        }else{
            // return (
            //     <Redirect to={"/ndsappbeta/chat"} />
            // )
            this.setState({
                isLoginPage: true,
                urlReDirect: '/ndsappbeta/chat'
            })
            // window.location.href = "ndsappbeta/chat";
        }
    }

    if(this.state.isLoginPage)
    return (<Redirect to={`${this.state.urlReDirect}`}/>)
=======
        
>>>>>>> baf3ed63bb22c8d11807d4c127297193e22183a8

    return (
      <div className="app1">
      <NotificationProvider state = {this.state.addNotiSignal} type = {this.state.typeNoti} message = {this.state.newNotification} />
      <StyledHero img={this.state.img}>
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
            <div onClick={() => toggleAccountUser()} className="toggle-lang">
=======
                <FaAlignLeft className="nav-icon" />
            </button>
            <div onClick={() => this.toggleAccountUser(me)} className="toggle-lang">
>>>>>>> baf3ed63bb22c8d11807d4c127297193e22183a8
               {nameUser}
                {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="25" height="25" aria-hidden="true" focusable="false" fill="currentColor">
                <path d="M217.982 201.586h-64.499c-5.537 0-10.026 4.489-10.026 10.026s4.489 10.026 10.026 10.026h53.547c-4.72 25.263-26.935 44.446-53.547 44.446-30.037 0-54.473-24.436-54.473-54.473s24.436-54.473 54.473-54.473c14.55 0 28.229 5.667 38.518 15.955 3.916 3.916 10.264 3.916 14.178 0 3.916-3.916 3.916-10.264 0-14.178-14.077-14.077-32.791-21.829-52.697-21.829-41.094 0-74.525 33.431-74.525 74.525 0 41.094 33.431 74.525 74.525 74.525s74.525-33.431 74.525-74.525c.001-5.536-4.488-10.025-10.025-10.025z"></path>
                <path d="M470.331 92.24H269.728l-26.935-81.355a10.025 10.025 0 00-9.518-6.875H41.669C18.693 4.01 0 22.703 0 45.679v332.412c0 22.976 18.693 41.669 41.669 41.669h203.145l27.073 81.369a10.026 10.026 0 009.513 6.861h188.932c22.976 0 41.669-18.693 41.669-41.669V133.909c-.001-22.976-18.694-41.669-41.67-41.669zM41.669 399.708c-11.919 0-21.616-9.697-21.616-21.616V45.679c0-11.919 9.697-21.616 21.616-21.616h184.364l70.691 213.516a.366.366 0 00.015.043l53.664 162.086H41.669zm295.78-116.433c.805 1.11 10.824 14.877 26.355 34.066-4.377 5.756-9.015 11.474-13.91 17.036l-29.712-89.74h87.441c-6.196 13.031-16.938 33.813-31.692 55.736-13.553-16.921-22.069-28.622-22.249-28.87-3.251-4.482-9.519-5.481-14.002-2.23-4.482 3.25-5.48 9.518-2.231 14.002zM265.946 419.76h75.162l-55.503 59.084-19.659-59.084zm226.002 46.561c0 11.919-9.697 21.616-21.616 21.616H304.575l67.015-71.339-.004-.003c.293-.312.571-.64.823-.991a10.025 10.025 0 001.39-9.022l-16.688-50.402c7.073-7.406 13.68-15.143 19.805-22.965 13.299 15.772 29.037 33.446 45.778 50.187 1.957 1.957 4.524 2.937 7.089 2.937s5.132-.979 7.089-2.937c3.916-3.916 3.916-10.264 0-14.178-17.461-17.461-34.013-36.244-47.687-52.632 21.251-30.503 35.033-59.504 40.535-71.954h21.454c5.537 0 10.026-4.489 10.026-10.026s-4.489-10.026-10.026-10.026h-66.173v-18.047c0-5.537-4.489-10.026-10.026-10.026s-10.026 4.489-10.026 10.026v18.046h-51.406l-37.178-112.292H470.33c11.919 0 21.616 9.697 21.616 21.616v332.412z"></path>
                </svg> */}
            </div>
        </div>
        
        <div className={this.state.isOpen ? "nav-items show-nav-items" : "nav-items"} >
<<<<<<< HEAD
            
            <a onClick={() => this.toggleActiveWindow(1)} >
                <div  className={classNames('nav-item', {'active': this.state.isChat })}>
                    Weather Mark
                </div>
            </a>
            
            <a onClick={() => this.toggleActiveWindow(2)}>
                <div  className={classNames('nav-item', {'active': this.state.isWrite})}>
                    Corona Mark
                </div>
            </a>
         
            <a onClick={() => this.toggleActiveWindow(3)}>
                <div   className={classNames('nav-item', {'active': this.state.isShowFormAddMessage })}>
                    Plane Mark
                </div>
            </a>
           
            <a  onClick={() => this.toggleActiveWindow(4)}>
                <div   className={classNames('nav-item', {'active': this.state.isShowInstruction })}>
                    Instruction
                </div>
            </a>
        </div>
        </div>
        <div className="main-retrille">
=======
            <a href="">
                <div onClick={() => this.toggleActiveWindow(1)} className={classNames('nav-item', {'active': this.state.isChat })}>
                    Weather Mark
                </div>
            </a>
        <a href="">
            <div onClick={() => this.toggleActiveWindow(2)} className={classNames('nav-item', {'active': this.state.isWrite})}>
                Corona Mark
            </div>
        </a>
        <a href="">
            <div onClick={() => this.toggleActiveWindow(3)}  className={classNames('nav-item', {'active': this.state.isShowFormAddMessage })}>
                Plane Mark
            </div>
        </a>
        <a href="">
            <div onClick={() => this.toggleActiveWindow(4)}  className={classNames('nav-item', {'active': this.state.isShowInstruction })}>
                Instruction
            </div>
        </a>
                    
        </div>
          </div>
          <div className="main-retrille">
>>>>>>> baf3ed63bb22c8d11807d4c127297193e22183a8
            <div className="left-armap">
                {/* <div className="img-user-retrille" >
                    
                    <div onClick={() =>this.toggleAccountUser(me)} className="user-img-channel">
                        <img className="img-profile" src={profileImg ? `http://localhost:8080/${profileImg}` : defaultImg}  alt="user-img"></img>
                    </div>
                  
                    <span>{name}</span>
                </div>   */}
                <ul className="left-navbar-retrille">
                    <li className={this.state.isChat ? "active" : null } onClick={() => this.toggleActiveWindow(1)}>
                        <span><Tooltip title="Weather Mark" placement="left-start">
                            <IconButton style={{fontSize: '1rem', color: 'hsl(186, 100%, 94%)'}}>
                                <TiWeatherPartlySunny />
                            </IconButton></Tooltip>
                        </span>
                        <p></p>
                    </li>
                    <li className={this.state.isWrite ? "active" : null } onClick={() => this.toggleActiveWindow(2)}>
                        <span><Tooltip title="Corona Mark" placement="left-start">
                            <IconButton style={{fontSize: '1rem', color: 'hsl(186, 100%, 94%)'}}>
                                <MdLocalHospital />
                            </IconButton></Tooltip>
                        </span>
                        <p></p>
                    </li>
                    <li className={this.state.isShowFormAddMessage ? "active" : null } onClick={() => this.toggleActiveWindow(3)}>
                        <span><Tooltip title="Plane Mark" placement="left-start">
                            <IconButton style={{fontSize: '1rem', color: 'hsl(186, 100%, 94%)'}}>
                                <RiPlaneLine />
                            </IconButton></Tooltip>
                        </span>
                        <p></p>
                    </li>
                    <li className={this.state.isShowInstruction ? "active" : null } onClick={() => this.toggleActiveWindow(4)}>
                        <span><Tooltip title="Instruction" placement="left-start">
                            <IconButton style={{fontSize: '1rem', color: 'hsl(186, 100%, 94%)'}}>
                                <AiOutlineQuestionCircle />
                            </IconButton>
                            </Tooltip>
                        </span>
                        <p></p>
                    </li>
                    
                </ul>
            </div>

            {
              this.state.isChat ? 
              
              <div className="right-weather">

                <div className="right-retrille-main">
                   
                    <div className='map-content'>     
                        <div className="map-content-left-main">
                            <div className="listMarks">
                                {(this.state.isLoadingMarks && !this.state.isFormAddNewMark) ? <div className='loading-marks'>
                                    <LoadingMini></LoadingMini>
                                </div>
                                : null
                                }
                               
                                {
                                    this.state.isFormAddNewMark ? <form className="form-addmark">
<<<<<<< HEAD
                                        {   this.state.loadingRequire ? <div className="loadingGif-User">
                                                <img className="img-loading-require" src = {loadingImg} alt="" />
                                            </div>
                                            :
                                            null
                                        }
=======
>>>>>>> baf3ed63bb22c8d11807d4c127297193e22183a8
                                        <ul>
                                            <li>
                                            { this.state.message ? <p className={classNames('app-msg', _.get(this.state.message, 'type'))}>
                                                {_.get(this.state.message, 'body')}
                                                </p> : null } 
                                            </li>
                                            <li>
                                                <label htmlFor="message">Name</label>
                                                <input 
                                                placeholder="ex: My Mark" 
                                                required type="text" name="txtNameMark"
                                                value = {this.state.txtNameMark} 
                                                onChange = {({target})=>
                                                    this.setState({txtNameMark: target.value})
                                                } 
<<<<<<< HEAD
                                                autoFocus
=======
>>>>>>> baf3ed63bb22c8d11807d4c127297193e22183a8
                                                id="txtMessage" ></input>
                                            </li>
                                            <li>
                                                <label htmlFor="message">City Name</label>
                                                <input 
                                                placeholder="ex: Sa Dec City" 
                                                type="text" name="txtMessage"
                                                value = {this.state.city} 
                                                onChange = {({target})=>
                                                    this.setState({txtMessage: target.value})
                                                } 
                                                id="txtMessage" ></input>
                                            </li>
                                            <li>
                                                <label htmlFor="message">District</label>
                                                <input 
                                                placeholder="ex: Lai Vung" 
                                                type="text" name="txtMessage"
                                                value = {this.state.area} 
                                                onChange = {({target})=>
                                                    this.setState({txtMessage: target.value})
                                                } 
                                                id="txtMessage" ></input>
                                            </li>
                                            <li>
                                                <label htmlFor="message">State</label>
                                                <input 
                                                placeholder="ex: Dong Thap" 
                                                type="text" name="txtMessage"
                                                value = {this.state.state} 
                                                onChange = {({target})=>
                                                    this.setState({txtMessage: target.value})
                                                } 
                                                id="txtMessage" ></input>
                                            </li>
                                            <li>

                                                <span>
                                                    <label htmlFor="text">Latitude</label>
                                                    <input required value={this.state.mapPosition.lat} onChange={(event) => {
                                                        this.setState({type: event.target.value})
                                                    }}></input>
                                                </span>
                                                <span>
                                                    <label htmlFor="text">Longitude</label>
                                                    <input required value={this.state.mapPosition.lng}
                                                    onChange={(event) => this.setState({ langMessage: event.target.value })}></input>
                                                </span>
                                               
                                            </li>
                                            <li>
                                            <label htmlFor="message">Message</label>
                                           
                                                <input 
                                                placeholder="Your Message" 
                                                type="text" name="txtMessage"
                                                value = {this.state.txtMessage} 
                                                onChange = {({target})=>
                                                    this.setState({txtMessage: target.value})
                                                } 
                                                id="txtMessage" ></input>
                                                <lable className="check-show-author">
                                                    <input type="checkbox" name="showAuthor" id="showAuthor"
                                                    checked={this.state.isShowMark} onChange={(e) => this.setState({isShowMark: e.target.checked})}
                                                    />
                                                    <span  htmlFor="showAuthor" className="checkmark" >Show mark in public</span>
                                                </lable>
                                            </li>
                                            <li> 
                                                <button disabled={!this.state.isFormAddNewMark ? true : false} onClick={this.toggleSubmit}
                                                type="button" className="btn-primary">Add Mark</button>
                                            </li>
                                        </ul>
                                       
                                        </form>
                                        :
                                        null
                                    
                                }
                                {markList.map((mark, key) =>{
                                    
                                    return <div key={key} className={`instruction ${(this.state.questKey.includes(key.toString()) ? 'active' : null)}`}>
                                        <div onClick={() => this.toggleActiveQuestion(key)}  style={{background: `url(${mark.covid19.flag}) center/cover no-repeat`}} className="header-quest">
                                            <span>{mark.nameMark || 'noValue'} </span>
                                            <span>
                                                <IconButton>
                                                    { (this.state.questKey.includes(key.toString())) ? <RiSubtractLine /> : <BsPlus /> }
                                                </IconButton>
                                            </span>
                                        </div>
                                        {/* <div className={`body-quest ${this.state.activeQuestTxt ? "active" : ""}`}> */}
                                        
                                        <div className={`body-quest ${(this.state.questKey.includes(key.toString()) ? 'active' : null)}`}>
                                        <div className="img-user-retrille" >
                           
                                            <div className="user-img-channel">
<<<<<<< HEAD
                                                <img  className="img-profile" src={mark.imgMark ? `https://ndschatserver.herokuapp.com/${mark.imgMark}` : defaultImg}  alt="user-img"></img>
=======
                                                <img  className="img-profile" src={mark.imgMark ? `http://localhost:8080/${mark.imgMark}` : defaultImg}  alt="user-img"></img>
>>>>>>> baf3ed63bb22c8d11807d4c127297193e22183a8
                                            </div>
                                            
                                            <span>| {(mark.lat.toFixed(5))}-{(mark.lng.toFixed(5))} </span>

                                        </div>  

                                            <div className="infobase-mark">
                                    
                                                <span>Basic Info Mark</span>
                                                <div>Manager: {mark.manager}</div>
                                                <div>City name: {mark.city || 'noValue'}</div>
                                                <div>District: {mark.district|| 'noValue'}</div>
                                                <div>State: {mark.state|| 'noValue'}</div>
                                                <div>Continent: {mark.covid19.continent || 'noValue'}</div>
                                                <div>Localtime: {mark.localtime}</div>
                                                <div>Country: {mark.country || 'noValue'}</div>
                                                <div>Public: {mark.public ? 'EveryOne' : 'OnlyMe'}</div>
                                                <div>Follow: {mark.follow ? 'On' : 'Stop'}</div>
                                                <div>Active: {mark.active ? 'online' : null}</div>
                                                <div>Message: {mark.desc}</div>
                                                <div className="deliver-popup"></div>
                                                <span>Monitoring Info Mark</span>
                                                <div>Description: {mark.current.descript}</div>
                                                <div>Calc Temperature: {mark.current.temp_c} degree</div>
                                                <div>Real Temperature: {mark.current.feelslike_c} degress</div>
                                                <div>Precip_Rain: {mark.current.precip_mm} mm</div>
                                                <div>Humidity: {mark.current.humidity}%</div>
                                                <div>Pressure: {mark.current.pressure_mb}Pa</div>
                                                <div>Wind-Dir: {mark.current.wind_dir}</div>
                                                <div>Wind-Degree: {mark.current.wind_degree} Degree</div>
                                                <div>Speed Wind: {mark.current.wind_kph}kph</div>
                                                <div>Uv: {mark.current.uv}</div>
                                                <div>Visible: {mark.current.vis_km} km</div>
                                                <div className="deliver-popup"></div>
                                                <span>Covid19-State</span>  
                                                <div>Casses: {mark.covid19.caseCvid19}</div>
                                                <div>Recovered: {mark.covid19.recoveredCvid19}</div>
                                                <div>Deaths: {mark.covid19.deathsCvid19}</div>
                                                <div>ReCovPerOneMillion: {mark.covid19.recoveredPerOneMillionCvid19}%</div>
                                               

                                                <div>Created: {(new Date(mark.created)).toDateString() + " " + (new Date(mark.created)).getHours() + ":"+ (new Date(mark.created)).getMinutes()}</div>
                                            </div>
                                            
                                        </div>
                                    </div>

                                })}
                               
                            </div>
                        </div>
                        <div className="map-content-right-main">
                            <div className="right-main">
                            <div className="map-cv-header">
                                <div className="invi-marks">
                                    <button 
                                    // disabled={this.state.isFormAddNewMark ? true : false} 
                                    onClick = {this.toggleAddMark}
<<<<<<< HEAD
                                        type="button" className="login-btn">{this.state.isFormAddNewMark ? 'Cancel': 'Add newMark'}
                                    </button>
                                    {/* <div className="action-mini">
                                    <Tooltip title="Add New Mark" placement="left-start">
                                        <IconButton  onClick = {this.toggleAddMark} style={{color: "rgba(199, 159, 199, 0.9)"}} >
                                            {this.state.isFormAddNewMark ? <BsPlus style={{fontSize:'2.2rem'}} /> : <RiSubtractLine style={{fontSize:'2.2rem'}} />}
                                        </IconButton>
                                    </Tooltip>
                                    </div> */}
                                </div>
                                <div className="invi-marks-warning">
                                    Add mark is not supported on this device
=======
                                        type="button" className="login-btn">{this.state.isFormAddNewMark ? 'Cancel': 'Add newMark'}</button>
>>>>>>> baf3ed63bb22c8d11807d4c127297193e22183a8
                                </div>
                                {/* <li>
                                    <select name="" onChange={(e) => this.onChangeCountrySelect(e)} value={this.state.country}>
                                    <option value='worldwide'>Worldwide</option>
                                   {console.log(countries)}
                                        {countries.map(country => (
                                         
                                            <option value={country.value}>{country.name}</option>
                                        ))}
                                    )
                                    </select>
                                </li> */}
                                { !this.state.isFormAddNewMark ?   <li>
                                    <select name=""  onChange={(e) => this.onChangeMarkSelect(e)} value={this.state.markPos} >
                                        <option value='mymark'>MyMark</option>
                                        {markList.map(mark => (
                                            <option value={mark.nameMark}>{mark.nameMark || 'noValue'}</option>
                                        ))}
                                    )
                                    </select>
                                </li>
                                : null}
                              
                            
                            </div>
                            <div className="map-area">
                                {this.state.isFormAddNewMark ?  <AsyncMap
                                    googleMapURL="https://maps.googleapis.com/maps/api/js?hl=en-GB&key=AIzaSyD57PRHJQSQ5XQOuNtAWpRBOP-UCX5pSzA&libraries=places"
                                    loadingElement={
                                    <div style={{ height: `100%` }} />
                                    }
                                    containerElement={
                                    <div style={{ height: `555px` }} />
                                    }
                                    mapElement={
                                    <div style={{ height: `100%` }} />
                                    }
                                />
                                :
                                <MainMap allMark = {allMarkList} marks= {markList} zoom={this.state.mapZoomMain} center={this.state.mapCenterMain} />}
                                
                            </div>
                            </div>
                           
                       
                       </div>
                    </div>


                </div>
                <div className="read-more-weather">

                    <span onClick= {() => this.setState({readMore: !readMore})}>{!readMore ? 'See More' : 'Hidden'}</span>
            
                </div>
                {  
<<<<<<< HEAD
                    readMore ? <div className="main-info-marks">
                    <div className="title-proccess-marks">Visualise Data Marks</div>


                    <div className="proccess-marks-value">
=======
                    readMore ? <><div className="title-proccess-marks">Visualise Data Marks</div>
                    <div className="proccess-marks-value">
                    
>>>>>>> baf3ed63bb22c8d11807d4c127297193e22183a8
                    <table>
                    <caption>Title of table marks</caption>
                        <thead>
                            <tr>
                            <th>MarkPos</th>
                            <th>Latitude</th>
                            <th>Longitude</th>
                            <th>Localtime</th>
                            <th>Country</th>
                            <th>Follow</th>
                            <th>Temperature</th>
                            <th>Real-Temp</th>
                            <th>Humidity</th>
                            <th>Precip-Rain</th>
                            <th>Pressure</th>
                            <th>Uv</th>
                            <th>Visible</th>
                            <th>Wind-speed</th>
                            <th>Wind-dir</th>
                            <th>Gust-wind</th>
                            <th>Last-Update</th>
                           
                            </tr>
                        </thead>
                        <tbody>
                        {markList.map((mark) => (
                               
                               <tr>
                                   <th  data-column="MarkPos">{mark.nameMark || 'noValue'}</th>
                                   <td  data-column="Latitude">{mark.lat.toFixed(5)}</td>
                                   <td  data-column="Longitude">{mark.lng.toFixed(5)}</td>
                                   <td  data-column="Localtime">{(new Date(mark.localtime)).getHours() + ":"+ (new Date(mark.localtime)).getMinutes()}</td>
                                   <td  data-column="Country">{mark.country}</td>
                                   <td  data-column="Follow">{mark.follow ? 'Yes': 'No'}</td>
                                   <td  data-column="Temperature">{mark.current.temp_c}</td>
                                   <td  data-column="Real-Temp">{mark.current.feelslike_c}</td>
                                   <td  data-column="Humidity">{mark.current.humidity}</td>
                                   <td  data-column="Precip-Rain">{mark.current.precip_mm}</td>
                                   <td  data-column="Pressure">{mark.current.pressure_mb}</td>
                                   <td  data-column="Uv">{mark.current.uv}</td>
                                   <td  data-column="Visible">{mark.current.vis_km}</td>
                                   <td  data-column="Wind-speed">{mark.current.wind_kph}</td>
                                   <td  data-column="Wind-dir">{mark.current.wind_dir}</td>
                                   <td  data-column="Gust-wind">{mark.current.gust_kph}</td>
                                   <td  data-column="Last-Update">{(new Date(mark.current.last_updated)).getHours() + ":"+ (new Date(mark.current.last_updated)).getMinutes()}</td>
                                  
                               </tr>
                               
                               ))}
                        </tbody>
                        </table>
                        </div>
                       
<<<<<<< HEAD

=======
>>>>>>> baf3ed63bb22c8d11807d4c127297193e22183a8
                        <div className="chart-marks">
                        {markList.map(mark => (
                            <Charts mark = {mark} />
                        ))}
<<<<<<< HEAD
                        </div>


=======
                                
                            
                            
                        </div>
>>>>>>> baf3ed63bb22c8d11807d4c127297193e22183a8
                        <div className="title-forecast-nexttime">Forecast the nextTime</div>
                        <div className="forecastmark">
    
                            <ChartForecast nameMark = {this.state.markPos} mark = {this.state.markForecast} />
                            
                        </div>
<<<<<<< HEAD
                        </div> : null
=======
                        </> : null
>>>>>>> baf3ed63bb22c8d11807d4c127297193e22183a8
    
                }
               
                    {/* <GetPositionMap

                    google={this.props.google}
                    center={{lat: 18.5204, lng: 73.8567}}
                    height='300px'
                    zoom={15}
                    
                    /> */}

            </div>
            : 
            null
            }
           
            
            {
              this.state.isWrite ? 
              <div className="right-weather">
                <div className="right-retrille-main">
                    <div className='map-content'>
                        <div className="map-content-left">
                            <div className="map-cv-header">
                                <div className="invi-marks"></div>
                                <li>
                                    <select name="" onChange={(e) => this.onChangeCountrySelect(e)} value={this.state.country}>
                                    <option value='worldwide'>Worldwide</option>
                                        {countries.map(country => (
                                            <option value={country.value}>{country.name}</option>
                                        ))}
                                    )
                                    </select>
                                </li>
                            
                            </div>
                            <div className="map-cv-stats">
                                <InfoBox active={this.state.casesType === "cases"}
                                onClick={() => this.setState({casesType: 'cases'})} 
                                title ="Coronavirus Cases" cases= {formatStatInfo(infoCountry.todayCases)} 
                                total={numeral(infoCountry.cases).format("0.0a")}/>
                                <InfoBox active={this.state.casesType === "recovered"}
                                onClick={() => this.setState({casesType: 'recovered'})} 
                                title ="Recovered" cases= {formatStatInfo(infoCountry.todayRecovered)} 
                                total= {numeral(infoCountry.recovered).format("0.0a")} />
                                <InfoBox active={this.state.casesType === "deaths"}
                                onClick={() => this.setState({casesType: 'deaths'})} 
                                title ="Deaths" cases= {formatStatInfo(infoCountry.todayDeaths)} 
                                total= {numeral(infoCountry.deaths).format("0.0a")}/>
                            </div>
                            <div className="map-area">
                                <MapCv marks= {markList} casesType= {this.state.casesType} countries= {this.state.mapCountries} zoom={this.state.mapZoom} center={this.state.mapCenter} />
                            </div>
                        </div>
<<<<<<< HEAD
                        <div className="map-content-right">
                        <Card>
=======
                        <Card className="map-content-right">
>>>>>>> baf3ed63bb22c8d11807d4c127297193e22183a8
                            <CardContent>
                                <div className='map-header-right'>
                                    <span>Live Cases by Country</span>
                                    <IconButton onClick={this.toggleChangeTypeSort}>
                                        <BiSort style={{color: `${this.state.colorBtnSort}`, fontSize: '1.5rem'}} />
                                    </IconButton>
                                </div>
                               
                                
                                <Table countries={this.state.tableData} />
                                <h5 style={{marginTop: '1rem', textAlign: 'center'}}>Live rate value</h5>
                                <LineGraph casesType= {this.state.casesType} />

                            </CardContent>
                            {/* <CardContent>Some thing here</CardContent> */}
                        </Card>
<<<<<<< HEAD
                        </div>
=======
>>>>>>> baf3ed63bb22c8d11807d4c127297193e22183a8
                    </div>

                </div>
            </div>
            : 
            null
            }
            {
<<<<<<< HEAD
            this.state.isShowFormAddMessage ? 
            <div className="right-weather">
                <div className="main-plane-map">
                    <div className='map-plane'>
                        {(this.state.isAllPlanes === 2 || this.state.isRealtimePlane === 1)?  <div className="map-cv-header">
                            <div className="invi-marks">
                                <div className="name-planes-ofmark">
                                    Name Mark:    {this.state.markPos}
                                </div>
                                <div className="total-planes-ofmark">
                                    Active (R=100km):   {this.state.amountPlanesOfMark || 0} aircraft
                                </div>
                                <div className="timelast-planes-ofmark">
                                    Last Contact:   <Moment fromNow>{this.state.lastContactOfMark}</Moment>
                                </div>
                            </div>

                            {
                                this.state.isRealtimePlane === 0 ?  <>
                                <span style={{color: 'rgba(0, 0, 0, 0.6)'}}>Static Time</span>
                                <li>
                                    <select name=""  onChange={(e) => this.onChangeMarkSelect(e)} value={this.state.markPos} >
                                        <option value='mymark'>MyMark</option>
                                        {markList.map(mark => (
                                            <option value={mark.nameMark}>{mark.nameMark || 'noValue'}</option>
                                        ))}
                                    )
                                    </select>
                                </li>
                                </> : <>
                                <span style={{color: 'rgb(36, 139, 10)'}}>Real Time</span>
                                <li>
                                    <select name=""  onChange={(e) => this.onChangeMarkSelectRealtime(e)} value={this.state.markPosRealtime} >
                                        {markList.map(mark => (
                                            <option value={mark.nameMark}>{mark.nameMark || 'noValue'}</option>
                                        ))}
                                    )
                                    </select>
                                </li>
                                </>
                            }
                            
                        
                        </div> : null}
                        
                        <div className="map-area">
                            
                            <MapPlane infoPlanes = {(e, i, l) => this.infoPlanes(e, i, l)} 
                                marks= {markList.toArray()} isRealtimePlane = {this.state.isRealtimePlane} 
                                isAllPlanes= {this.state.isAllPlanes} 
                                mapMarkfindPlaneRealtime = {this.state.mapMarkfindPlaneRealtime}
                                zoom={this.state.mapZoom} center={this.state.mapCenter} 
                                typeOfMap={this.state.typeOfMap} mapMarkfindPlane={this.state.mapMarkfindPlane}
                                infoPlanesOfMark = {(e, l) => this.infoPlanesOfMark(e, l)}
                                    />
                            
                        </div>
                    </div>
                    <div className="right-navbar">
                        <ul className="right-navbar-write">
                            <li>
                                <span><Tooltip  title="Show Tab Left" placement="left-start">
                                    <IconButton onClick={() => this.setState({showSettingVoice: !showSettingVoice, isRealtimePlane: false})} style={{fontSize: '1rem', color: 'hsl(186, 100%, 94%)'}}>
                                        <BiDotsHorizontalRounded />
                                    </IconButton></Tooltip>
                                </span>
                                <p></p>
                            </li>
                            <li>
                                <span><Tooltip title="AirCraft in Range" placement="left-start">

                                    {this.state.isRealtimePlane === 1 ? <IconButton onClick={this.toggleChangeIsPlanes} style={{fontSize: '1rem', color: 'rgb(36, 139, 10)'}}>
                                        <BiRadioCircleMarked />
                                    </IconButton> : <IconButton onClick={this.toggleChangeIsPlanes} style={{fontSize: '1rem', color: 'hsl(186, 100%, 94%)'}}>
                                        <BiRadioCircleMarked />
                                    </IconButton>  }

                                    </Tooltip>

                                </span>
                                <p></p>
                            </li>
                            <li>
                                <span><Tooltip title="All AirCraft" placement="left-start">
                                    <IconButton onClick={() => this.setState({ isRealtimePlane: 0, isAllPlanes: 0})} style={{fontSize: '1rem', color: 'hsl(186, 100%, 94%)'}}>
                                        <IoIosPlanet />
                                    </IconButton></Tooltip>
                                </span>
                                <p></p>
                            </li>
                            <li>
                                <span><Tooltip title="Aircraft in Marks" placement="left-start">
                                    <IconButton onClick={() => this.setState({isRealtimePlane: 0, isAllPlanes: 1})} style={{fontSize: '1rem', color: 'hsl(186, 100%, 94%)'}}>
                                        <BiCurrentLocation />
                                    </IconButton></Tooltip>
                                </span>
                                <p></p>
                            </li>
                            <li>
                                <span><Tooltip title="Hide AirCraft" placement="left-start">
                                    <IconButton onClick={() => this.setState({isRealtimePlane: 0, isAllPlanes: false})} style={{fontSize: '1rem', color: 'hsl(186, 100%, 94%)'}}>
                                        <MdAirplanemodeInactive />
                                    </IconButton></Tooltip>
                                </span>
                                <p></p>
                            </li>
                            <li>
                                <span><Tooltip title="StreetMap" placement="left-start">
                                    <IconButton onClick={() => this.setState({typeOfMap: 0})} style={{fontSize: '1rem', color: 'hsl(186, 100%, 94%)'}}>
                                        <SiOpenstreetmap />
                                    </IconButton></Tooltip>
                                </span>
                                <p></p>
                            </li>
                            <li>
                                <span><Tooltip title="GeographyMap" placement="left-start">
                                    <IconButton onClick={() => this.setState({typeOfMap: 1})} style={{fontSize: '1rem', color: 'hsl(186, 100%, 94%)'}}>
                                        <RiMap2Fill />
                                    </IconButton></Tooltip>
                                </span>
                                <p></p>
                            </li>
                            <li>
                                <span><Tooltip title="LightMap" placement="left-start">
                                    <IconButton onClick={() => this.setState({typeOfMap: 2})} style={{fontSize: '1rem', color: 'hsl(186, 100%, 94%)'}}>
                                        <FaRegMap />
                                    </IconButton></Tooltip>
                                </span>
                                <p></p>
                            </li>
                            <li>
                                <span><Tooltip title="DarkMap" placement="left-start">
                                    <IconButton onClick={() => this.setState({typeOfMap: 3})} style={{fontSize: '1rem', color: 'hsl(186, 100%, 94%)'}}>
                                        <FaMap />
                                    </IconButton></Tooltip>
                                </span>
                                <p></p>
                            </li>
                            
                                                                        
                        </ul>
                    </div>
                </div>
            </div>
            : null
        }
        {showSettingVoice ? <Draggable style={{
                            zIndex: 1111,
                            position: 'absolute',
                            cursor: 'move',
                            maxHeight: '40rem',
                            left: '3.5rem',
                            marginRight: '1rem', 
                            transform: 'translate(-50%, 0)',
                        }}>
                    <div className="tab-plane-left">
                        <div className='main-tab-plane-left'>
                            <h4>Data Marks-Flight</h4>
                            <div className="header-tab-plane-left">
                                <div className="total">Total: {this.state.amountPlanes} </div>
                                <div className="lats-connect"> Last Contact: <Moment fromNow>{this.state.lastContact}</Moment></div>
                            </div>  
                            {/* <div className="deliver-popup"></div> */}

                            {this.state.listPlanes.map((listPlanes, key) => {
                                return (
                                    
                                    <div className="list-planes-ofmarks">
                                    
                                        <div className='list-planes-title'>
                                        {listPlanes.nameMark || 'noValue'}
                                        <span>{(listPlanes.data).length} planes</span>
                                        <span>
                                            <IconButton onClick={() => this.setState({showDetailPlanes: !showDetailPlanes, showDetailPlanesKey: key })} style={{fontSize: '1rem', color: 'hsl(186, 100%, 94%)'}}>
                                                <AiOutlineQuestionCircle />
                                            </IconButton>
                                        </span>
                                        </div>
                                        {showDetailPlanes && (showDetailPlanesKey === key) ? <div className="list-item-plane-mark">
                                            {listPlanes.data.map((plane, key) => (
                                                <div className="item-plane-mark">
                                                {/* <div className="deliver-popup"></div> */}
                                                    <div className="icao">iCAO24:  {plane.icao24}</div>
                                                    <div className="signCall">CallSign:   {plane.callSign}</div>
                                                    <div className="originCountry">Country-Original:   {plane.origin_country}</div>
                                                    <div className="source">Source-Signal:   {plane.position_source===0 ? 'ADS-B' : ( plane.position_source===1 ? 'ASTERIX' : 'MLAT' )}</div>
                                                <div className="deliver-popup"></div>
                                                    <div className="locationPlane">
                                                        Location Current:   {plane.location.lat},  {plane.location.lng}
                                                    </div>
                                                    <div className="connectionLast">Last Contact: <Moment fromNow>{plane.last_contact}</Moment></div>
                                                    <div className="baroPlane">
                                                        Baro Current:   {plane.baro_altitude}m - {(plane.baro_altitude * 3.28).toFixed(2)}ft
                                                    </div>
                                                    <div className="">
                                                        Current Speed:   {plane.velocity}m/s - {(plane.velocity * 3.6).toFixed(2)}km/h
                                                    </div>
                                                    <div className="currentPlane">Current Dir:   {plane.true_track} (degree)</div>
                                                {/* <div className="deliver-popup"></div> */}

                                                </div>
                                            ))}
                                        
                                            </div> : null }
                                    
                                    </div>
                                
                                )
                            // console.log(listPlanes)
                                }

                            )
                                                                            
                        }
                        </div>
                    </div>
                </Draggable>
                :
                null
                }
                {
            this.state.isShowInstruction ? 
            <div className="main-instruction-weather">
                <div className="instruction-weather">
                    <div className="header-instruction">The current page has been changed to the HelpsApp page</div>
                    <button type="button" className="btn-primary"><a href="/about/help">See More</a></button>
                </div>
            </div>
            : null
        }
=======
                        this.state.isShowFormAddMessage ? 
                        <div className="right-weather">
                            <div className="main-plane-map">
                                <div className='map-plane'>
                                    {(this.state.isAllPlanes === 2 || this.state.isRealtimePlane === 1)?  <div className="map-cv-header">
                                        <div className="invi-marks">
                                            <div className="name-planes-ofmark">
                                                Name Mark:    {this.state.markPos}
                                            </div>
                                            <div className="total-planes-ofmark">
                                                Active (R=100km):   {this.state.amountPlanesOfMark || 0} aircraft
                                            </div>
                                            <div className="timelast-planes-ofmark">
                                                Last Contact:   <Moment fromNow>{this.state.lastContactOfMark}</Moment>
                                            </div>
                                        </div>

                                        {
                                            this.state.isRealtimePlane === 0 ?  <>
                                            <span style={{color: 'rgba(0, 0, 0, 0.6)'}}>Static Time</span>
                                            <li>
                                                <select name=""  onChange={(e) => this.onChangeMarkSelect(e)} value={this.state.markPos} >
                                                    <option value='mymark'>MyMark</option>
                                                    {markList.map(mark => (
                                                        <option value={mark.nameMark}>{mark.nameMark || 'noValue'}</option>
                                                    ))}
                                                )
                                                </select>
                                            </li>
                                            </> : <>
                                            <span style={{color: 'rgb(36, 139, 10)'}}>Real Time</span>
                                            <li>
                                                <select name=""  onChange={(e) => this.onChangeMarkSelectRealtime(e)} value={this.state.markPosRealtime} >
                                                    {markList.map(mark => (
                                                        <option value={mark.nameMark}>{mark.nameMark || 'noValue'}</option>
                                                    ))}
                                                )
                                                </select>
                                            </li>
                                            </>
                                        }
                                        
                                    
                                    </div> : null}
                                   
                                    <div className="map-area">
                                        
                                        <MapPlane infoPlanes = {(e, i, l) => this.infoPlanes(e, i, l)} 
                                            marks= {markList.toArray()} isRealtimePlane = {this.state.isRealtimePlane} 
                                            isAllPlanes= {this.state.isAllPlanes} 
                                            mapMarkfindPlaneRealtime = {this.state.mapMarkfindPlaneRealtime}
                                            zoom={this.state.mapZoom} center={this.state.mapCenter} 
                                            typeOfMap={this.state.typeOfMap} mapMarkfindPlane={this.state.mapMarkfindPlane}
                                            infoPlanesOfMark = {(e, l) => this.infoPlanesOfMark(e, l)}
                                             />
                                       
                                    </div>
                                </div>
                                <div className="right-navbar">
                                    <ul className="right-navbar-write">
                                        <li>
                                            <span><Tooltip  title="Show Tab Left" placement="left-start">
                                                <IconButton onClick={() => this.setState({showSettingVoice: !showSettingVoice, isRealtimePlane: false})} style={{fontSize: '1rem', color: 'hsl(186, 100%, 94%)'}}>
                                                    <BiDotsHorizontalRounded />
                                                </IconButton></Tooltip>
                                            </span>
                                            <p></p>
                                        </li>
                                        <li>
                                            <span><Tooltip title="AirCraft in Range" placement="left-start">

                                                {this.state.isRealtimePlane === 1 ? <IconButton onClick={this.toggleChangeIsPlanes} style={{fontSize: '1rem', color: 'rgb(36, 139, 10)'}}>
                                                    <BiRadioCircleMarked />
                                                </IconButton> : <IconButton onClick={this.toggleChangeIsPlanes} style={{fontSize: '1rem', color: 'hsl(186, 100%, 94%)'}}>
                                                    <BiRadioCircleMarked />
                                                </IconButton>  }

                                                </Tooltip>

                                            </span>
                                            <p></p>
                                        </li>
                                        <li>
                                            <span><Tooltip title="All AirCraft" placement="left-start">
                                                <IconButton onClick={() => this.setState({ isRealtimePlane: 0, isAllPlanes: 0})} style={{fontSize: '1rem', color: 'hsl(186, 100%, 94%)'}}>
                                                    <IoIosPlanet />
                                                </IconButton></Tooltip>
                                            </span>
                                            <p></p>
                                        </li>
                                        <li>
                                            <span><Tooltip title="Aircraft in Marks" placement="left-start">
                                                <IconButton onClick={() => this.setState({isRealtimePlane: 0, isAllPlanes: 1})} style={{fontSize: '1rem', color: 'hsl(186, 100%, 94%)'}}>
                                                    <BiCurrentLocation />
                                                </IconButton></Tooltip>
                                            </span>
                                            <p></p>
                                        </li>
                                        <li>
                                            <span><Tooltip title="Hide AirCraft" placement="left-start">
                                                <IconButton onClick={() => this.setState({isRealtimePlane: 0, isAllPlanes: false})} style={{fontSize: '1rem', color: 'hsl(186, 100%, 94%)'}}>
                                                    <MdAirplanemodeInactive />
                                                </IconButton></Tooltip>
                                            </span>
                                            <p></p>
                                        </li>
                                        <li>
                                            <span><Tooltip title="StreetMap" placement="left-start">
                                                <IconButton onClick={() => this.setState({typeOfMap: 0})} style={{fontSize: '1rem', color: 'hsl(186, 100%, 94%)'}}>
                                                    <SiOpenstreetmap />
                                                </IconButton></Tooltip>
                                            </span>
                                            <p></p>
                                        </li>
                                        <li>
                                            <span><Tooltip title="GeographyMap" placement="left-start">
                                                <IconButton onClick={() => this.setState({typeOfMap: 1})} style={{fontSize: '1rem', color: 'hsl(186, 100%, 94%)'}}>
                                                    <RiMap2Fill />
                                                </IconButton></Tooltip>
                                            </span>
                                            <p></p>
                                        </li>
                                        <li>
                                            <span><Tooltip title="LightMap" placement="left-start">
                                                <IconButton onClick={() => this.setState({typeOfMap: 2})} style={{fontSize: '1rem', color: 'hsl(186, 100%, 94%)'}}>
                                                    <FaRegMap />
                                                </IconButton></Tooltip>
                                            </span>
                                            <p></p>
                                        </li>
                                        <li>
                                            <span><Tooltip title="DarkMap" placement="left-start">
                                                <IconButton onClick={() => this.setState({typeOfMap: 3})} style={{fontSize: '1rem', color: 'hsl(186, 100%, 94%)'}}>
                                                    <FaMap />
                                                </IconButton></Tooltip>
                                            </span>
                                            <p></p>
                                        </li>
                                       
                                                                                  
                                    </ul>
                                </div>
                            </div>
                        </div>
                        : null
                    }
                    {showSettingVoice ? <Draggable style={{
                                        zIndex: 1111,
                                        position: 'absolute',
                                        cursor: 'move',
                                        maxHeight: '40rem',
                                        left: '3.5rem',
                                        marginRight: '1rem', 
                                        transform: 'translate(-50%, 0)',
                                    }}>
                                <div className="tab-plane-left">
                                    <div className='main-tab-plane-left'>
                                        <h4>Data Marks-Flight</h4>
                                        <div className="header-tab-plane-left">
                                            <div className="total">Total: {this.state.amountPlanes} </div>
                                            <div className="lats-connect"> Last Contact: <Moment fromNow>{this.state.lastContact}</Moment></div>
                                        </div>  
                                        {/* <div className="deliver-popup"></div> */}

                                        {this.state.listPlanes.map((listPlanes, key) => {
                                            return (
                                                
                                                <div className="list-planes-ofmarks">
                                                
                                                    <div className='list-planes-title'>
                                                    {listPlanes.nameMark || 'noValue'}
                                                    <span>{(listPlanes.data).length} planes</span>
                                                    <span>
                                                        <IconButton onClick={() => this.setState({showDetailPlanes: !showDetailPlanes, showDetailPlanesKey: key })} style={{fontSize: '1rem', color: 'hsl(186, 100%, 94%)'}}>
                                                            <AiOutlineQuestionCircle />
                                                        </IconButton>
                                                    </span>
                                                    </div>
                                                    {showDetailPlanes && (showDetailPlanesKey === key) ? <div className="list-item-plane-mark">
                                                        {listPlanes.data.map((plane, key) => (
                                                            <div className="item-plane-mark">
                                                            {/* <div className="deliver-popup"></div> */}
                                                                <div className="icao">iCAO24:  {plane.icao24}</div>
                                                                <div className="signCall">CallSign:   {plane.callSign}</div>
                                                                <div className="originCountry">Country-Original:   {plane.origin_country}</div>
                                                                <div className="source">Source-Signal:   {plane.position_source===0 ? 'ADS-B' : ( plane.position_source===1 ? 'ASTERIX' : 'MLAT' )}</div>
                                                            <div className="deliver-popup"></div>
                                                                <div className="locationPlane">
                                                                    Location Current:   {plane.location.lat},  {plane.location.lng}
                                                                </div>
                                                                <div className="connectionLast">Last Contact: <Moment fromNow>{plane.last_contact}</Moment></div>
                                                                <div className="baroPlane">
                                                                    Baro Current:   {plane.baro_altitude}m - {(plane.baro_altitude * 3.28).toFixed(2)}ft
                                                                </div>
                                                                <div className="">
                                                                    Current Speed:   {plane.velocity}m/s - {(plane.velocity * 3.6).toFixed(2)}km/h
                                                                </div>
                                                                <div className="currentPlane">Current Dir:   {plane.true_track} (degree)</div>
                                                            {/* <div className="deliver-popup"></div> */}

                                                            </div>
                                                        ))}
                                                   
                                                        </div> : null }
                                                
                                                </div>
                                            
                                            )
                                        // console.log(listPlanes)
                                         }

                                        )
                                                                                        
                                    }
                                    </div>
                                </div>
                            </Draggable>
                            :
                            null
                            }
                            {
                        this.state.isShowInstruction ? 
                        <div className="main-instruction-weather">
                            <div className="instruction-weather">
                                <div className="header-instruction">The current page has been changed to the HelpsApp page</div>
                                <button type="button" className="btn-primary"><a href="/about/help">See More</a></button>
                            </div>
                        </div>
                        : null
                    }
>>>>>>> baf3ed63bb22c8d11807d4c127297193e22183a8

        </div>

      </StyledHero>
      </div>
       
    );
  }
<<<<<<< HEAD
}
=======
}

>>>>>>> baf3ed63bb22c8d11807d4c127297193e22183a8
