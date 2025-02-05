

import React, {useState} from 'react';
import {View, Pressable, Text, ActivityIndicator} from 'react-native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

// Configure Google Sign-In
GoogleSignin.configure({
  webClientId:
    '343094080461-5juvar4uilbdecd8t261ifr8qj24nk04.apps.googleusercontent.com', // Web Client ID
  iosClientId:
    '343094080461-fc0hqhmovh08n69ru01hg2drlqmb8o9q.apps.googleusercontent.com', // iOS Client ID
  scopes: ['profile', 'email'],
});

// Custom type for Google Sign-In response
type GoogleSignInResponse = {
  idToken: string;
  user: {
    email: string;
    name?: string;
    photo?: string;
    id?: string;
  };
};

// Mock API
const authAPI = {
  validateToken: async (data: {
    token: string;
    email: string;
  }): Promise<{data: any}> => {
    return Promise.resolve({data: {success: true}});
  },
};

const GoogleLogin = async (): Promise<GoogleSignInResponse | null> => {
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();

    console.log('Google Sign-In Raw Response:', userInfo); // Debugging Log

    if (userInfo?.idToken && userInfo?.user?.email) {
      return {
        idToken: userInfo.idToken,
        user: {
          email: userInfo.user.email,
          name: userInfo.user.name || '',
          photo: userInfo.user.photo || '',
          id: userInfo.user.id || '',
        },
      };
    } else {
      console.error('Invalid Google Sign-In Response:', userInfo);
      return null;
    }
  } catch (error) {
    console.error('Google Login Error:', error);
    return null;
  }
};


const GoogleAuth: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handlePostLoginData = async (data: any) => {
    console.log('Post Login Data:', data);
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await GoogleLogin();

      if (response) {
        const {idToken, user} = response;

        if (idToken && user.email) {
          console.log('Google Sign-In Successful:', user);

          const apiResponse = await authAPI.validateToken({
            token: idToken,
            email: user.email,
          });

          console.log('API Response:', apiResponse.data);
          await handlePostLoginData(apiResponse.data);
        } else {
          setError('Missing user email or idToken');
        }
      } else {
        setError('Failed to retrieve user information');
      }
    } catch (error) {
      console.error('Login Error:', error);
      setError('An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Pressable
        onPress={handleGoogleLogin}
        style={{
          backgroundColor: '#4285F4',
          padding: 10,
          borderRadius: 5,
        }}>
        <Text style={{color: '#fff'}}>Continue with Google</Text>
      </Pressable>
      {loading && <ActivityIndicator size="large" color="#4285F4" />}
      {error && <Text style={{color: 'red', marginTop: 10}}>{error}</Text>}
    </View>
  );
};

export default GoogleAuth;
