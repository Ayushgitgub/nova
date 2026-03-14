import React, { useEffect, useState } from 'react';
import { supabase } from '../config/supabaseClient';

const StudentDashboard = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
        };
        fetchUser();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 flex p-8">
            <div className="w-64 bg-white rounded-lg shadow-md p-6 mr-8 h-fit">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Student Portal</h2>
                <div className="text-sm text-gray-500 mb-4">
                    <p>Welcome back,</p>
                    <p className="font-semibold text-gray-800">{user?.user_metadata?.name || 'Student'}</p>
                </div>
                <nav className="space-y-2">
                    <a href="/student-dashboard" className="block text-indigo-600 font-medium">My Dashboard</a>
                    <a href="/student-details" className="block text-gray-600 hover:text-indigo-600">Performance Details</a>
                </nav>
            </div>

            <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Overview</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-lg shadow border-t-4 border-blue-500">
                        <h3 className="text-lg font-semibold text-gray-700">Recent Marks</h3>
                        <p className="text-3xl font-bold text-indigo-600 mt-2">85%</p>
                        <p className="text-sm text-gray-500">Average across 4 subjects</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow border-t-4 border-green-500">
                        <h3 className="text-lg font-semibold text-gray-700">Attendance</h3>
                        <p className="text-3xl font-bold text-green-600 mt-2">92%</p>
                        <p className="text-sm text-gray-500">Present for 45 out of 49 days</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentDashboard;
