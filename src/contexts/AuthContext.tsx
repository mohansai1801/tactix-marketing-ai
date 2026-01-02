import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  displayName?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session (simulated)
    const storedUser = localStorage.getItem('tactix_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    try {
      // Simulated Firebase Auth - in production, replace with actual Firebase
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (password.length < 6) {
        return { success: false, error: 'Password must be at least 6 characters' };
      }

      const newUser: User = {
        id: `user_${Date.now()}`,
        email,
        displayName: email.split('@')[0],
      };
      
      setUser(newUser);
      localStorage.setItem('tactix_user', JSON.stringify(newUser));
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Login failed. Please try again.' };
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    try {
      // Simulated Firebase Auth
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (password.length < 6) {
        return { success: false, error: 'Password must be at least 6 characters' };
      }

      const newUser: User = {
        id: `user_${Date.now()}`,
        email,
        displayName: email.split('@')[0],
      };
      
      setUser(newUser);
      localStorage.setItem('tactix_user', JSON.stringify(newUser));
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Signup failed. Please try again.' };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('tactix_user');
    localStorage.removeItem('tactix_onboarding');
    localStorage.removeItem('tactix_agents');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
