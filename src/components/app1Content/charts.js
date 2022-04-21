import React, { useState } from 'react'
import { Bar } from 'react-chartjs-2'
import { useEffect } from 'react';

import _ from 'lodash';

const numeral = require('numeral');

const options = {
    legend: {
        display: false,
        labels: {
            boxWidth: 12,
          }
    },
    elements: {
        point: {
            radius: 0,
        }
    },
    responsive: true,
    tooltips: {
        mode: "index",
        intersect: false,
        callbacks: {
            label: function (tooltipItem, data) {
                return data.datasets[tooltipItem.datasetIndex].label+ ': '+ numeral(tooltipItem.value).format("0.0");
            },
 
            
        }
       
    },
    scales: {
        xAxes: [
            {
                type: "time",
                time: {
                    format: "YY-MM-DD HH:ss",
                    tooltipFormat: "ll"
                }
            }
        ],
        yAxes: [
            {
                id: 'A',
                type: 'linear',
                position: 'left',
                gridLines: {
                    display: true,
                },
                label: 'Temperture',
                ticks: {
                    beginAtZero: true,
                    callback: function (value, index, values) {
                        return numeral(value).format("0a") + "°C";
                    }
                },
          
            },
            {
                id: 'B',
                type: 'linear',
                position: 'right',
                gridLines: {
                    display: false,
                },
                label: 'Prescript',
                ticks: {
                    beginAtZero: true,
                    callback: function (value, index, values) {
                        return numeral(value).format("0a")  + "%"
                    }
                },

            },
            {
                id: 'C',
                type: 'linear',
                position: 'left',
                gridLines: {
                    display: false,
                },
                label: 'Apmosfere',
                ticks: {
                    beginAtZero: true,
                    callback: function (value, index, values) {
                        return numeral(value).format("0.0")  + " Pa";
                    }
                },

            },
            {
                id: 'H',
                type: 'linear',
                position: 'left',
                display: false,
                gridLines: {
                    display: false,
                },
                label: 'Apmosfere',
                ticks: {
                    display: false,
                    beginAtZero: true,
                    callback: function (value, index, values) {
                        return numeral(value).format("0.0")  + " mm";
                    }
                },

            },


        ]
    }
}


export default function Charts({mark}) {
    const [data, setData] = useState(
        [{
            x: "10/1/2020",
            y: 9
        }, {
            x: "11/1/2020",
            y: 5
        },{
            x: "12/1/2020",
            y: 7
        },{
            x: "13/1/2020",
            y: 9
        },{
            x: "15/1/2020",
            y: 12
        }]
    );
    const [data1, setData1] = useState(
        [{
            x: "10/1/2020",
            y: 2
        }, {
            x: "11/1/2020",
            y: 2
        },{
            x: "12/1/2020",
            y: 19
        },{
            x: "13/1/2020",
            y: 16
        },{
            x: "15/1/2020",
            y: 12
        }]
    );
    const [data2, setData2] = useState(
        [{
            x: "10/1/2020",
            y: 5
        }, {
            x: "11/1/2020",
            y: 2
        },{
            x: "12/1/2020",
            y: 12
        },{
            x: "13/1/2020",
            y: 34
        },{
            x: "15/1/2020",
            y: 23
        }]
    );
    const [data3, setData3] = useState(
        [{
            x: "10/1/2020",
            y: 2
        }, {
            x: "11/1/2020",
            y: 2
        },{
            x: "12/1/2020",
            y: 19
        },{
            x: "13/1/2020",
            y: 16
        },{
            x: "15/1/2020",
            y: 12
        },]
    );
    const [data4, setData4] = useState(
        [{
            x: "10/1/2020",
            y: 2
        }, {
            x: "11/1/2020",
            y: 2
        },{
            x: "12/1/2020",
            y: 19
        },{
            x: "13/1/2020",
            y: 16
        },{
            x: "15/1/2020",
            y: 12
        }]
    );
    const [data5, setData5] = useState(
        [{
            x: "10/1/2020",
            y: 2
        }, {
            x: "11/1/2020",
            y: 2
        },{
            x: "12/1/2020",
            y: 19
        },{
            x: "13/1/2020",
            y: 16
        },{
            x: "15/1/2020",
            y: 12
        }]
    );


    const  buildCharData = (data, casesType='temp_c') => {
        let chartData = [];
        _.each(data.hour, (data) => {
            const newDataPoint = {
                x: data.time,
                y: data[casesType]
            }
            chartData.push(newDataPoint);
        })
        // console.log("Here data chars: ", casesType, chartData)
        return chartData;


    }

    useEffect(() => {

        let temp =  buildCharData(mark, 'temp_c')
        setData(temp)
        let humid =  buildCharData(mark, 'humidity')
        setData1(humid)
        let pressure =  buildCharData(mark, 'pressure_mb')
        setData3(pressure)
        let cloud =  buildCharData(mark, 'cloud')
        setData2(cloud)
        let dewpoint =  buildCharData(mark, 'dewpoint_c')
        setData4(dewpoint)
        let windspeed =  buildCharData(mark, 'wind_kph')
        setData5(windspeed)
        
        
    }, [mark])

    // const buildCharData = (data, casesType='temp_c') => {
       
    //     let chartData = [];
    //     let lastDataPoint;
    //     for ( let date in data.cases) {
    //         if(lastDataPoint) {
    //             const newDataPoint = {
    //                 x: date,
    //                 y: data[casesType][date]-lastDataPoint
    //             }
    //             chartData.push(newDataPoint);
    //         }
    //         lastDataPoint = data[casesType][date]
    //     };
    //     // console.log("here: ", chartData)
    //     return chartData;
    // }
  
    return (
        <div className="chart-mark">
            {/* {console.log(mark)} */}
            {data && (
                <Bar
                width={100}
                height={50}
                options = {options} 
                
                data={{
                    datasets: [{
                        type:'line',
                        label: 'Temperture °C',
                        yAxisID: 'A',
                        fill: false,
                        backgroundColor: 'rgb(255, 99, 132)',
                        borderColor: 'rgba(255, 99, 132, 0.5)',
                        pointStrokeColor: "#fff",
                        pointHighlightFill: "#fff",
                        pointHoverBorderColor: '#fff',
                        pointHighlightStroke: "rgba(220,220,220,1)",
                        data: data
                    },
                    {
                        type: 'line',
                        label: 'Humidity %',
                        yAxisID: 'B',
                        fill: false,
                        backgroundColor: 'rgba(0, 140, 29, .5)',
                        borderColor: 'rgba(0, 140, 29, .5)',
                        pointStrokeColor: "#fff",
                        pointHighlightFill: "#fff",
                        pointHoverBorderColor: '#fff',
                        pointHighlightStroke: "rgba(220,220,220,1)",
                        data: data1
                    },
                    {
                        type: 'line',
                        label: 'Pressure Pa',
                        yAxisID: 'C',
                        fill: false,
                        backgroundColor: 'rgba(0, 140, 255, .5)',
                        borderColor: ' rgba(0, 140, 255, .5)',
                        pointStrokeColor: "#fff",
                        pointHighlightFill: "#fff",
                        pointHoverBorderColor: '#fff',
                        pointHighlightStroke: "rgba(220,220,220,1)",
                        data: data3
                    },
                    {
                        type: 'bar',
                        label:'Cloud',
                        yAxisID: 'H',
                        fillColor: "rgba(220,20,220,0.2)",
                        strokeColor: "rgba(220,20,220,1)",
                        pointColor: "rgba(220,20,220,1)",
                        pointStrokeColor: "#fff",
                        pointHoverBorderColor: '#fff',
                        pointHighlightStroke: "rgba(220,220,220,1)",
                        data: data2
                    },
                    {
                        type: 'line',
                        label: 'Dewpoint',
                        yAxisID: 'H',
                        fill: false,
                        backgroundColor: 'rgba(0, 140, 255, .0)',
                        borderColor: ' rgba(0, 140, 255, 0)',
                        pointStrokeColor: "#fff",
                        pointHighlightFill: "#fff",
                        pointHoverBorderColor: '#fff',
                        pointHighlightStroke: "rgba(220,220,220,1)",
                        data: data4
                    },
                    {
                        type: 'line',
                        label: 'WindSpeed',
                        yAxisID: 'H',
                        fill: false,
                        backgroundColor: 'rgba(0, 140, 255, .0)',
                        borderColor: ' rgba(0, 140, 255, 0)',
                        pointStrokeColor: "#fff",
                        pointHighlightFill: "#fff",
                        pointHoverBorderColor: '#fff',
                        pointHighlightStroke: "rgba(220,220,220,1)",
                        data: data5
                    },
                    ]
                }} 
                />
            )}

            <h4>{mark.nameMark || 'noValue'} | {mark.name}-{mark.country}</h4>
           
        </div>
    )
}
