
import { createContext, useContext, useState, ReactNode } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  role: "user" | "organization";
  image?: string;
}

interface AuthContextType {
  currentUser: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const login = async (email: string, password: string): Promise<void> => {
    setIsLoading(true);
    try {
      // Mock login - in a real app, this would call an API
      setTimeout(() => {
        setCurrentUser({
          id: "1",
          name: "Test User",
          email: email,
          role: "user"
        });
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  };

  const register = async (name: string, email: string, password: string): Promise<void> => {
    setIsLoading(true);
    try {
      // Mock register - in a real app, this would call an API
      setTimeout(() => {
        setCurrentUser({
          id: "1",
          name: name,
          email: email,
          role: "user"
        });
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  };

  const resetPassword = async (email: string): Promise<void> => {
    setIsLoading(true);
    try {
      // Mock reset password - in a real app, this would call an API
      setTimeout(() => {
        console.log(`Password reset email sent to ${email}`);
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    isLoading,
    login,
    logout,
    register,
    resetPassword
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
