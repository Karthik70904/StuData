import React from 'react';
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';
import { Student } from '../types/Student';

ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface AnalyticsProps {
  students: Student[];
}

const Analytics: React.FC<AnalyticsProps> = ({ students }) => {
  // Gender distribution
  const genderData = {
    labels: ['Male', 'Female', 'Other'],
    datasets: [
      {
        data: [
          students.filter(s => s.gender === 'Male').length,
          students.filter(s => s.gender === 'Female').length,
          students.filter(s => s.gender === 'Other').length,
        ],
        backgroundColor: ['#3B82F6', '#EC4899', '#8B5CF6'],
        borderWidth: 0,
      },
    ],
  };

  // Class distribution
  const classes = [...new Set(students.map(s => s.class))];
  const classData = {
    labels: classes,
    datasets: [
      {
        label: 'Students',
        data: classes.map(className => 
          students.filter(s => s.class === className).length
        ),
        backgroundColor: '#10B981',
        borderRadius: 8,
      },
    ],
  };

  // Caste distribution
  const casteData = {
    labels: ['SC', 'ST', 'BC', 'OC'],
    datasets: [
      {
        data: [
          students.filter(s => s.caste === 'SC').length,
          students.filter(s => s.caste === 'ST').length,
          students.filter(s => s.caste === 'BC').length,
          students.filter(s => s.caste === 'OC').length,
        ],
        backgroundColor: ['#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4'],
        borderWidth: 0,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          padding: 20,
          usePointStyle: true,
        },
      },
    },
  };

  const barOptions = {
    ...chartOptions,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Total Students</h3>
          <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{students.length}</p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Total Classes</h3>
          <p className="text-3xl font-bold text-green-600 dark:text-green-400">{classes.length}</p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Habitations</h3>
          <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">
            {[...new Set(students.map(s => s.habitation))].length}
          </p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gender Distribution */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Gender Distribution</h3>
          <div className="h-64">
            <Doughnut data={genderData} options={chartOptions} />
          </div>
        </div>

        {/* Caste Distribution */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Caste Distribution</h3>
          <div className="h-64">
            <Doughnut data={casteData} options={chartOptions} />
          </div>
        </div>

        {/* Class Distribution */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 lg:col-span-2">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Students by Class</h3>
          <div className="h-64">
            <Bar data={classData} options={barOptions} />
          </div>
        </div>
      </div>

      {/* Detailed Statistics */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Detailed Statistics</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Class Breakdown</h4>
            <div className="space-y-2">
              {classes.map(className => {
                const count = students.filter(s => s.class === className).length;
                const percentage = students.length > 0 ? (count / students.length * 100).toFixed(1) : 0;
                return (
                  <div key={className} className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">{className}</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {count} ({percentage}%)
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Caste Breakdown</h4>
            <div className="space-y-2">
              {['SC', 'ST', 'BC', 'OC'].map(caste => {
                const count = students.filter(s => s.caste === caste).length;
                const percentage = students.length > 0 ? (count / students.length * 100).toFixed(1) : 0;
                return (
                  <div key={caste} className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">{caste}</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {count} ({percentage}%)
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;