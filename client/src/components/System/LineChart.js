import React from 'react';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

// const footer = (tooltipItems) => {
//     let sum = 0;

//     tooltipItems.forEach(function (tooltipItem) {
//         sum += tooltipItem.parsed.y;
//     });
//     return 'Tổng: ' + sum;
// };

const LineChart = ({ data, text }) => {
    return (
        <Line
            data={data}
            options={{
                responsive: true,
                plugins: {
                    legend: {
                        position: 'right',
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