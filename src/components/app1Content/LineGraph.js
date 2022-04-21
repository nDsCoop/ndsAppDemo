import React, { useState } from 'react'
import { Line } from 'react-chartjs-2'
import { useEffect } from 'react';
const numeral = require('numeral');

const options = {
    legend: {
        display: false,
    },
    elements: {
        point: {
            radius: 0,
        }
    },
    maintainAspectRatio: false,
    tooltips: {
        mode: "index",
        intersect: false,
        callbacks: {
            label: function (tooltipItem, data) {
                return numeral(tooltipItem.value).format("+0.0");
            }
        }
    },
    scales: {
        xAxes: [
            {
                type: "time",
                time: {
                    format: "MM/DD/YY",
                    tooltipFormat: "ll"
                }
            }
        ],
        yAxes: [
            {
                gridLines: {
                    display: false,
                },
                ticks: {
                    beginAtZero: true,
                    callback: function (value, index, values) {
                        return numeral(value).format("0a");
                    }
                }
            }
        ]
    }
}
export default function LineGraph({casesType}) {
    const [data, setData] = useState();

    useEffect(() => {
        const fetchData = async () => {
            fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
            .then((response) => response.json())
            .then((data) => {
                const chartData = buildCharData(data, casesType);
                setData(chartData);
                console.log(chartData)
            })
        }
        fetchData();
        
    }, [casesType])

    const buildCharData = (data, casesType='cases') => {
        let chartData = [];
        let lastDataPoint;
        for ( let date in data.cases) {
            if(lastDataPoint) {
                const newDataPoint = {
                    x: date,
                    y: data[casesType][date]-lastDataPoint
                }
                // console.log("here: ", data[casesType][date])
                chartData.push(newDataPoint);
            }
            lastDataPoint = data[casesType][date]
        };
       
        return chartData;
    }
  
    return (
        <>
            {data?.length > 0 && (
                <Line
                width={100}
                height={50}
                
                options = {options} data={{
                    datasets: [{
                        fill: false,
                        backgroundColor: 'rgb(255, 99, 132)',
                        borderColor: 'rgba(255, 99, 132, 0.5)',
                        data: data,
                        borderWidth: 1.5
                    }]
                }} />
            )}
           
        </>
    )
}
