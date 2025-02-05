import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import Antdesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {DrawerParamList} from '../../App';

type HomeNavBarProps = {
  title: string;
};

const HomeNavBar: React.FC<HomeNavBarProps> = ({title}) => {
  const navigation = useNavigation<DrawerNavigationProp<DrawerParamList>>();

  return (
    <View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
        }}>
        {/* Bars Icon to Open Drawer */}
        <TouchableOpacity
          style={{
            backgroundColor: 'white',
            borderRadius: 1000,
            padding: 5,
            shadowColor: 'rgba(0, 0, 0, 0.25)', // Color of the shadow
            shadowOffset: {width: 0, height: 0}, // Horizontal and vertical offset
            shadowOpacity: 1, // Opacity of the shadow
            shadowRadius: 4, // Blur radius
            elevation: 4, // For Android
          }}
          onPress={() => navigation.openDrawer()} // Open drawer on press
        >
          <Antdesign name="bars" size={30} color="#666161" />
        </TouchableOpacity>

        {/* Center Text and Image */}
        <View style={{display: 'flex', alignItems: 'center'}}>
          <Text style={{color: 'white', fontSize: 20, fontWeight: '600'}}>
            जय श्री राम
          </Text>
          <Image
            source={{
              uri: 'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/Puja-Prasad-App/HomePage/barwhite.png',
            }}
            style={{width: 150, height: 10}}
          />
        </View>

        {/* Bell Icon */}
        <View
          style={{
            backgroundColor: 'white',
            borderRadius: 1000,
            padding: 5,
            shadowColor: 'rgba(0, 0, 0, 0.25)', // Color of the shadow
            shadowOffset: {width: 0, height: 0}, // Horizontal and vertical offset
            shadowOpacity: 1, // Opacity of the shadow
            shadowRadius: 4, // Blur radius
            elevation: 4, // For Android
          }}>
          <Image
            source={{
              uri: 'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/Puja-Prasad-App/HomePage/Bell.png',
            }}
            style={{
              width: 25, // Adjust width
              height: 25, // Adjust height
              resizeMode: 'contain', // Optional, keeps aspect ratio
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default HomeNavBar;
