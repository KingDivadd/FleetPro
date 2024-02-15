import React, { useRef, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { Chart as ChartJS, BarElement, Tooltip, Legend, CategoryScale, LinearScale } from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(BarElement, Tooltip, Legend, CategoryScale, LinearScale);

const BarChart = () => {
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
        <Box
        style={{ width: "100%", height: "25rem" }}
        ref={chartRef}
        >
        <Bar
            data={{
            labels: ["July", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan"],
            datasets: [
                {
                data: [65, 59, 70, 81, 56, 55, 40],
                backgroundColor: [
                    "rgba(255, 205, 86, 0.2)",
                    "rgba(255, 159, 64, 0.2)",
                    "rgba(153, 102, 255, 0.2)",
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(201, 203, 207, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(75, 192, 192, 0.2)",
                ],
                borderColor: [
                    "rgb(255, 205, 86)",
                    "rgb(255, 159, 64)",
                    "rgb(153, 102, 255)",
                    "rgb(255, 99, 132)",
                    "rgb(201, 203, 207)",
                    "rgb(54, 162, 235)",
                    "rgb(75, 192, 192)",
                ],
                borderWidth: 1,
                },
            ],
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
    );
};

export default BarChart;
