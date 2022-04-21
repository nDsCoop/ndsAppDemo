import React from 'react'
import { Map as LeafletMap, TileLayer, Circle, Popup, Marker} from 'react-leaflet';
import L from 'leaflet';

const numeral = require('numeral');



export default function MapCv({marks, center, zoom, countries, casesType }) {

    const casesTypeColors = {
        cases: {
            hex: "#fb4443",
            multiplier: 600,
        },
        recovered: {
            hex: "#7dd71d",
            multiplier: 600,
        },
        deaths: {
            hex: "#CC1034",
            multiplier: 800,
        }
    }
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
   



    const showDataOnMap = (data, casesType = "cases") => 
        data.map((country) => (
           
            <Circle
            center={[country.countryInfo.lat, country.countryInfo.long]}
            color={casesTypeColors[casesType].hex}
            fillOpacity={0.26}
            fillColor={casesTypeColors[casesType].hex}
            radius={Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier}>
                <Popup>
                    <div className="info-popup-map">
                        <div className="info-flag"
                            style={{backgroundImage: `url(${country.countryInfo.flag})`}}
                        />
                        <div className="info-name-country">{country.country}</div>
                        <div className="info-confirmed">
                            Cases: {numeral(country.cases).format("0.0")}
                        </div>
                        <div className="info-recovered">
                            Recovered: {numeral(country.recovered).format("0.0")}
                        </div>
                        <div className="info-deaths">
                            Deaths: {numeral(country.deaths).format("0.0")}
                        </div>
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
            {showDataOnMap(countries, casesType)}
            {showMarksOnMap(marks)}
            </LeafletMap>
            
        </div>
    )
}
