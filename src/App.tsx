import React, { useState } from 'react';
import { useStudents } from './hooks/useStudents';
import { useToast } from './hooks/useToast';
import { useAuth } from './hooks/useAuth';
import { Student } from './types/Student';

import Header from './components/Header';
import Dashboard from './components/Dashboard';
import StudentForm from './components/StudentForm';
import StudentList from './components/StudentList';
import Analytics from './components/Analytics';
import Export from './components/Export';
import ToastContainer from './components/Toast';
import LoginForm from './components/LoginForm';

function App() {
  const { currentUser, isAuthenticated, isLoading, login, register, logout } = useAuth();
  const { students, addStudent, updateStudent, deleteStudent } = useStudents(currentUser?.id);
  const { toasts, showToast, removeToast } = useToast();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);

  // Create demo user on first load
  React.useEffect(() => {
    const users = localStorage.getItem('studata_users');
    if (!users) {
      const demoUser = {
        id: '1',
        name: 'Admin User',
        email: 'admin@studata.com',
        password: 'admin123',
        createdAt: new Date().toISOString(),
      };
      localStorage.setItem('studata_users', JSON.stringify([demoUser]));
    }
  }, []);

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

  const handleLogout = () => {
    logout();
    setActiveTab('dashboard');
    setEditingStudent(null);
    showToast('Logged out successfully', 'info');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard students={students} currentUser={currentUser} />;
      
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
            currentUser={currentUser}
          />
        );
      
      case 'analytics':
        return <Analytics students={students} currentUser={currentUser} />;
      
      case 'export':
        return <Export students={students} onShowToast={showToast} currentUser={currentUser} />;
      
      default:
        return <Dashboard students={students} currentUser={currentUser} />;
    }
  };

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  // Show login form if not authenticated
  if (!isAuthenticated) {
    return (
      <>
        <LoginForm 
          onLogin={login}
          onRegister={register}
          onShowToast={showToast}
        />
        <ToastContainer toasts={toasts} onRemove={removeToast} />
      </>
    );
  }

  // Show main application if authenticated
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        studentCount={students.length}
        currentUser={currentUser}
        onLogout={handleLogout}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderContent()}
      </main>
      
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  );
}

export default App;