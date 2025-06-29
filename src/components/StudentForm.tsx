import React, { useState, useEffect } from 'react';
import { Save, X } from 'lucide-react';
import { Student, StudentFormData } from '../types/Student';

interface StudentFormProps {
  student?: Student;
  onSubmit: (data: StudentFormData) => void;
  onCancel?: () => void;
  isEditing?: boolean;
}

const StudentForm: React.FC<StudentFormProps> = ({ 
  student, 
  onSubmit, 
  onCancel, 
  isEditing = false 
}) => {
  const [formData, setFormData] = useState<StudentFormData>({
    name: '',
    gender: 'Male',
    caste: 'OC',
    casteName: '',
    dateOfBirth: '',
    PEN: '',
    admnNo: '',
    apaarID: '',
    class: '',
    aadharNumber: '',
    fatherName: '',
    fatheraadharNumber: '',
    fathermobileNumber: '',
    motherName: '',
    motheraadharNumber: '',
    mothermobileNumber: '',
    motherBankAccountNumber: '',
    motherIFSCCode: '',
    motherBranchName: '',
    guardianName: '',
    guardianAadharNumber: '',
    guardianMobileNumber: '',
    guardianBankAccountNumber: '',
    guardianIFSCCode: '',
    guardianBranchName: '',
    habitation: '',
  });

  useEffect(() => {
    if (student) {
      setFormData({
        name: student.name,
        gender: student.gender,
        caste: student.caste,
        casteName: student.casteName,
        dateOfBirth: student.dateOfBirth,
        PEN: student.PEN,
        admnNo: student.admnNo,
        apaarID: student.apaarID,
        class: student.class,
        aadharNumber: student.aadharNumber,
        fatherName: student.fatherName,
        fatheraadharNumber: student.fatheraadharNumber,
        fathermobileNumber: student.fathermobileNumber,
        motherName: student.motherName,
        motheraadharNumber: student.motheraadharNumber,
        mothermobileNumber: student.mothermobileNumber,
        motherBankAccountNumber: student.motherBankAccountNumber || '',
        motherIFSCCode: student.motherIFSCCode || '',
        motherBranchName: student.motherBranchName || '',
        guardianName: student.guardianName || '',
        guardianAadharNumber: student.guardianAadharNumber || '',
        guardianMobileNumber: student.guardianMobileNumber || '',
        guardianBankAccountNumber: student.guardianBankAccountNumber || '',
        guardianIFSCCode: student.guardianIFSCCode || '',
        guardianBranchName: student.guardianBranchName || '',
        habitation: student.habitation,
      });
    }
  }, [student]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    
    if (!isEditing) {
      setFormData({
        name: '',
        gender: 'Male',
        caste: 'OC',
        casteName: '',
        dateOfBirth: '',
        PEN: '',
        admnNo: '',
        apaarID: '',
        class: '',
        aadharNumber: '',
        fatherName: '',
        fatheraadharNumber: '',
        fathermobileNumber: '',
        motherName: '',
        motheraadharNumber: '',
        mothermobileNumber: '',
        motherBankAccountNumber: '',
        motherIFSCCode: '',
        motherBranchName: '',
        guardianName: '',
        guardianAadharNumber: '',
        guardianMobileNumber: '',
        guardianBankAccountNumber: '',
        guardianIFSCCode: '',
        guardianBranchName: '',
        habitation: '',
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          {isEditing ? 'Edit Student' : 'Add New Student'}
        </h2>
        {isEditing && onCancel && (
          <button
            onClick={onCancel}
            className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Information */}
        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Personal Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Gender *
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Date of Birth *
              </label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Habitation *
              </label>
              <input
                type="text"
                name="habitation"
                value={formData.habitation}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
          </div>

          {/* Caste Selection */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Caste Category *
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {['SC', 'ST', 'BC', 'OC'].map((casteOption) => (
                <label key={casteOption} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="caste"
                    value={casteOption}
                    checked={formData.caste === casteOption}
                    onChange={handleChange}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <span className="text-sm font-medium text-gray-900 dark:text-gray-300">{casteOption}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Caste Name *
            </label>
            <input
              type="text"
              name="casteName"
              value={formData.casteName}
              onChange={handleChange}
              required
              placeholder="Enter specific caste name"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
        </div>

        {/* Academic Information */}
        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Academic Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                PEN *
              </label>
              <input
                type="text"
                name="PEN"
                value={formData.PEN}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Admission Number *
              </label>
              <input
                type="text"
                name="admnNo"
                value={formData.admnNo}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                APAAR ID *
              </label>
              <input
                type="text"
                name="apaarID"
                value={formData.apaarID}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Class *
              </label>
              <input
                type="text"
                name="class"
                value={formData.class}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
          </div>
        </div>

        {/* Student Documents */}
        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Student Documents</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Student Aadhar Number *
              </label>
              <input
                type="text"
                name="aadharNumber"
                value={formData.aadharNumber}
                onChange={handleChange}
                required
                pattern="[0-9]{12}"
                placeholder="12-digit Aadhar number"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
          </div>
        </div>

        {/* Father's Information */}
        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Father's Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Father's Name *
              </label>
              <input
                type="text"
                name="fatherName"
                value={formData.fatherName}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Father's Aadhar Number *
              </label>
              <input
                type="text"
                name="fatheraadharNumber"
                value={formData.fatheraadharNumber}
                onChange={handleChange}
                required
                pattern="[0-9]{12}"
                placeholder="12-digit Aadhar number"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Father's Mobile Number *
              </label>
              <input
                type="tel"
                name="fathermobileNumber"
                value={formData.fathermobileNumber}
                onChange={handleChange}
                required
                pattern="[0-9]{10}"
                placeholder="10-digit mobile number"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
          </div>
        </div>

        {/* Mother's Information */}
        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Mother's Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Mother's Name *
              </label>
              <input
                type="text"
                name="motherName"
                value={formData.motherName}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Mother's Aadhar Number *
              </label>
              <input
                type="text"
                name="motheraadharNumber"
                value={formData.motheraadharNumber}
                onChange={handleChange}
                required
                pattern="[0-9]{12}"
                placeholder="12-digit Aadhar number"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Mother's Mobile Number *
              </label>
              <input
                type="tel"
                name="mothermobileNumber"
                value={formData.mothermobileNumber}
                onChange={handleChange}
                required
                pattern="[0-9]{10}"
                placeholder="10-digit mobile number"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Mother's Bank Account Number *
              </label>
              <input
                type="text"
                name="motherBankAccountNumber"
                value={formData.motherBankAccountNumber}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Mother's IFSC Code *
              </label>
              <input
                type="text"
                name="motherIFSCCode"
                value={formData.motherIFSCCode}
                onChange={handleChange}
                required
                placeholder="e.g., SBIN0001234"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Mother's Branch Name *
              </label>
              <input
                type="text"
                name="motherBranchName"
                value={formData.motherBranchName}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
          </div>
        </div>

        {/* Guardian Information */}
        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Guardian Information <span className="text-sm font-normal text-gray-500 dark:text-gray-400">(Optional)</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Guardian's Name
              </label>
              <input
                type="text"
                name="guardianName"
                value={formData.guardianName}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Guardian's Aadhar Number
              </label>
              <input
                type="text"
                name="guardianAadharNumber"
                value={formData.guardianAadharNumber}
                onChange={handleChange}
                pattern="[0-9]{12}"
                placeholder="12-digit Aadhar number"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Guardian's Mobile Number
              </label>
              <input
                type="tel"
                name="guardianMobileNumber"
                value={formData.guardianMobileNumber}
                onChange={handleChange}
                pattern="[0-9]{10}"
                placeholder="10-digit mobile number"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Guardian's Bank Account Number
              </label>
              <input
                type="text"
                name="guardianBankAccountNumber"
                value={formData.guardianBankAccountNumber}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Guardian's IFSC Code
              </label>
              <input
                type="text"
                name="guardianIFSCCode"
                value={formData.guardianIFSCCode}
                onChange={handleChange}
                placeholder="e.g., SBIN0001234"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Guardian's Branch Name
              </label>
              <input
                type="text"
                name="guardianBranchName"
                value={formData.guardianBranchName}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
          </div>
        </div>

        <div className="flex gap-4 pt-6">
          <button
            type="submit"
            className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            <Save className="h-5 w-5" />
            {isEditing ? 'Update Student' : 'Add Student'}
          </button>
          
          {isEditing && onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default StudentForm;