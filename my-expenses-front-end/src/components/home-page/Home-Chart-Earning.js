import React from 'react';
import {
    Chart as Chartjs,
    ArcElement,
    Tooltip,
    Legend
} from 'chart.js';

import {Doughnut} from 'react-chartjs-2'


Chartjs.register(ArcElement,Tooltip,Legend)

const HomeChartEarning = ({earnChartData}) => {
    let chartData = []
    earnChartData.forEach(data=>{
      chartData.push(data.data)
    })
    const data = {
        labels: false,
        datasets: [{
            labels: 'Poll',
            data: chartData,
            backgroundColor: ["#5656ff","#56b1ff","#56ff92","#ffb714"],
            borderColor: ["#5656ff","#56b1ff","#56ff92","#ffb714"]
        }]
    }
    const options= {
        plugins: {
          legend: {
            display:false
          },
          tooltip: {
            enabled: false
          },
        },
        cutout: 100,
        tooltips: false,
      }
    return (
        <div>
            <Doughnut data= {data} options={options}></Doughnut>
        </div>
    );
}

export default HomeChartEarning;
