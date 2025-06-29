import React, { useState } from 'react';
import { Search, Edit, Trash2, ChevronDown, ChevronUp, Filter, Shield } from 'lucide-react';
import { Student } from '../types/Student';
import { User } from '../types/Auth';

interface StudentListProps {
  students: Student[];
  onEdit: (student: Student) => void;
  onDelete: (id: string) => void;
  currentUser?: User | null;
}

const StudentList: React.FC<StudentListProps> = ({ students, onEdit, onDelete, currentUser }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterClass, setFilterClass] = useState('');
  const [expandedStudent, setExpandedStudent] = useState<string | null>(null);

  const classes = [...new Set(students.map(s => s.class))];
  
  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.fatherName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.PEN.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = !filterClass || student.class === filterClass;
    return matchesSearch && matchesClass;
  });

  const isNewStudent = (student: Student) => {
    const createdDate = new Date(student.createdAt);
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    return createdDate > oneDayAgo;
  };

  const toggleExpanded = (studentId: string) => {
    setExpandedStudent(expandedStudent === studentId ? null : studentId);
  };

  const handleDelete = (student: Student) => {
    if (window.confirm(`Are you sure you want to delete ${student.name}? This will reorder all serial numbers.`)) {
      onDelete(student.id);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Your Students</h2>
          {currentUser && (
            <div className="flex items-center gap-2 px-3 py-1 bg-blue-100 dark:bg-blue-900/20 rounded-full">
              <Shield className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <span className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                Private Data
              </span>
            </div>
          )}
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {filteredStudents.length} of {students.length} students
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search students..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>
        
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <select
            value={filterClass}
            onChange={(e) => setFilterClass(e.target.value)}
            className="pl-10 pr-8 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="">All Classes</option>
            {classes.map(className => (
              <option key={className} value={className}>{className}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-4">
        {filteredStudents.length > 0 ? (
          filteredStudents.map((student) => (
            <div
              key={student.id}
              className="border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 flex-1">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold text-sm ${
                      student.gender === 'Male' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400' : 
                      student.gender === 'Female' ? 'bg-pink-100 text-pink-600 dark:bg-pink-900 dark:text-pink-400' : 
                      'bg-gray-100 text-gray-600 dark:bg-gray-600 dark:text-gray-400'
                    }`}>
                      {student.id}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-gray-900 dark:text-white">{student.name}</h3>
                        {isNewStudent(student) && (
                          <span className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 text-xs font-medium px-2 py-1 rounded-full">
                            NEW
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Father: {student.fatherName} | Class: {student.class}
                      </p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        PEN: {student.PEN}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => onEdit(student)}
                      className="p-2 text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                      title="Edit student"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    
                    <button
                      onClick={() => handleDelete(student)}
                      className="p-2 text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                      title="Delete student"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                    
                    <button
                      onClick={() => toggleExpanded(student.id)}
                      className="p-2 text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-700 rounded-lg transition-colors"
                      title="View details"
                    >
                      {expandedStudent === student.id ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
              
              {expandedStudent === student.id && (
                <div className="border-t border-gray-200 dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-700/50">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-700 dark:text-gray-300">SI.NO:</span>
                      <p className="text-gray-900 dark:text-white">{student.id}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700 dark:text-gray-300">Date of Birth:</span>
                      <p className="text-gray-900 dark:text-white">{student.dateOfBirth}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700 dark:text-gray-300">Gender:</span>
                      <p className="text-gray-900 dark:text-white">{student.gender}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700 dark:text-gray-300">Caste:</span>
                      <p className="text-gray-900 dark:text-white">{student.caste} - {student.casteName}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700 dark:text-gray-300">Habitation:</span>
                      <p className="text-gray-900 dark:text-white">{student.habitation}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700 dark:text-gray-300">Admission No:</span>
                      <p className="text-gray-900 dark:text-white">{student.admnNo}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700 dark:text-gray-300">APAAR ID:</span>
                      <p className="text-gray-900 dark:text-white">{student.apaarID}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700 dark:text-gray-300">Student Aadhar:</span>
                      <p className="text-gray-900 dark:text-white">{student.aadharNumber}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700 dark:text-gray-300">Mother's Name:</span>
                      <p className="text-gray-900 dark:text-white">{student.motherName}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700 dark:text-gray-300">Mother's Aadhar:</span>
                      <p className="text-gray-900 dark:text-white">{student.motheraadharNumber}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700 dark:text-gray-300">Mother's Mobile:</span>
                      <p className="text-gray-900 dark:text-white">{student.mothermobileNumber}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700 dark:text-gray-300">Mother's Bank A/C:</span>
                      <p className="text-gray-900 dark:text-white">{student.motherBankAccountNumber}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700 dark:text-gray-300">Mother's IFSC:</span>
                      <p className="text-gray-900 dark:text-white">{student.motherIFSCCode}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700 dark:text-gray-300">Mother's Branch:</span>
                      <p className="text-gray-900 dark:text-white">{student.motherBranchName}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700 dark:text-gray-300">Father's Aadhar:</span>
                      <p className="text-gray-900 dark:text-white">{student.fatheraadharNumber}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700 dark:text-gray-300">Father's Mobile:</span>
                      <p className="text-gray-900 dark:text-white">{student.fathermobileNumber}</p>
                    </div>
                    
                    {/* Guardian Information (if available) */}
                    {student.guardianName && (
                      <>
                        <div className="md:col-span-2 lg:col-span-3 mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
                          <h4 className="font-medium text-gray-900 dark:text-white mb-2">Guardian Information</h4>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700 dark:text-gray-300">Guardian's Name:</span>
                          <p className="text-gray-900 dark:text-white">{student.guardianName}</p>
                        </div>
                        {student.guardianAadharNumber && (
                          <div>
                            <span className="font-medium text-gray-700 dark:text-gray-300">Guardian's Aadhar:</span>
                            <p className="text-gray-900 dark:text-white">{student.guardianAadharNumber}</p>
                          </div>
                        )}
                        {student.guardianMobileNumber && (
                          <div>
                            <span className="font-medium text-gray-700 dark:text-gray-300">Guardian's Mobile:</span>
                            <p className="text-gray-900 dark:text-white">{student.guardianMobileNumber}</p>
                          </div>
                        )}
                        {student.guardianBankAccountNumber && (
                          <div>
                            <span className="font-medium text-gray-700 dark:text-gray-300">Guardian's Bank A/C:</span>
                            <p className="text-gray-900 dark:text-white">{student.guardianBankAccountNumber}</p>
                          </div>
                        )}
                        {student.guardianIFSCCode && (
                          <div>
                            <span className="font-medium text-gray-700 dark:text-gray-300">Guardian's IFSC:</span>
                            <p className="text-gray-900 dark:text-white">{student.guardianIFSCCode}</p>
                          </div>
                        )}
                        {student.guardianBranchName && (
                          <div>
                            <span className="font-medium text-gray-700 dark:text-gray-300">Guardian's Branch:</span>
                            <p className="text-gray-900 dark:text-white">{student.guardianBranchName}</p>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400">No students found</p>
            <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
              {searchTerm || filterClass ? 'Try adjusting your search or filter' : 'Start by adding your first student'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentList;