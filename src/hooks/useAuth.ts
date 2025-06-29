import { useState, useEffect } from 'react';
import { User, LoginFormData, RegisterFormData } from '../types/Auth';

const USERS_STORAGE_KEY = 'studata_users';
const CURRENT_USER_KEY = 'studata_current_user';

export const useAuth = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem(CURRENT_USER_KEY);
    if (savedUser) {
      try {
        setCurrentUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error loading current user:', error);
        localStorage.removeItem(CURRENT_USER_KEY);
      }
    }
    setIsLoading(false);
  }, []);

  const getUsers = (): User[] => {
    const saved = localStorage.getItem(USERS_STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  };

  const saveUsers = (users: User[]) => {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  };

  const register = (userData: RegisterFormData): { success: boolean; message: string } => {
    const users = getUsers();
    
    // Check if user already exists
    if (users.find(user => user.email === userData.email)) {
      return { success: false, message: 'User with this email already exists' };
    }

    // Validate password confirmation
    if (userData.password !== userData.confirmPassword) {
      return { success: false, message: 'Passwords do not match' };
    }

    // Create new user
    const newUser: User = {
      id: Date.now().toString(),
      name: userData.name,
      email: userData.email,
      password: userData.password, // In production, this should be hashed
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    saveUsers(users);

    return { success: true, message: 'Account created successfully' };
  };

  const login = (loginData: LoginFormData): { success: boolean; message: string } => {
    const users = getUsers();
    const user = users.find(u => u.email === loginData.email && u.password === loginData.password);

    if (!user) {
      return { success: false, message: 'Invalid email or password' };
    }

    setCurrentUser(user);
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    return { success: true, message: 'Login successful' };
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem(CURRENT_USER_KEY);
  };

  const isAuthenticated = !!currentUser;

  return {
    currentUser,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout,
  };
};