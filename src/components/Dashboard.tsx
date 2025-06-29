import React from 'react';
import { Users, GraduationCap, DollarSign, Calendar, UserCheck } from 'lucide-react';
import { Student } from '../types/Student';
import { User } from '../types/Auth';

interface DashboardProps {
  students: Student[];
  currentUser?: User | null;
}

const Dashboard: React.FC<DashboardProps> = ({ students, currentUser }) => {
  const totalStudents = students.length;
  const maleStudents = students.filter(s => s.gender === 'Male').length;
  const femaleStudents = students.filter(s => s.gender === 'Female').length;
  const classes = [...new Set(students.map(s => s.class))].length;
  
  const recentStudents = students
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  const stats = [
    {
      title: 'Total Students',
      value: totalStudents,
      icon: Users,
      color: 'bg-blue-500',
      textColor: 'text-blue-600 dark:text-blue-400',
    },
    {
      title: 'Male Students',
      value: maleStudents,
      icon: GraduationCap,
      color: 'bg-green-500',
      textColor: 'text-green-600 dark:text-green-400',
    },
    {
      title: 'Female Students',
      value: femaleStudents,
      icon: GraduationCap,
      color: 'bg-pink-500',
      textColor: 'text-pink-600 dark:text-pink-400',
    },
    {
      title: 'Total Classes',
      value: classes,
      icon: DollarSign,
      color: 'bg-yellow-500',
      textColor: 'text-yellow-600 dark:text-yellow-400',
    },
  ];

  return (
    <div className="space-y-6">
      {/* User Welcome */}
      {currentUser && (
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <UserCheck className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Welcome back, {currentUser.name}!</h2>
              <p className="text-blue-100">
                You have {totalStudents} student{totalStudents !== 1 ? 's' : ''} in your database
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {stat.title}
                </p>
                <p className={`text-2xl font-bold ${stat.textColor}`}>
                  {stat.value}
                </p>
              </div>
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Students */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <div className="flex items-center gap-3 mb-6">
          <Calendar className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Recent Additions</h2>
          {currentUser && (
            <span className="text-sm text-gray-500 dark:text-gray-400">
              (Your students only)
            </span>
          )}
        </div>
        
        {recentStudents.length > 0 ? (
          <div className="space-y-4">
            {recentStudents.map((student) => (
              <div
                key={student.id}
                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm ${
                    student.gender === 'Male' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400' : 
                    student.gender === 'Female' ? 'bg-pink-100 text-pink-600 dark:bg-pink-900 dark:text-pink-400' : 
                    'bg-gray-100 text-gray-600 dark:bg-gray-600 dark:text-gray-400'
                  }`}>
                    {student.id}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">{student.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Class: {student.class}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900 dark:text-white">SI.NO: {student.id}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {new Date(student.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400">No students added yet</p>
            <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
              Start by adding your first student!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;