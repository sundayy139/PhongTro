import React from 'react'
import { Doughnut } from 'react-chartjs-2';

const DoughnutChart = ({ data, text }) => {

    return (
        <Doughnut
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
                    animation: {
                        animateRotate: true,
                        animateScale: true,
                        duration: 2000,
                    },
                    tooltip: {
                        callbacks: {
                            label: function (tooltipItem) {
                                const value = tooltipItem.formattedValue;
                                const total = tooltipItem.dataset.data.reduce((a, b) => a + b, 0);
                                const percentage = Math.round(value / total * 100);
                                return `${tooltipItem.label}: ${value} (${percentage}%)`;
                            },
                            footer: (tooltipItems) => {
                                const total = tooltipItems[0].dataset.data.reduce((a, b) => a + b, 0);
                                return `Total: ${total}`;
                            },
                        },
                    },
                },
            }
            }
        />
    )
}

export default DoughnutChart