import React, { useEffect, useState } from 'react';
import { Bar, Pie, Line } from 'react-chartjs-2';
import 'chart.js/auto';
import axios from 'axios';
import { API_BASE } from '../api';

const Analytics = () => {
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        // Mock data fetch
        const loadData = async () => {
            setChartData({
                bar: {
                    labels: ['Mathematics', 'Science', 'History', 'English'],
                    datasets: [{
                        label: 'Average Scores',
                        data: [75, 82, 65, 88],
                        backgroundColor: 'rgba(54, 162, 235, 0.6)'
                    }]
                },
                pie: {
                    labels: ['Present', 'Absent', 'Late'],
                    datasets: [{
                        data: [80, 15, 5],
                        backgroundColor: ['#4ade80', '#f87171', '#fbbf24']
                    }]
                },
                line: {
                    labels: ['Term 1', 'Term 2', 'Term 3', 'Term 4'],
                    datasets: [{
                        label: 'Overall Performance Trend',
                        data: [68, 72, 75, 81],
                        borderColor: '#8b5cf6',
                        tension: 0.4
                    }]
                }
            });
        };
        loadData();
    }, []);

    if (!chartData) return <div className="p-8">Loading Analytics...</div>;

    return (
        <div className="flex h-screen bg-gray-50">
            <div className="flex-1 p-8 overflow-y-auto">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Performance Analytics</h1>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Bar Chart */}
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h3 className="text-lg font-semibold mb-4 text-center">Subject Average Scores</h3>
                        <Bar data={chartData.bar} />
                    </div>

                    {/* Line Chart */}
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h3 className="text-lg font-semibold mb-4 text-center">Performance Trends</h3>
                        <Line data={chartData.line} />
                    </div>

                    {/* Pie Chart */}
                    <div className="bg-white p-6 rounded-lg shadow lg:col-span-2 flex flex-col items-center">
                        <h3 className="text-lg font-semibold mb-4 text-center">Attendance Distribution</h3>
                        <div className="w-1/2">
                            <Pie data={chartData.pie} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Analytics;
