import React from 'react';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';


const LineChart = ({ data, text }) => {
    return (
        <Line
            data={data}
            options={{
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                    },
                    title: {
                        display: true,
                        text: text ? text : '',
                    },
                    labels: {
                        usePointStyle: true,
                    },
                    // tooltip: {
                    //     callbacks: {
                    //         footer: footer,
                    //     }
                    // }
                },
                spanGaps: true,
                interaction: {
                    intersect: false,
                    mode: 'index',
                },
            }}
        />
    );
};

export default LineChart;