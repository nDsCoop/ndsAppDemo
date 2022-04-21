import React from 'react'
import { Map as LeafletMap, TileLayer, Circle, Popup} from 'react-leaflet';


// const numeral = require('numeral');


<<<<<<< HEAD
=======

>>>>>>> baf3ed63bb22c8d11807d4c127297193e22183a8
export default function MapCv({center, zoom, marks, allMark }) {

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
<<<<<<< HEAD
=======
   


>>>>>>> baf3ed63bb22c8d11807d4c127297193e22183a8

    const showDataOnMap = (marks) => 
        marks.map((mark) => (
           
            <Circle
            center={[mark.lat, mark.lng]}
            color="rgba(255, 41, 0, 0.4)"
            fillOpacity={0.22}
            fillColor="rgba(22, 25, 76, 0.38)"
            radius= {425} >
                <Circle  center={[mark.lat, mark.lng]}
                color="rgba(255, 41, 0, 0.9)"
                fillOpacity={0.26}
                fillColor="rgba(22, 25, 76, 0.48)"
                radius= {205} ></Circle>
                 <Circle  center={[mark.lat, mark.lng]}
                color="rgba(255, 41, 0, 0.9)"
                fillOpacity={0.26}
                fillColor="rgba(22, 25, 76, 0.58)"
                radius= {5} ></Circle>
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
                
            </Circle>
           
        ))

        const showAllMarkOnMap = (marks) => 
        marks.map((mark) => (
           
            <Circle
            center={[mark.lat, mark.lng]} 
            color="rgba(109, 106, 126, 1)"
            fillOpacity={0.22}
            fillColor="rgba(22, 25, 76, 0.38)"
            radius= {425} >
                <Circle  center={[mark.lat, mark.lng]}
                color="rgba(43, 178, 16, 1)"
                fillOpacity={0.26}
                fillColor="rgba(22, 25, 76, 0.48)"
                radius= {205} ></Circle>
                 <Circle  center={[mark.lat, mark.lng]}
                color="rgba(109, 106, 126, 1)"
                fillOpacity={0.26}
                fillColor="rgba(22, 25, 76, 0.58)"
                radius= {5} ></Circle>
                <Popup>
                    <div className="info-popup-map">
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
                
            </Circle>
           
        ))
    
    return (
        <div className="map-cv-main">
            <LeafletMap
            className="markercluster-map"
            center={center}
            zoom={zoom}
            maxZoom={18}
            >
            <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            {showDataOnMap(marks)}
            {showAllMarkOnMap(allMark)}
            </LeafletMap>
            
        </div>
    )
}
