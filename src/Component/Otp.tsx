import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  // ImageBackground,
  Image,
  Dimensions,
} from 'react-native';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {RootStackParamList} from '../../App';
import LinearGradient from 'react-native-linear-gradient';

const { width, height } = Dimensions.get('window'); // Get screen size
const Otp = () => {

     const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const handleOtpSubmit = () => {
      navigation.navigate('TabNavigator'); // Navigate to TabNavigator when Get OTP is clicked
    };
  return (
    <View>
      <View style={{position: 'relative'}}>
        <Image
          source={{
            uri: 'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/Puja-Prasad-App/HomePage/OtpTop.png',
          }}
          style={{width: '100%', height: 200}}
        />
        <View style={{position: 'absolute', bottom: -80}}>
          <Image
            source={{
              uri: 'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/Puja-Prasad-App/HomePage/moor.png',
            }}
            style={{height: 200, width: 160, zIndex: 100}}
          />
        </View>
        <View style={{position: 'absolute', right: 15, top: 15}}>
          <Image
            source={{
              uri: 'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/Puja-Prasad-App/HomePage/home.png',
            }}
            style={{width: 60, height: 60}}
          />
        </View>
      </View>
      <LinearGradient
        colors={['#FFF9F2', '#FBA97F']} // 🔥 Gradient from Top (FFF9F2) to Bottom (FBA97F)
        // ✅ Apply gradient styles
        style={{
          zIndex: 1,
          height: '100%',
          position: 'relative',
          paddingBottom: 0,
        }}>
        <View>
          <View style={{paddingTop: 100, paddingHorizontal: '3%'}}>
            <View style={{flexDirection: 'row', alignItems: 'baseline'}}>
              <Text style={{fontSize: 32, fontWeight: 600, color: 'black'}}>
                One tap,{' '}
              </Text>
              <Text style={{fontSize: 18, color: 'black', fontWeight: 600}}>
                zero{' '}
              </Text>
              <Text style={{fontSize: 24, color: 'black', fontWeight: 600}}>
                hassle!
              </Text>
            </View>
            <View>
              <Text style={{fontSize: 18, fontWeight: 600, color: '#FF8901'}}>
                वेद वैभवं वन्दे, शाश्वतं सनातनं।
              </Text>
            </View>

            <View>
              <TouchableOpacity
                onPress={handleOtpSubmit}
                style={{
                  backgroundColor: '#FF8901',
                  borderRadius: 80000,
                  marginTop: '5%',
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 18,
                    fontWeight: '600',
                    color: 'white',
                    paddingVertical: '3%',
                  }}>
                  Get Started
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              justifyContent: 'center',
              paddingTop: '20%',
              display: 'flex',
              alignItems: 'center',
            }}>
            <Image
              source={{
                uri: 'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/Puja-Prasad-App/HomePage/paudha.png',
              }}
              style={{width: 135, height: 165}}
            />
          </View>
          <View
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              paddingTop: '3%',
            }}>
            <View
              style={{
                borderWidth: 0.2,
                width: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}></View>
          </View>
          <View
            style={{
              // position: 'absolute',
              // bottom: 10,
              width: '100%',
              paddingHorizontal: '10%',
              alignItems: 'center',
              paddingTop: '10%',
            }}>
            <Text style={{fontSize: 13, textAlign: 'center', color: '#444'}}>
              By signing in, you agree to our{' '}
              <Text style={{fontWeight: 'bold', color: '#FF8901'}}>
                Terms of Use
              </Text>
              <Text style={{fontWeight: 'bold', color: '#FF8901'}}>
                Privacy Policy
              </Text>
              <Text style={{fontWeight: 'bold', color: '#FF8901'}}>
                Content Policy
              </Text>
              .
            </Text>
          </View>
        </View>
        <View
          style={{position: 'absolute', right: 15, bottom: 15, zIndex: 100}}>
          <Image
            source={{
              uri: 'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/Puja-Prasad-App/HomePage/home.png',
            }}
            style={{width: 60, height: 60}}
          />
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    // flex: 1,
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
    paddingTop:'2%'
    // marginBottom: 20,
    // paddingTop: '25%',
    // paddingHorizontal: 10,
  },
  label: {
    fontSize: 16,
    color: '#fff',
    // marginBottom: 8,
  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8000,
    paddingHorizontal: 12,
    borderWidth:1,
    borderColor:'rgba(0,0,0,0.3)'
  },
  countryCode: {
    fontSize: 16,
    marginRight: 8,
    color:'black'
  },
  phoneInput: {
    // flex: 1,
    fontSize: 16,
    color:'black',
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
    // position: 'absolute',
    bottom: 0,
    width: '100%',
    textAlign: 'center',
  },
  link: {
    color: '#FFA500',
    textDecorationLine: 'underline',
  },
});

export default Otp;
