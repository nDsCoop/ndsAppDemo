import React, { useEffect, useState } from 'react'
import { Map as LeafletMap, TileLayer, Circle, Popup, Marker} from 'react-leaflet';
import L from 'leaflet';
import _ from 'lodash';
import planeLight from '../../images/plane-light.svg';
import plane from '../../images/plane.svg';
import Moment from 'react-moment';
import LoadingMini from '../Loading-mini';

// const numeral = require('numeral');



export default function MapPlane({marks, center, zoom, infoPlanesOfMark, infoPlanes, isRealtimePlane = 0, isAllPlanes = 0, typeOfMap = 0, mapMarkfindPlane = {lat: 0, lng: 0}, mapMarkfindPlaneRealtime = {lat: 0, lng: 0} }) {
    const [mapZoom, setMapZoom] = useState(zoom);
    const [mapCenter, setMapCenter] = useState(center)
    const [dataPlane, setDataPlane] = useState([]);
    const [intervalPlane, setIntervalPlane] = useState(null);
    const [loading, setLoading] = useState(true)
    const [listMarkPlane , setListMarkPlane] = useState([]);
    const [dataPlaneOfMarks, setDataPlaneOfMarks] = useState([]);
    const [showDataPlaneToMap, setShowDataPlaneToMap] = useState([]);
   
    // const casesTypeColors = {
    //     cases: {
    //         hex: "#fb4443",
    //         multiplier: 600,
    //     },
    //     recovered: {
    //         hex: "#7dd71d",
    //         multiplier: 600,
    //     },
    //     deaths: {
    //         hex: "#CC1034",
    //         multiplier: 800,
    //     }
    // }

    const regex = /\s+(\w)?/gi;

    const proccessCountry = (country) => country.toLowerCase().replace(regex, function(match, letter) {
        
        return letter;
    });

    // function unique(arr, comparator) {
    //     var uniqueArr = [];
    //     for (var i in arr) {
    //       var found = false;
    //       for (var j in uniqueArr) {
    //         if (comparator instanceof Function) {
    //           if (comparator.call(null, arr[i], uniqueArr[j])) {
    //             found = true;
    //             break;
    //           }
    //         } else {
    //           if (arr[i] == uniqueArr[j]) {
    //             found = true;
    //             break;
    //           }
    //         }
    //       }
    //       if (!found) {
    //         uniqueArr.push(arr[i]);
    //       }
    //     }
    //     return uniqueArr;
    //   };

    const processPlaneIcon = (rotate) => L.divIcon({
        iconSize: [20, 20],
        iconAnchor: [10, 10],
        className: 'yourClassName',
        strokeColor: 'black',
        strokeOpacity: 1,
        fillColor: 'yellow',
        fillOpacity: 0.9,
        html: `<img
        style="transform: rotate(${rotate}deg);"
        height="25" 
        width="25"
        background-color="rgba(28, 158, 10, 0.9)"
        src=${(typeOfMap === 3) ? planeLight : plane}
        
        >`

    })
    // src='https://raw.githubusercontent.com/bbecquet/Leaflet.PolylineDecorator/master/example/icon_plane.png'

    const century21icon = L.icon({
        iconUrl: "https://unpkg.com/leaflet@1.0.3/dist/images/marker-icon.png",
        
        iconSize: [20, 30],
        iconAnchor: [18, 18],
        popupAnchor: [0, -10],
        shadowSize: [0, 0],
        shadowAnchor: [10, 10]
    });

    const showMarksOnMap = (marks) => 
    marks.map((mark) => (
      
        <Marker
        icon={century21icon}
        position={[mark.lat, mark.lng]}
        >
             
            <Popup>               
                <div className="info-popup-map">
                   
                    <div className="info-flag"
                        style={{backgroundImage: `url(${mark.covid19.flag})`}}
                    />
                    <div className="info-name-country">{mark.country}</div>
                    <div className="info-confirmed">
                        Name Pos: {mark.nameMark || 'noValue'}
                    </div>
                    <div className="info-recovered">
                        Onwer Pos: {mark.manager}
                    </div>
                    <div className="info-deaths">
                        Location Pos: {(mark.lat).toFixed(5)}, {(mark.lng).toFixed(5)}
                    </div>
                    <div className="deliver-popup"></div>
                    <div className="message-mark">Message: {mark.desc}</div>
                </div>
            </Popup>
            </Marker>
       
    ))

    const circleMarks = (marks) => 
    marks.map((mark) => (
       
        <Circle
        center={[mark.lat, mark.lng]}
        color="rgba(255, 41, 0, 0.4)"
        fillOpacity={0.22}
        fillColor="rgba(22, 25, 76, 0.28)"
        radius= {Math.sqrt(330000) * 600} >
        </Circle>

    ))





    // const showDataOnMap = (data) => 
    //     data.map((plane) => (
    //         console.log(plane.latitude, plane.latitude , typeof(plane.latitude))
            
    //         <Marker
           
    //         position={[0, 0]}
    //         > <Popup>               
    //         <div className="info-popup-map"> 
    //         <p>
    //            {plane.location.lat}
    //            {plane.location.lng}
    //            {plane.icao24}
    //            {plane.callSign}
    //            {plane.origin_country}
    //            {plane.baro_altitude}
    //            {plane.position_source}
              
    //        </p>
    //        </div></Popup></Marker>
          
           
    // ))
    const typeMapChoose = (key) => {

        switch(key){
            case 0:
                return (
                    <>
                        {/* opentopomap  openstreetmap server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile tile.thunderforest.com/transport-dark tiles.stadiamaps.com/tiles/alidade_smooth tiles.stadiamaps.com/tiles/alidade_smooth_dark */}
                        <TileLayer
                        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        />
                    </>
                )
            case 1:
                return (
                    <>
                        {/* opentopomap  openstreetmap server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile tile.thunderforest.com/transport-dark tiles.stadiamaps.com/tiles/alidade_smooth tiles.stadiamaps.com/tiles/alidade_smooth_dark */}
                        <TileLayer
                        url='https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png'
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        />
                    </>
                )

            case 2:
                return (

                    <>
                        {/* opentopomap  openstreetmap server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile tile.thunderforest.com/transport-dark tiles.stadiamaps.com/tiles/alidade_smooth tiles.stadiamaps.com/tiles/alidade_smooth_dark */}
                        <TileLayer
                        url='https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}.png'
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        />
                    </>
                )
            
            case 3:
                return (
                <>
                        {/* opentopomap  openstreetmap server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile tile.thunderforest.com/transport-dark tiles.stadiamaps.com/tiles/alidade_smooth tiles.stadiamaps.com/tiles/alidade_smooth_dark */}
                        <TileLayer
                        url='https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}.png'
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        />
                </>
                )
            
        }
    }
        
    

    const proccessPlaneData = datas => {

        let temp = []
        let temp0 = []
        let temp1 = []
        _.each(marks, (mark, key) => {
        //    console.log(mark)
            
            _.each(datas, (data, key) => {
                _.each(data, function(value, key){ 
                    // console.log(proccessCountry(mark.country), proccessCountry(value[2]))
                    if(proccessCountry(mark.country) === proccessCountry(value[2])){
                        
                        const plane = {
                            
                            icao24: value[0],
                            callSign: value[1],
                            origin_country: value[2],
                            time_position: value[3],
                            last_contact: new Date(),
                            location : {
                                lng: value[5],
                                lat: value[6],
                            },
                            baro_altitude: value[7],
                            on_ground: value[8],
                            velocity: value[9],
                            true_track: value[10],
                            vertical_rate:value[11],
                            sensors: value[12],
                            geo_altitude: value[13],
                            squawk: value[14],
                            spi: value[15],
                            position_source: value[16],
                    }
                    temp1.push(plane)
                    temp0.push(plane)
                    }   
                    
                    // console.log(mark.country, value[2])
                        
            })})
            let planeOfMark = {
                nameMark: mark.nameMark,
                data: temp1
            }
            // console.log(planeOfMark)
           
            temp.push(planeOfMark)
           
            planeOfMark = null
            temp1 = []

        })
        setShowDataPlaneToMap(temp0)
        setDataPlaneOfMarks(temp0)
        return temp
    }

    const buildPlaneData = (datas) => {
        let temp = []
        _.each(datas, (data, key) => {
            _.each(data, function(value, key){
        
            const plane = {
                    icao24: value[0],
                    callSign: value[1],
                    origin_country: value[2],
                    time_position: value[3],
                    last_contact: new Date(),
                    location : {
                        lng: value[5],
                        lat: value[6],
                    },
                    baro_altitude: value[7],
                    on_ground: value[8],
                    velocity: value[9],
                    true_track: value[10],
                    vertical_rate:value[11],
                    sensors: value[12],
                    geo_altitude: value[13],
                    squawk: value[14],
                    spi: value[15],
                    position_source: value[16],
            }

       
            temp.push(plane)


                });

            })
            return temp;
        }

        const handleStartRealtime = () => {
                // if(mapMarkfindPlane.lat){
                //     clearInterval(myInterval)
                // }
                // let temp = mapMarkfindPlane.lat

                // 
                setListMarkPlane([])

                const myInterval = setInterval(() =>
                // console.log('you is realtime loop', mapMarkfindPlaneRealtime)
               
                fetch(`https://opensky-network.org/api/states/all?lamin=${mapMarkfindPlaneRealtime.lat-2}&lomin=${mapMarkfindPlaneRealtime.lng-2}&lamax=${mapMarkfindPlaneRealtime.lat+2}&lomax=${mapMarkfindPlaneRealtime.lng+2}`,{
                    method: 'GET',
                    credentials: 'same-origin',
                    redirect: 'follow',
                    agent: null,
                    headers: {
                        "Content-Type": "text/plain",
                        'Authorization': 'Basic ' + btoa('nds.tphcm:Hippo956592'),
                    },
                    })
                .then((response) => response.json())
                .then((datas) => {
                    let listData = []
                    setShowDataPlaneToMap([])
                    _.each(datas, (data, key) => {
                        _.each(data, function(value, key){
                            const plane = {
                                icao24: value[0],
                                callSign: value[1],
                                origin_country: value[2],
                                time_position: value[3],
                                last_contact: new Date(),
                                location : {
                                    lng: value[5],
                                    lat: value[6],
                                },
                                baro_altitude: value[7],
                                on_ground: value[8],
                                velocity: value[9],
                                true_track: value[10],
                                vertical_rate:value[11],
                                sensors: value[12],
                                geo_altitude: value[13],
                                squawk: value[14],
                                spi: value[15],
                                position_source: value[16],
                            }
            
                   
                            listData.push(plane)

                        })})

                    infoPlanesOfMark(listData.length, new Date())
                    setMapCenter({ lat: mapMarkfindPlaneRealtime.lat, lng: mapMarkfindPlaneRealtime.lng })
                    setMapZoom(6)
                    setShowDataPlaneToMap(listData)
                    //after  need setState for page cant load new data
                   
                })

            , 1000)
            setIntervalPlane(myInterval)

        }

        useEffect(() => {

            const fetchData = async () => {
            // console.log(mapMarkfindPlane)
                if(mapMarkfindPlane){
                
                setListMarkPlane([])
                let listData = []
                
                fetch(`https://opensky-network.org/api/states/all?lamin=${mapMarkfindPlane.lat-2}&lomin=${mapMarkfindPlane.lng-2}&lamax=${mapMarkfindPlane.lat+2}&lomax=${mapMarkfindPlane.lng+2}`,{
                    method: 'GET',
                    credentials: 'same-origin',
                    redirect: 'follow',
                    agent: null,
                    headers: {
                        "Content-Type": "text/plain",
                        'Authorization': 'Basic ' + btoa('nds.tphcm:Hippo956592'),
                    },
                    })
                .then((response) => response.json())
                .then((datas) => {
                
                    _.each(datas, (data, key) => {
                        _.each(data, function(value, key){
                            const plane = {
                                icao24: value[0],
                                callSign: value[1],
                                origin_country: value[2],
                                time_position: value[3],
                                last_contact: new Date(),
                                location : {
                                    lng: value[5],
                                    lat: value[6],
                                },
                                baro_altitude: value[7],
                                on_ground: value[8],
                                velocity: value[9],
                                true_track: value[10],
                                vertical_rate:value[11],
                                sensors: value[12],
                                geo_altitude: value[13],
                                squawk: value[14],
                                spi: value[15],
                                position_source: value[16],
                            }
            
                   
                            listData.push(plane)

                        })})
                   
                    infoPlanesOfMark(listData.length, new Date())
                    setListMarkPlane(listData)
                    setMapCenter({ lat: mapMarkfindPlane.lat, lng: mapMarkfindPlane.lng })
                    setMapZoom(6)
                    setShowDataPlaneToMap(listData)
                    //after  need setState for page cant load new data
                })
               
            }
        }
        if(isAllPlanes !== 1){
            fetchData()
        }
            
        }, [mapMarkfindPlane])

        useEffect(() => {
            
            if(mapMarkfindPlaneRealtime){

                handleStartRealtime()
                clearInterval(intervalPlane)
                console.log('you is: ',mapMarkfindPlaneRealtime, isRealtimePlane)
            }
            

        }, [mapMarkfindPlaneRealtime])

        useEffect(() => {
           
            const fetchData = async () => {
                fetch(`https://opensky-network.org/api/states/all`,{
                    method: 'GET',
                    credentials: 'same-origin',
                    redirect: 'follow',
                    agent: null,
                    headers: {
                        "Content-Type": "text/plain",
                        'Authorization': 'Basic ' + btoa('nds.tphcm:Hippo956592'),
                    },
                    })
                .then((response) => response.json())
                .then((datas) => {
                    const temp = buildPlaneData(datas)
                    const info = proccessPlaneData(datas)
                    // console.log(1)
                    infoPlanes(temp.length, new Date(), info)

                    setDataPlane(temp)
                    setLoading(false)
                    
                })
               
            }
               
            fetchData()
            
        }, [])

        useEffect(() => {

            clearInterval(intervalPlane)
           
            if(isAllPlanes === 0) { 
                setShowDataPlaneToMap(dataPlane)
            } else if(isAllPlanes === 1) {
                setShowDataPlaneToMap(dataPlaneOfMarks)
            } else if(isAllPlanes === 2) {
                setShowDataPlaneToMap(listMarkPlane)
            } else {
                clearInterval(intervalPlane)
                setShowDataPlaneToMap([])
                
            }

            setLoading(true)

            setTimeout(() => {
                setLoading(false)
            }, 800);


        }, [isAllPlanes])

        return (

            <div className="map-cv-main">
                {loading ? <div className="loading-map-plane">
                    <LoadingMini />
                </div> : null}
                <LeafletMap
                className="markercluster-map"
                center={mapCenter}
                zoom={mapZoom}
                maxZoom={18}
                >
            
                
                {typeMapChoose(typeOfMap)}
                    
                {/* {showDataOnMap(dataPlane)} */}

                {/* show three types display planes here */}
                {/* {console.log(dataPlaneOfMarks)} */}
            
                {showDataPlaneToMap.map((plane, index) =>
                    <Marker
                    icon = {processPlaneIcon(plane.true_track)}
                    key={index}
                    position={{ lat: plane.location.lat, lng: plane.location.lng}}
                    >
                    <Popup>
                    <div className="info-popup-plane">
                        <h4 >Flight Infomation</h4>
                        <div className="deliver-popup"></div>
                        <div className="icao">iCAO24:  {plane.icao24}</div>
                        <div className="signCall">CallSign:   {plane.callSign}</div>
                        <div className="originCountry">Country-Original:   {plane.origin_country}</div>
                        <div className="source">Source-Signal:   {plane.position_source===0 ? 'ADS-B' : ( plane.position_source===1 ? 'ASTERIX' : 'MLAT' )}</div>
                        <div className="deliver-popup"></div>
                        <div className="locationPlane">
                        Location Current:   {plane.location.lat},  {plane.location.lng}
                    </div>
                        <div className="connectionLast">Last Contact:   <Moment fromNow>{plane.last_contact}</Moment></div>
                        <div className="baroPlane">
                        Baro Current:   {plane.baro_altitude}m - {(plane.baro_altitude * 3.28).toFixed(2)}ft
                    </div>
                    <div className="">
                        Current Speed:   {plane.velocity}m/s - {(plane.velocity * 3.6).toFixed(2)}km/h
                    </div>
                    <div className="currentPlane">Current Dir:   {plane.true_track} (degree)</div>
                    <div className="deliver-popup"></div>    
                </div>
                    </Popup>
                    </Marker>
                )}
                {circleMarks(marks)}
                {showMarksOnMap(marks)} 
                </LeafletMap>
                   
            </div>
        )

    

   
}
