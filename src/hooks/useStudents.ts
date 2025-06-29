import { useState, useEffect } from 'react';
import { Student, StudentFormData } from '../types/Student';

export const useStudents = (userId?: string) => {
  const [students, setStudents] = useState<Student[]>([]);

  const getStorageKey = (userId: string) => `studata_students_${userId}`;

  useEffect(() => {
    if (!userId) {
      setStudents([]);
      return;
    }

    const storageKey = getStorageKey(userId);
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        const loadedStudents = JSON.parse(saved);
        // Sort by SI.NO to maintain order
        const sortedStudents = loadedStudents.sort((a: Student, b: Student) => 
          parseInt(a.id) - parseInt(b.id)
        );
        setStudents(sortedStudents);
      } catch (error) {
        console.error('Error loading students:', error);
        setStudents([]);
      }
    } else {
      setStudents([]);
    }
  }, [userId]);

  const saveStudents = (updatedStudents: Student[]) => {
    if (!userId) return;
    
    // Sort by SI.NO before saving
    const sortedStudents = updatedStudents.sort((a, b) => parseInt(a.id) - parseInt(b.id));
    setStudents(sortedStudents);
    
    const storageKey = getStorageKey(userId);
    localStorage.setItem(storageKey, JSON.stringify(sortedStudents));
  };

  const getNextSerialNumber = () => {
    if (students.length === 0) return '1';
    const maxId = Math.max(...students.map(s => parseInt(s.id)));
    return (maxId + 1).toString();
  };

  const addStudent = (studentData: StudentFormData) => {
    if (!userId) throw new Error('User not authenticated');
    
    const newStudent: Student = {
      ...studentData,
      id: getNextSerialNumber(),
      userId: userId, // Associate student with current user
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    saveStudents([...students, newStudent]);
    return newStudent;
  };

  const updateStudent = (id: string, studentData: StudentFormData) => {
    if (!userId) throw new Error('User not authenticated');
    
    const updatedStudents = students.map(student =>
      student.id === id && student.userId === userId
        ? { ...student, ...studentData, updatedAt: new Date().toISOString() }
        : student
    );
    saveStudents(updatedStudents);
  };

  const deleteStudent = (id: string) => {
    if (!userId) throw new Error('User not authenticated');
    
    // Only delete if student belongs to current user
    const studentToDelete = students.find(s => s.id === id && s.userId === userId);
    if (!studentToDelete) {
      throw new Error('Student not found or access denied');
    }
    
    const updatedStudents = students.filter(student => student.id !== id);
    // Reassign serial numbers after deletion
    const reorderedStudents = updatedStudents.map((student, index) => ({
      ...student,
      id: (index + 1).toString()
    }));
    saveStudents(reorderedStudents);
  };

  const clearUserData = () => {
    if (!userId) return;
    
    const storageKey = getStorageKey(userId);
    localStorage.removeItem(storageKey);
    setStudents([]);
  };

  return {
    students,
    addStudent,
    updateStudent,
    deleteStudent,
    clearUserData,
  };
};