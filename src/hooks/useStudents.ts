import { useState, useEffect } from 'react';
import { Student, StudentFormData } from '../types/Student';

const STORAGE_KEY = 'studata_students';

export const useStudents = () => {
  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
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
      }
    }
  }, []);

  const saveStudents = (updatedStudents: Student[]) => {
    // Sort by SI.NO before saving
    const sortedStudents = updatedStudents.sort((a, b) => parseInt(a.id) - parseInt(b.id));
    setStudents(sortedStudents);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sortedStudents));
  };

  const getNextSerialNumber = () => {
    if (students.length === 0) return '1';
    const maxId = Math.max(...students.map(s => parseInt(s.id)));
    return (maxId + 1).toString();
  };

  const addStudent = (studentData: StudentFormData) => {
    const newStudent: Student = {
      ...studentData,
      id: getNextSerialNumber(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    saveStudents([...students, newStudent]);
    return newStudent;
  };

  const updateStudent = (id: string, studentData: StudentFormData) => {
    const updatedStudents = students.map(student =>
      student.id === id
        ? { ...student, ...studentData, updatedAt: new Date().toISOString() }
        : student
    );
    saveStudents(updatedStudents);
  };

  const deleteStudent = (id: string) => {
    const updatedStudents = students.filter(student => student.id !== id);
    // Reassign serial numbers after deletion
    const reorderedStudents = updatedStudents.map((student, index) => ({
      ...student,
      id: (index + 1).toString()
    }));
    saveStudents(reorderedStudents);
  };

  return {
    students,
    addStudent,
    updateStudent,
    deleteStudent,
  };
};