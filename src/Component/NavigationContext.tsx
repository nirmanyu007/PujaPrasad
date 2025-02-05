import React, {createContext, useContext} from 'react';
import {NavigationProp} from '@react-navigation/native';

const NavigationContext = createContext<NavigationProp<any> | null>(null);

export const useAppNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error(
      'useAppNavigation must be used within a NavigationProvider',
    );
  }
  return context;
};

export const NavigationProvider = ({
  children,
  navigation,
}: {
  children: React.ReactNode;
  navigation: NavigationProp<any>;
}) => {
  return (
    <NavigationContext.Provider value={navigation}>
      {children}
    </NavigationContext.Provider>
  );
};
