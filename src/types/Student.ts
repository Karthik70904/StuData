export interface Student {
  id: string;
  userId: string; // Associate student with user
  name: string;
  gender: 'Male' | 'Female' | 'Other';
  caste: 'SC' | 'ST' | 'BC' | 'OC';
  casteName: string;
  dateOfBirth: string;
  PEN: string;
  admnNo: string;
  apaarID: string;
  class: string;
  aadharNumber: string;
  fatherName: string;
  fatheraadharNumber: string;
  fathermobileNumber: string;
  motherName: string;
  motheraadharNumber: string;
  mothermobileNumber: string;
  motherBankAccountNumber: string;
  motherIFSCCode: string;
  motherBranchName: string;
  guardianName?: string;
  guardianAadharNumber?: string;
  guardianMobileNumber?: string;
  guardianBankAccountNumber?: string;
  guardianIFSCCode?: string;
  guardianBranchName?: string;
  habitation: string;
  createdAt: string;
  updatedAt: string;
}

export interface StudentFormData extends Omit<Student, 'id' | 'userId' | 'createdAt' | 'updatedAt'> {}