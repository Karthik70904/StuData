import React from 'react';
import { GraduationCap, Moon, Sun } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  studentCount: number;
}

const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, studentCount }) => {
  const { isDark, toggleTheme } = useTheme();

  const tabs = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'add', label: 'Add Student' },
    { id: 'students', label: 'Students' },
    { id: 'analytics', label: 'Analytics' },
    { id: 'export', label: 'Export' },
  ];

  return (
    <header className="bg-white dark:bg-gray-900 shadow-lg border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <GraduationCap className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Studata</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {studentCount} students enrolled
              </p>
            </div>
          </div>
          
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label="Toggle theme"
          >
            {isDark ? (
              <Sun className="h-5 w-5 text-yellow-500" />
            ) : (
              <Moon className="h-5 w-5 text-gray-600" />
            )}
          </button>
        </div>
        
        <nav className="flex space-x-1 overflow-x-auto pb-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;