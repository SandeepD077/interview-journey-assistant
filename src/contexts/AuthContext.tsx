
import React, { createContext, useState, useContext, useEffect } from 'react';

// Define types for user data
export interface UserData {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'organization';
  organizationName?: string;
  photoURL?: string;
}

// Define AuthContext
interface AuthContextType {
  currentUser: UserData | null;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: Partial<UserData>, password: string) => Promise<void>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Sample user data for testing
const sampleUser: UserData = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  role: 'user',
  photoURL: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John'
};

const sampleOrgUser: UserData = {
  id: '2',
  name: 'Alice Smith',
  email: 'alice@techcorp.com',
  role: 'organization',
  organizationName: 'Tech Corporation',
  photoURL: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice'
};

// Create Auth Provider
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  // Simulate checking for existing session
  useEffect(() => {
    // In a real app, you would check for an existing token and validate it
    const savedUser = localStorage.getItem('currentUser');
    
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
    
    setLoading(false);
  }, []);

  // Login function
  const login = async (email: string, password: string): Promise<void> => {
    setLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Sample login logic - in real app, would call authentication API
      let user: UserData;
      
      if (email.includes('org') || email.includes('tech')) {
        user = sampleOrgUser;
      } else {
        user = sampleUser;
      }
      
      setCurrentUser(user);
      localStorage.setItem('currentUser', JSON.stringify(user));
    } finally {
      setLoading(false);
    }
  };

  // Register function
  const register = async (userData: Partial<UserData>, password: string): Promise<void> => {
    setLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, would call registration API
      const newUser: UserData = {
        id: Math.random().toString(36).substr(2, 9),
        name: userData.name || 'New User',
        email: userData.email || 'user@example.com',
        role: userData.role || 'user',
        organizationName: userData.organizationName,
        photoURL: `https://api.dicebear.com/7.x/avataaars/svg?seed=${userData.name}`
      };
      
      setCurrentUser(newUser);
      localStorage.setItem('currentUser', JSON.stringify(newUser));
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = (): void => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  };

  // Forgot password function
  const forgotPassword = async (email: string): Promise<void> => {
    setLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, would call password reset API
      console.log(`Password reset email sent to ${email}`);
    } finally {
      setLoading(false);
    }
  };

  const value = {
    currentUser,
    login,
    register,
    logout,
    forgotPassword,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for using AuthContext
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};
