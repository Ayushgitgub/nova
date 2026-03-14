import React, { useEffect, useState } from 'react';
import { supabase } from '../config/supabaseClient';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const FacultyDashboard = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
        };
        fetchUser();
    }, []);

    const chartData = {
        labels: ['Class 10A', 'Class 10B', 'Class 11A'],
        datasets: [{
            label: 'Class Average Performance',
            data: [78, 65, 82],
            backgroundColor: '#8b5cf6'
        }]
    };

    return (
        <div className="min-h-screen bg-gray-50 flex">
            <div className="w-64 bg-indigo-900 text-white p-6">
                <h2 className="text-2xl font-bold mb-8">Faculty Portal</h2>
                <div className="text-sm text-indigo-200 mb-8">
                    <p>Welcome,</p>
                    <p className="font-semibold text-white">{user?.user_metadata?.name || 'Professor'}</p>
                </div>
                <nav className="space-y-4">
                    <a href="/faculty-dashboard" className="block p-3 bg-indigo-800 rounded">Classes</a>
                    <a href="/analytics" className="block p-3 hover:bg-indigo-800 rounded">Overall Analytics</a>
                </nav>
            </div>

            <div className="flex-1 p-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Faculty Dashboard</h1>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h3 className="text-lg font-semibold mb-4">Class Performance</h3>
                        <Bar data={chartData} />
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow">
                        <h3 className="text-lg font-semibold mb-4">Students Needing Attention</h3>
                        <ul className="space-y-3">
                            <li className="flex justify-between items-center p-3 bg-red-50 text-red-700 rounded border border-red-200">
                                <span>John Doe (10B)</span>
                                <span className="font-bold">45%</span>
                            </li>
                            <li className="flex justify-between items-center p-3 bg-red-50 text-red-700 rounded border border-red-200">
                                <span>Jane Smith (10A)</span>
                                <span className="font-bold">48%</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FacultyDashboard;
