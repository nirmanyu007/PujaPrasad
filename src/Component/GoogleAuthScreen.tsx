import React, {useState} from 'react';
import GoogleAuth from './GoogleAuth';

const GoogleAuthScreen = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState<{
    name?: string;
    photo?: string;
    email?: string;
  } | null>(null);

  const handleSignIn = (userData: {
    name?: string;
    photo?: string;
    email?: string;
  }) => {
    setUser(userData);
    setIsSignedIn(true);
  };

  const handleSignOut = () => {
    setUser(null);
    setIsSignedIn(false);
  };

  return (
    <GoogleAuth
      onSignIn={handleSignIn}
      onSignOut={handleSignOut}
      isSignedIn={isSignedIn}
    />
  );
};

export default GoogleAuthScreen;
