import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_BASE } from '../api';

const DashboardCard = ({ title, value, color }) => (
  <div className={`p-6 bg-white rounded-lg shadow-md border-l-4 ${color}`}>
    <h3 className="text-gray-500 text-sm font-semibold">{title}</h3>
    <p className="text-2xl font-bold text-gray-800">{value}</p>
  </div>
);

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ students: 0, faculty: 0, aiInsights: "" });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const studentRes = await axios.get(`${API_BASE}/api/students`);
        const facultyRes = await axios.get(`${API_BASE}/api/faculty`);
        const insightsRes = await axios.get(`${API_BASE}/api/analytics/ai-insights`);
        
        setStats({
          students: studentRes.data.data.length,
          faculty: facultyRes.data.data.length,
          aiInsights: insightsRes.data.data.insights
        });
      } catch (error) {
        console.error("Error fetching stats", error);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-indigo-900 text-white p-6">
        <h2 className="text-2xl font-bold mb-8">LMS Analytics</h2>
        <nav className="space-y-4">
          <a href="/admin-dashboard" className="block p-3 bg-indigo-800 rounded">Dashboard</a>
          <a href="/analytics" className="block p-3 hover:bg-indigo-800 rounded">Advanced Analytics</a>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <DashboardCard title="Total Students" value={stats.students} color="border-blue-500" />
            <DashboardCard title="Total Faculty" value={stats.faculty} color="border-green-500" />
            <DashboardCard title="Active Courses" value="12" color="border-purple-500" />
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-xl font-bold mb-4">AI Insights</h2>
            <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded">
              <p className="text-gray-700 italic">" {stats.aiInsights || 'Loading insights...'} "</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
