import React, {useState} from 'react';
import {View, Pressable, Text, ActivityIndicator} from 'react-native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

type GoogleAuthProps = {
  onSignIn: (user: {name?: string; photo?: string; email?: string}) => void;
  onSignOut: () => void;
  isSignedIn: boolean;
};

const GoogleLogin = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    // Cast response to any to bypass TypeScript errors
    const userInfo = (await GoogleSignin.signIn()) as any;
    console.log('Google Sign-In Response:', userInfo);

    // Extract data from the response
    const data = userInfo.data;
    return {
      idToken: data.idToken ?? '',
      user: {
        email: data.user.email ?? '',
        name: data.user.name ?? '',
        photo: data.user.photo ?? '',
      },
    };
  } catch (error) {
    console.error('Google Login Error:', error);
    return null;
  }
};

const GoogleAuth: React.FC<GoogleAuthProps> = ({
  onSignIn,
  onSignOut,
  isSignedIn,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await GoogleLogin();
      if (response) {
        const {idToken, user} = response;
        if (idToken && user.email) {
          const apiResponse = await axios.post(
            'http://192.168.1.30:5001/google-login-for-pooja-aap',
            {idToken},
          );

          onSignIn({
            name: user.name,
            photo: user.photo,
            email: user.email,
          });

          await AsyncStorage.setItem(
            'user',
            JSON.stringify({
              name: user.name,
              photo: user.photo,
              email: user.email,
              userId: apiResponse.data.user._id,
            }),
          );

          await AsyncStorage.setItem('jwtToken', apiResponse.data.token);
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

  const handleGoogleLogout = async () => {
    try {
      await GoogleSignin.signOut();
      await AsyncStorage.removeItem('user');
      onSignOut();
    } catch (error) {
      console.error('Logout Error:', error);
      setError('An error occurred during logout');
    }
  };

  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: '2%',
      }}>
      {isSignedIn ? (
        <Pressable
          onPress={handleGoogleLogout}
          style={{
            backgroundColor: '#d9534f',
            padding: 10,
            width: '50%',
            borderRadius: 5,
          }}>
          <Text style={{color: '#fff', textAlign: 'center'}}>Log Out</Text>
        </Pressable>
      ) : (
        <Pressable
          onPress={handleGoogleLogin}
          style={{
            backgroundColor: '#4285F4',
            padding: 10,
            borderRadius: 5,
          }}>
          <Text style={{color: '#fff'}}>Sign In with Google</Text>
        </Pressable>
      )}
      {loading && <ActivityIndicator size="large" color="#4285F4" />}
      {error && <Text style={{color: 'red', marginTop: 10}}>{error}</Text>}
    </View>
  );
};

export default GoogleAuth;
