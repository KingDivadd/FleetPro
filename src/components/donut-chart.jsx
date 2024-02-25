import React, { useRef, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import {Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, } from 'chart.js'

import {Doughnut} from 'react-chartjs-2'

ChartJS.register( ArcElement, Tooltip, Legend, CategoryScale, LinearScale)


const DoughnutChart = ()=>{

    const chartRef = useRef(null);
    const [chartDimensions, setChartDimensions] = useState({ width: "100%", height: "100%" });

    useEffect(() => {
        const resizeHandler = () => {
        const parentWidth = chartRef.current?.parentNode.clientWidth;
        const parentHeight = chartRef.current?.parentNode.clientHeight;
        setChartDimensions({ width: parentWidth, height: chartDimensions.height });
        };

        window.addEventListener("resize", resizeHandler);

        // Call resizeHandler once to set initial size
        resizeHandler();

        return () => {
        window.removeEventListener("resize", resizeHandler);
        };
    }, []);
    
    return (
        <Box sx={{height: '20rem', width: '100%', minWidth: '20rem', overflowX: 'auto', display: 'flex', justifyContent: 'center'}}>

        <Doughnut 
            data = {{
                labels: [
                    'Other Services',
                    'Suspension Inspection and replacement',
                    'Engine Inspection and Service (Oil Change)',
                    'Tire / Wheel Inspection and replacement',
                    'Braking System Inspection and Repair'
                ],
                datasets: [{
                    data: [30, 70, 30, 30, 40],
                    backgroundColor: [
                    '#154EB7',
                    '#0A275C',
                    '#0F3A8A',
                    '#5E90ED',
                    '#1B61E4',
                    ],
                    hoverOffset: 4
                }]
                }}

            options={{
            maintainAspectRatio: false, // Set to false to prevent maintaining aspect ratio
            plugins: {
                legend: {
                display: false, // Hide the legend
                },
            },
            }}
            width={chartDimensions.width}
            height={chartDimensions.height}
        />

        </Box>
    )
}

export default DoughnutChart
