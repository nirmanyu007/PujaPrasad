import React, {useEffect} from 'react';
import {View, Text, Image} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useNavigation, NavigationProp} from '@react-navigation/native';
// import {NavigationProp} from '@react-navigation/native-stack';

type RootStackParamList = {
  TabNavigator: undefined;
};

const Congratulation = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useEffect(() => {
    const timer = setTimeout(() => {
      // Navigate back to TabNavigator after 3 seconds
      navigation.navigate('TabNavigator');
    }, 5000);

    // Clear the timer when the component unmounts
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View
      style={{
        display: 'flex',
        alignItems: 'center',
        paddingTop: '25%',
        width: '100%',
      }}>
      <Image
        source={{
          uri: 'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/Puja-Prasad-App/HomePage/congooo.png',
        }}
        style={{height: 74, width: 245}}
      />
      <FastImage
        source={{
          uri: 'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/Puja-Prasad-App/HomePage/congo.gif',
        }}
        style={{width: 330, height: 190, marginBottom: 16}}
        resizeMode={FastImage.resizeMode.contain}
      />
      <Text style={{fontSize: 14, paddingTop: '1%', color: 'black'}}>
        Your request has been sent to Mandir.
      </Text>
      <Text
        style={{
          fontSize: 12,
          fontWeight: '700',
          paddingTop: '5%',
          textAlign: 'center',
          color: 'black',
          width: '75%',
        }}>
        We will notify you shortly once the Mandir confirms your booking. Thank
        you for your patience!
      </Text>
    </View>
  );
};

export default Congratulation;
