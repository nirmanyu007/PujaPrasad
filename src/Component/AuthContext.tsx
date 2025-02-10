import React, {createContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

// Configure Google Sign-In
GoogleSignin.configure({
  webClientId:
    '343094080461-5juvar4uilbdecd8t261ifr8qj24nk04.apps.googleusercontent.com',
  iosClientId:
    '343094080461-fc0hqhmovh08n69ru01hg2drlqmb8o9q.apps.googleusercontent.com',
  scopes: ['profile', 'email'],
});

// Define Type for Authentication Context
type AuthContextType = {
  user: {name?: string; photo?: string; email?: string} | null;
  login: (userData: {name?: string; photo?: string; email?: string}) => void;
  logout: () => void;
  isSignedIn: boolean;
};

// Create Context with a default empty object
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const [user, setUser] = useState<{
    name?: string;
    photo?: string;
    email?: string;
  } | null>(null);
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    const loadUser = async () => {
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
        setIsSignedIn(true);
      }
    };
    loadUser();
  }, []);

  const login = async (userData: {
    name?: string;
    photo?: string;
    email?: string;
  }) => {
    setUser(userData);
    setIsSignedIn(true);
    await AsyncStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = async () => {
    setUser(null);
    setIsSignedIn(false);
    await AsyncStorage.removeItem('user');
    await GoogleSignin.signOut();
  };

  return (
    <AuthContext.Provider value={{user, login, logout, isSignedIn}}>
      {children}
    </AuthContext.Provider>
  );
};
