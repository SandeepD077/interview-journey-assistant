
import React, { createContext, useState, useContext, useEffect } from "react";
import { toast } from "sonner";

type UserRole = "user" | "organization" | null;

interface UserData {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  organizationName?: string;
}

interface AuthContextType {
  currentUser: UserData | null;
  isLoading: boolean;
  login: (email: string, password: string, role: UserRole) => Promise<boolean>;
  register: (data: Partial<UserData> & { password: string }) => Promise<boolean>;
  logout: () => void;
  resetPassword: (email: string) => Promise<boolean>;
}

// Mock users for development
const MOCK_USERS: UserData[] = [
  {
    id: "1",
    email: "user@example.com",
    name: "John Doe",
    role: "user",
  },
  {
    id: "2",
    email: "org@example.com",
    name: "Jane Smith",
    role: "organization",
    organizationName: "Acme Inc.",
  },
];

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState<(UserData & { password: string })[]>(
    MOCK_USERS.map((user) => ({ ...user, password: "password" }))
  );

  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      try {
        setCurrentUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse user data:", error);
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string, role: UserRole): Promise<boolean> => {
    setIsLoading(true);
    // Simulate network request
    await new Promise((resolve) => setTimeout(resolve, 1000));

    try {
      const foundUser = users.find(
        (user) => user.email === email && user.password === password && user.role === role
      );

      if (foundUser) {
        const { password, ...userData } = foundUser;
        setCurrentUser(userData);
        localStorage.setItem("currentUser", JSON.stringify(userData));
        toast.success("Logged in successfully!");
        return true;
      }
      
      toast.error("Invalid email or password");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: Partial<UserData> & { password: string }): Promise<boolean> => {
    setIsLoading(true);
    // Simulate network request
    await new Promise((resolve) => setTimeout(resolve, 1000));

    try {
      // Check if user already exists
      const userExists = users.some((user) => user.email === data.email);
      if (userExists) {
        toast.error("User with this email already exists");
        return false;
      }

      // Create new user
      const newUser = {
        id: `user_${Date.now()}`,
        email: data.email || "",
        name: data.name || "",
        role: data.role || "user",
        password: data.password,
        organizationName: data.organizationName,
      };

      setUsers([...users, newUser]);
      
      // Log in the new user
      const { password, ...userData } = newUser;
      setCurrentUser(userData);
      localStorage.setItem("currentUser", JSON.stringify(userData));
      
      toast.success("Account created successfully!");
      return true;
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (email: string): Promise<boolean> => {
    setIsLoading(true);
    // Simulate network request
    await new Promise((resolve) => setTimeout(resolve, 1000));

    try {
      const userExists = users.some((user) => user.email === email);
      if (!userExists) {
        toast.error("No account found with this email");
        return false;
      }

      toast.success("Password reset link sent to your email!");
      return true;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
    toast.success("Logged out successfully");
  };

  const value = {
    currentUser,
    isLoading,
    login,
    register,
    logout,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
