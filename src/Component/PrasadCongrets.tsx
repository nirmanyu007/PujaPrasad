import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

type RootStackParamList = {
//   Address: undefined;
  TabNavigator: undefined;
  PrasadBooking: undefined;
};

const PrasadCongrets = () => {
     const navigation =
          useNavigation<NativeStackNavigationProp<RootStackParamList>>();
          const handleClick = () => {
            navigation.navigate('TabNavigator'); // Navigate to Cart screen
          };
          const handleClick2 = () => {
            navigation.navigate('PrasadBooking'); // Navigate to Cart screen
          };
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{fontSize: 22, fontWeight: '700'}}>Congratulations</Text>
      <Text>Your Prasad Has Been Booked</Text>
      <TouchableOpacity
        onPress={handleClick}
        style={{borderWidth: 1, borderColor: 'black', width: '90%'}}>
        <Text>HomePage</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleClick2}
        style={{borderWidth: 1, borderColor: 'black', width: '90%'}}>
        <Text>See Your Order</Text>
      </TouchableOpacity>
    </View>
  );
}

export default PrasadCongrets