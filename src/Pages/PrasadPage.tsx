import { View, Text, TextInput,Image,StyleSheet } from 'react-native'
import React from 'react'
import PrasadNavbar from '../Component/PrasadNavbar'
import Icon from 'react-native-vector-icons/MaterialIcons';
import Iconn from 'react-native-vector-icons/FontAwesome5';
import PrasadBox from '../widgets/PrasadBox';
import {useNavigation, NavigationProp} from '@react-navigation/native';

type StackParamList = {
  Cart: undefined;
};

const PrasadPage = () => {
  const navigation = useNavigation<NavigationProp<StackParamList>>(); 
            const handleClick = () => {
              navigation.navigate('Cart'); // Navigate to PreviewPuja screen
            };
  return (
    <View style={{paddingHorizontal: 15}}>
      <PrasadNavbar />
      <View
        style={{
          flexDirection: 'row',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: '5%',
          paddingHorizontal: 15,
        }}>
        <View style={styles.searchContainer}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon
              name="search"
              size={24}
              color="#FF8901"
              style={styles.searchIcon}
            />
            <TextInput
              style={styles.searchInput}
              placeholder="Search for Temple Name"
              placeholderTextColor="#666"
            />
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{fontSize: 20}}>|</Text>
            <Image
              source={{
                uri: 'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/Puja-Prasad-App/Puja/kalash.png',
              }}
              style={styles.rightIcon}
            />
          </View>
        </View>
        <View
          style={{
            borderWidth: 1,
            padding: 10,
            borderRadius: 10,
            marginLeft: 10,
          }}>
          <Iconn name="shopping-cart" size={24} color="#000" onPress={handleClick}/>
        </View>
      </View>
      <View><PrasadBox/></View>
    </View>
  );
}

export default PrasadPage

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    display:'flex'
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.4)',
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    width: '90%',
    height: 50,
    // marginTop: 20,
  },
  searchIcon: {
    marginRight: 5,
  },
  searchInput: {
    fontSize: 16,
    color: '#000',
  },
  rightIcon: {
    width: 24,
    height: 24,
  },
})