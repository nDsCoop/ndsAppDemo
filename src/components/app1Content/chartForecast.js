import React, { useState } from 'react'
import { Line } from 'react-chartjs-2'
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
                    tooltipFormat: "ll",
                    stepSize: 1
                },
                
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


export default function ChartForecast({nameMark, mark}) {
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
    // const [data4, setData4] = useState(
    //     [{
    //         x: "10/1/2020",
    //         y: 2
    //     }, {
    //         x: "11/1/2020",
    //         y: 2
    //     },{
    //         x: "12/1/2020",
    //         y: 19
    //     },{
    //         x: "13/1/2020",
    //         y: 16
    //     },{
    //         x: "15/1/2020",
    //         y: 12
    //     },]
    // );

    const  buildCharData = (data, casesType='temp_c') => {
        let chartData = [];
        // {console.log(mark)}
        _.each(data, (data) => {
            const newDataPoint = {
                x: data.time,
                y: data.data.instant.details[casesType]
            }
            chartData.push(newDataPoint);
        })
        // console.log("Here data chars: ", casesType, chartData)
        return chartData;


    }

    useEffect(() => {

        let temp =  buildCharData(mark, 'air_temperature')
        // {console.log("1", mark)}
        setData(temp)
        let humid =  buildCharData(mark, 'relative_humidity')
        setData1(humid)
        let pressure =  buildCharData(mark, 'air_pressure_at_sea_level')
        setData3(pressure)
        let cloud =  buildCharData(mark, 'cloud_area_fraction')
        setData2(cloud)

        // let dewpoint =  buildCharData(mark, 'dewpoint_c')
        // setData4(dewpoint)

        // let windspeed =  buildCharData(mark, 'wind_speed')
        // setData4(windspeed)
        
        
    }, [mark])

  
  
    return (
        <div className="chart-markforecast">
          
            {data && (
                <Line
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
                        pointHighlightFill: "#fff",
                        pointHoverBorderColor: '#fff',
                        pointHighlightStroke: "rgba(220,220,220,1)",
                        data: data2
                    }]
                }} 
                />
            )}

            <h4>{nameMark}</h4>
           
        </div>
    )
}
