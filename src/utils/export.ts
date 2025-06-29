import { Student } from '../types/Student';

export const exportToJSON = (students: Student[]) => {
  const dataStr = JSON.stringify(students, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  
  const link = document.createElement('a');
  link.href = URL.createObjectURL(dataBlob);
  link.download = `studata_export_${new Date().toISOString().split('T')[0]}.json`;
  link.click();
  
  URL.revokeObjectURL(link.href);
};

export const exportToCSV = (students: Student[]) => {
  const headers = [
    'SI.NO', 'Name', 'Gender', 'Caste', 'Caste Name', 'Date of Birth', 'PEN',
    'Admission No', 'APAAR ID', 'Class', 'Student Aadhar', 'Father Name',
    'Father Aadhar', 'Father Mobile', 'Mother Name', 'Mother Aadhar',
    'Mother Mobile', 'Mother Bank Account', 'Mother IFSC', 'Mother Branch',
    'Guardian Name', 'Guardian Aadhar', 'Guardian Mobile', 'Guardian Bank Account',
    'Guardian IFSC', 'Guardian Branch', 'Habitation', 'Created At', 'Updated At'
  ];
  
  const csvContent = [
    headers.join(','),
    ...students.map(student => [
      student.id,
      `"${student.name}"`,
      student.gender,
      student.caste,
      `"${student.casteName}"`,
      student.dateOfBirth,
      student.PEN,
      student.admnNo,
      student.apaarID,
      student.class,
      student.aadharNumber,
      `"${student.fatherName}"`,
      student.fatheraadharNumber,
      student.fathermobileNumber,
      `"${student.motherName}"`,
      student.motheraadharNumber,
      student.mothermobileNumber,
      student.motherBankAccountNumber || '',
      student.motherIFSCCode || '',
      `"${student.motherBranchName || ''}"`,
      `"${student.guardianName || ''}"`,
      student.guardianAadharNumber || '',
      student.guardianMobileNumber || '',
      student.guardianBankAccountNumber || '',
      student.guardianIFSCCode || '',
      `"${student.guardianBranchName || ''}"`,
      `"${student.habitation}"`,
      student.createdAt,
      student.updatedAt
    ].join(','))
  ].join('\n');
  
  const dataBlob = new Blob([csvContent], { type: 'text/csv' });
  
  const link = document.createElement('a');
  link.href = URL.createObjectURL(dataBlob);
  link.download = `studata_export_${new Date().toISOString().split('T')[0]}.csv`;
  link.click();
  
  URL.revokeObjectURL(link.href);
};