import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import App from './App'; // Replace with your main App component path

const Root = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <App />
    </GestureHandlerRootView>
  );
};

export default Root;
