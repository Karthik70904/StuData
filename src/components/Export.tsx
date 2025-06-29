import React from 'react';
import { Download, FileText, Database } from 'lucide-react';
import { Student } from '../types/Student';
import { exportToJSON, exportToCSV } from '../utils/export';

interface ExportProps {
  students: Student[];
  onShowToast: (message: string, type: 'success' | 'error' | 'info' | 'warning') => void;
}

const Export: React.FC<ExportProps> = ({ students, onShowToast }) => {
  const handleJSONExport = () => {
    if (students.length === 0) {
      onShowToast('No students to export', 'warning');
      return;
    }
    
    try {
      exportToJSON(students);
      onShowToast(`Successfully exported ${students.length} students to JSON`, 'success');
    } catch (error) {
      onShowToast('Failed to export data', 'error');
    }
  };

  const handleCSVExport = () => {
    if (students.length === 0) {
      onShowToast('No students to export', 'warning');
      return;
    }
    
    try {
      exportToCSV(students);
      onShowToast(`Successfully exported ${students.length} students to CSV`, 'success');
    } catch (error) {
      onShowToast('Failed to export data', 'error');
    }
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const importedData = JSON.parse(content);
        
        if (Array.isArray(importedData) && importedData.length > 0) {
          // Validate the structure
          const firstItem = importedData[0];
          if (firstItem && typeof firstItem === 'object' && 'name' in firstItem) {
            const existingData = localStorage.getItem('studata_students');
            const currentStudents = existingData ? JSON.parse(existingData) : [];
            
            // Merge and update storage
            const mergedData = [...currentStudents, ...importedData.map(item => ({
              ...item,
              id: item.id || Date.now().toString() + Math.random().toString(36).substr(2, 9),
              createdAt: item.createdAt || new Date().toISOString(),
              updatedAt: item.updatedAt || new Date().toISOString(),
            }))];
            
            localStorage.setItem('studata_students', JSON.stringify(mergedData));
            onShowToast(`Successfully imported ${importedData.length} students`, 'success');
            
            // Reload the page to refresh the data
            window.location.reload();
          } else {
            onShowToast('Invalid file format', 'error');
          }
        } else {
          onShowToast('No valid data found in file', 'error');
        }
      } catch (error) {
        onShowToast('Failed to import data. Please check file format.', 'error');
      }
    };
    
    reader.readAsText(file);
    event.target.value = ''; // Reset input
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Export & Import Data</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Export Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Export Options</h3>
          
          <div className="space-y-3">
            <button
              onClick={handleJSONExport}
              className="w-full flex items-center justify-center gap-3 bg-blue-600 text-white px-6 py-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              <Database className="h-5 w-5" />
              Export as JSON
              <span className="text-blue-200">({students.length} records)</span>
            </button>
            
            <button
              onClick={handleCSVExport}
              className="w-full flex items-center justify-center gap-3 bg-green-600 text-white px-6 py-4 rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              <FileText className="h-5 w-5" />
              Export as CSV
              <span className="text-green-200">({students.length} records)</span>
            </button>
          </div>
          
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">Export Info</h4>
            <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
              <li>• JSON format preserves all data structure</li>
              <li>• CSV format is compatible with Excel</li>
              <li>• Files are downloaded to your device</li>
              <li>• No data is sent to external servers</li>
            </ul>
          </div>
        </div>

        {/* Import Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Import Options</h3>
          
          <div className="space-y-3">
            <label className="block">
              <div className="w-full flex items-center justify-center gap-3 bg-indigo-600 text-white px-6 py-4 rounded-lg hover:bg-indigo-700 transition-colors font-medium cursor-pointer">
                <Download className="h-5 w-5" />
                Import from JSON
              </div>
              <input
                type="file"
                accept=".json"
                onChange={handleImport}
                className="hidden"
              />
            </label>
          </div>
          
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
            <h4 className="font-medium text-yellow-900 dark:text-yellow-100 mb-2">Import Info</h4>
            <ul className="text-sm text-yellow-800 dark:text-yellow-200 space-y-1">
              <li>• Only JSON format is supported for import</li>
              <li>• Data will be merged with existing records</li>
              <li>• Duplicate records may be created</li>
              <li>• Page will refresh after successful import</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Data Summary */}
      <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Current Data Summary</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{students.length}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Students</p>
          </div>
          
          <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">
              {[...new Set(students.map(s => s.subject))].length}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Subjects</p>
          </div>
          
          <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              ₹{students.reduce((sum, s) => sum + s.fee, 0).toLocaleString()}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Fees</p>
          </div>
          
          <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
              {Math.round(localStorage.getItem('studata_students')?.length || 0 / 1024)}KB
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Storage Used</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Export;