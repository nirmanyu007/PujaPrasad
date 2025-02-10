import React, {useContext} from 'react';
import GoogleAuth from './GoogleAuth';
import {AuthContext} from './AuthContext';

const GoogleAuthScreen = () => {
  const auth = useContext(AuthContext);

  if (!auth) {
    throw new Error('AuthContext must be used within an AuthProvider');
  }

  return (
    <GoogleAuth
      onSignIn={auth.login}
      onSignOut={auth.logout}
      isSignedIn={auth.isSignedIn}
    />
  );
};

export default GoogleAuthScreen;
