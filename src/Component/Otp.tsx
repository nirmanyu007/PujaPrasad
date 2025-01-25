import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Image,
} from 'react-native';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {RootStackParamList} from '../../App';
const Otp = () => {

     const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const handleOtpSubmit = () => {
      navigation.navigate('TabNavigator'); // Navigate to TabNavigator when Get OTP is clicked
    };
  return (
    <ImageBackground
      source={{
        uri: 'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/Puja-Prasad-App/HomePage/otppp.png',
      }} // Replace with the actual image URL
      style={styles.backgroundImage}
      resizeMode="stretch">
      <View
        style={{
          flexDirection: 'row',
          display: 'flex',
          alignItems: 'center',
          paddingTop: 25,
          paddingLeft: 15,
        }}>
        <Image
          source={{
            uri: 'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/Puja-Prasad-App/HomePage/logoontop.png',
          }}
          style={{width: 25, height: 40}}
        />
        <Text style={styles.logo}>Vedic Vaibhav</Text>
      </View>
      <View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Enter Phone Number</Text>
          <View style={styles.phoneInputContainer}>
            <Text style={styles.countryCode}>+91</Text>
            <TextInput
              style={styles.phoneInput}
              placeholder="Enter Phone Number"
              keyboardType="phone-pad"
            />
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleOtpSubmit}>
          <Text style={styles.buttonText}>Get OTP</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.footerText}>
        By signing in, you agree to our{' '}
        <Text style={styles.link}>Terms of Use</Text>,{' '}
        <Text style={styles.link}>Privacy Policy</Text>, and{' '}
        <Text style={styles.link}>Content Policy</Text>.
      </Text>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
  },

  logo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FE671C',
    paddingLeft: 10,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
    paddingTop: '25%',
    paddingHorizontal: 10,
  },
  label: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 8,
  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  countryCode: {
    fontSize: 16,
    marginRight: 8,
  },
  phoneInput: {
    flex: 1,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#FFA500',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 40,
    marginHorizontal: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footerText: {
    color: '#fff',
    fontSize: 14,
    position: 'absolute',
    bottom: 20,
    width: '100%',
    textAlign: 'center',
  },
  link: {
    color: '#FFA500',
    textDecorationLine: 'underline',
  },
});

export default Otp;
