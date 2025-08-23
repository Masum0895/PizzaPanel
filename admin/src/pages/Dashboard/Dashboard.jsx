import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import './Dashboard.css';

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = ({ url }) => {
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await axios.get(`${url}/api/food/stats`);
                if (response.data.success) {
                    const stats = response.data.data;
                    const data = {
                        labels: stats.map(item => item._id),
                        datasets: [
                            {
                                label: 'Foods by Category',
                                data: stats.map(item => item.count),
                                backgroundColor: [
                                    'rgba(255, 99, 132, 0.7)',
                                    'rgba(54, 162, 235, 0.7)',
                                    'rgba(255, 206, 86, 0.7)',
                                    'rgba(75, 192, 192, 0.7)',
                                    'rgba(153, 102, 255, 0.7)',
                                    'rgba(255, 159, 64, 0.7)',
                                ],
                                borderColor: [
                                    'rgba(255, 99, 132, 1)',
                                    'rgba(54, 162, 235, 1)',
                                    'rgba(255, 206, 86, 1)',
                                    'rgba(75, 192, 192, 1)',
                                    'rgba(153, 102, 255, 1)',
                                    'rgba(255, 159, 64, 1)',
                                ],
                                borderWidth: 1,
                            },
                        ],
                    };
                    setChartData(data);
                }
            } catch (error) {
                console.error("Error fetching stats:", error);
            }
        };

        fetchStats();
    }, [url]);

    return (
        <div className="dashboard">
            <h2>Dashboard</h2>
            <div className="chart-container">
                {chartData ? <Doughnut data={chartData} /> : <p>Loading chart...</p>}
            </div>
        </div>
    );
};

export default Dashboard;
