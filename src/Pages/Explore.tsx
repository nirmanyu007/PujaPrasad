import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import ExploreNavbar from '../Component/ExploreNavbar'
import {useNavigation, NavigationProp} from '@react-navigation/native';
// import { TouchableOpacity } from 'react-native-gesture-handler';

type StackParamList = {
  Blogs: undefined;
  Libreary: undefined;
  Suvichar: undefined;
};

const Explore = () => {

  const navigation = useNavigation<NavigationProp<StackParamList>>(); 
  const handleClick = () => {
    navigation.navigate('Blogs'); // Navigate to PreviewPuja screen
  };
  const handleClick2 = () => {
    navigation.navigate('Libreary'); // Navigate to PreviewPuja screen
  };
  const handleClick3 = () => {
    navigation.navigate('Suvichar'); // Navigate to PreviewPuja screen
  };
  return (
    <View style={{paddingHorizontal: '4%'}}>
      <ExploreNavbar />
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          onPress={handleClick}
          style={{
            backgroundColor: '#FFA500',
            borderRadius: 20,
            borderBottomWidth: 5,
            width: '50%',
            borderBottomColor: 'rgba(255,165,0,0.5)',
            marginRight: '1%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: '5%',
          }}>
          <Text style={{paddingTop: '5%', color: 'white', fontSize: 20}}>
            Blogs
          </Text>
          <Image
            source={{
              uri: 'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/Puja-Prasad-App/HomePage/ganesh2.png',
            }}
            style={{height: 81, width: 50}}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleClick2}
          style={{
            backgroundColor: '#FFA500',
            borderRadius: 20,
            borderBottomWidth: 5,
            width: '50%',
            borderBottomColor: 'rgba(255,165,0,0.5)',
            marginLeft: '1%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: '5%',
          }}>
          <Text style={{paddingTop: '5%', color: 'white', fontSize: 20}}>
            Library
          </Text>
          <Image
            source={{
              uri: 'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/Puja-Prasad-App/HomePage/sarswati.png',
            }}
            style={{height: 81, width: 50}}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={handleClick3}
        style={{
          backgroundColor: '#FFA500',
          borderRadius: 20,
          width: '49%',
          borderBottomWidth: 5,
          borderBottomColor: 'rgba(255,165,0,0.5)',
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: '5%',
        }}>
        <Text style={{paddingTop: '5%', color: 'white', fontSize: 20}}>
          Suvichar
        </Text>
        <Image
          source={{
            uri: 'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/Puja-Prasad-App/HomePage/krishna2.png',
          }}
          style={{height: 81, width: 50}}
        />
      </TouchableOpacity>
    </View>
  );
}

export default Explore