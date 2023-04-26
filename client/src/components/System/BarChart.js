import React from 'react'
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const BarChart = ({ data, text }) => {
    return (
        <Bar
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
                },
                spanGaps: true,
                interaction: {
                    intersect: false,
                    mode: 'index',
                },
            }}
        />
    )
}

export default BarChart