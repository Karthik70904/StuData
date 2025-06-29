import React, { useState } from 'react';
import { useStudents } from './hooks/useStudents';
import { useToast } from './hooks/useToast';
import { Student } from './types/Student';

import Header from './components/Header';
import Dashboard from './components/Dashboard';
import StudentForm from './components/StudentForm';
import StudentList from './components/StudentList';
import Analytics from './components/Analytics';
import Export from './components/Export';
import ToastContainer from './components/Toast';

function App() {
  const { students, addStudent, updateStudent, deleteStudent } = useStudents();
  const { toasts, showToast, removeToast } = useToast();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);

  const handleAddStudent = (studentData: any) => {
    try {
      addStudent(studentData);
      showToast('Student added successfully!', 'success');
    } catch (error) {
      showToast('Failed to add student', 'error');
    }
  };

  const handleUpdateStudent = (studentData: any) => {
    if (!editingStudent) return;
    
    try {
      updateStudent(editingStudent.id, studentData);
      setEditingStudent(null);
      setActiveTab('students');
      showToast('Student updated successfully!', 'success');
    } catch (error) {
      showToast('Failed to update student', 'error');
    }
  };

  const handleDeleteStudent = (id: string) => {
    try {
      deleteStudent(id);
      showToast('Student deleted successfully!', 'success');
    } catch (error) {
      showToast('Failed to delete student', 'error');
    }
  };

  const handleEditStudent = (student: Student) => {
    setEditingStudent(student);
    setActiveTab('add');
  };

  const handleCancelEdit = () => {
    setEditingStudent(null);
    setActiveTab('students');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard students={students} />;
      
      case 'add':
        return (
          <StudentForm
            student={editingStudent || undefined}
            onSubmit={editingStudent ? handleUpdateStudent : handleAddStudent}
            onCancel={editingStudent ? handleCancelEdit : undefined}
            isEditing={!!editingStudent}
          />
        );
      
      case 'students':
        return (
          <StudentList
            students={students}
            onEdit={handleEditStudent}
            onDelete={handleDeleteStudent}
          />
        );
      
      case 'analytics':
        return <Analytics students={students} />;
      
      case 'export':
        return <Export students={students} onShowToast={showToast} />;
      
      default:
        return <Dashboard students={students} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        studentCount={students.length}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderContent()}
      </main>
      
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  );
}

export default App;