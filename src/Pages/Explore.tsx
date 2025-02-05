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
    <View
      style={{
        flex: 1,
        paddingHorizontal: '4%',
        position: 'relative',
        backgroundColor: '#FFFEFA',
      }}>
      {/* <View style={{position: 'absolute', top: 0}}> */}
      <Image
        source={{
          uri: 'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/Puja-Prasad-App/HomePage/gridBox.png',
        }}
        style={{position: 'absolute', top: 0, width: '100%', height: 425}}
      />
      {/* </View> */}
      <ExploreNavbar />
      <View style={{flexDirection: 'row', paddingVertical: '5%'}}>
        <TouchableOpacity
          onPress={handleClick}
          style={{
            backgroundColor: '#FFA500',
            borderRadius: 10,
            borderBottomWidth: 5,
            width: '50%',
            borderBottomColor: 'rgba(255,165,0,0.5)',
            marginRight: '1%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: '5%',
            paddingVertical: '3%',
          }}>
          <Text style={{paddingTop: '35%', color: 'white', fontSize: 20}}>
            | Blog
          </Text>
          <Image
            source={{
              uri: 'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/Puja-Prasad-App/HomePage/ganeshBlack.png',
            }}
            style={{height: 81, width: 50}}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleClick2}
          style={{
            backgroundColor: '#F980D1',
            borderRadius: 10,
            borderBottomWidth: 5,
            width: '50%',
            borderBottomColor: '#FCBFE5',
            marginLeft: '1%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: '5%',
            paddingVertical: '3%',
          }}>
          <Text style={{paddingTop: '35%', color: 'white', fontSize: 20}}>
            | Library
          </Text>
          <Image
            source={{
              uri: 'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/Puja-Prasad-App/HomePage/SarswatiBlack.png',
            }}
            style={{height: 81, width: 67}}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={handleClick3}
        style={{
          backgroundColor: '#01A668',
          borderRadius: 10,
          width: '49%',
          borderBottomWidth: 5,
          borderBottomColor: '#BFE8D5',
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: '1%',
          paddingVertical: '3%',
        }}>
        <Text style={{paddingTop: '35%', color: 'white', fontSize: 20}}>
          | Suvichar
        </Text>
        <Image
          source={{
            uri: 'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/Puja-Prasad-App/HomePage/KrishnaBlack.png',
          }}
          style={{height: 81, width: 77}}
        />
      </TouchableOpacity>
      <Image
        source={{
          uri: 'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/Puja-Prasad-App/HomePage/flower123.png',
        }}
        style={{
          height: 170,
          width: '100%',
          position: 'absolute',
          bottom: 150, // Position at the bottom
          left: 0, // Align to the left
          right: 0, // Align to the right
        }}
        resizeMode="contain" // Keep aspect ratio
      />
    </View>
  );
}

export default Explore