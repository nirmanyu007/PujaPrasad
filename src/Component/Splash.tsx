import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'

import {useNavigation, NavigationProp} from '@react-navigation/native';
import {RootStackParamList} from '../../App';

const Splash = () => {

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  
      const handleOtpSubmit = () => {
        navigation.navigate('Otp'); // Navigate to TabNavigator when Get OTP is clicked
      };
  return (
    <View style={{backgroundColor: '#FFFEFA', flex: 1, position: 'relative'}}>
      <View
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: '10%',
        }}>
        <Text style={{color: '#FF651C', fontSize: 24, fontWeight: '600'}}>
          Welcome to Vedic Vaibhav...
        </Text>
      </View>
      <View
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: '2%',
          width: '100%',
        }}>
        <Text
          style={{
            color: 'rgba(0,0,0,0.4)',
            fontSize: 13,
            fontWeight: '500',
            textAlign: 'center',
            width: '70%',
          }}>
          offering authentic Hindu spiritual services and rituals at your home
          with devotion.
        </Text>
      </View>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: '45%',
        }}>
        <Image
          source={{
            uri: 'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/Puja-Prasad-App/Puja/linearGrdient123.png',
          }}
          style={{height: 100, width: 100}}
        />
        <Text style={{fontSize: 24, color: '#FF651C', fontWeight: '600'}}>
          Vedic Vaibhav
        </Text>
        <Text style={{fontSize: 12, color: 'black'}}>
          वेद वैभवं वन्दे, शाश्वतं सनातनं।
        </Text>
      </View>
      <Image
        source={{
          uri: 'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/Puja-Prasad-App/HomePage/flower156.png',
        }}
        style={{
          width: 280,
          height: 280,
          position: 'absolute',
          top: '30%',
          left: '15%',
        }}
      />
      <View
        style={{
          position: 'absolute',
          bottom: 20,
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          onPress={handleOtpSubmit}
          style={{
            width: '90%',
            backgroundColor: '#FF8901',
            borderRadius: 1000,
          }}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 16,
              fontWeight: '600',
              color: 'white',
              paddingVertical: 15,
            }}>
            Get Started
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Splash