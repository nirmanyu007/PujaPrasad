import React from 'react';
import {View, Text, TextInput, Image, StyleSheet, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PrasadNavbar from '../Component/PrasadNavbar';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Iconn from 'react-native-vector-icons/FontAwesome5';
import PrasadBox from '../widgets/PrasadBox';
import {useNavigation, NavigationProp} from '@react-navigation/native';

type StackParamList = {
  Cart: undefined;
  SelectPrasadPackage: {imageUri: string; templeName: string};
};

const PrasadPage = () => {
  const navigation = useNavigation<NavigationProp<StackParamList>>();

  const handleClick = () => {
    navigation.navigate('Cart'); // Navigate to Cart screen
  };

  const prasadData = [
    {
      id: '1',
      name: 'Kashi Vishwanath Temple Prasad',
      price: '₹501/-',
      imageUri:
        'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/Puja-Prasad-App/Puja/kashi_prasad.png',
    },
    {
      id: '2',
      name: 'Vaishno Devi Temple Prasad',
      price: '₹651/-',
      imageUri:
        'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/Puja-Prasad-App/Puja/vaishno_prasad.png',
    },
  ];

  const storeData = async (name: string, imageUri: string) => {
    try {
      const prasad = {name, imageUri};
      await AsyncStorage.setItem('selectedPrasad', JSON.stringify(prasad));
      // Alert.alert('Success', 'Prasad saved to local storage!');
    } catch (error) {
      console.error('Error saving data', error);
      // Alert.alert('Error', 'Failed to save Prasad to local storage.');
    }
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
          <Iconn
            name="shopping-cart"
            size={24}
            color="#000"
            onPress={handleClick}
          />
        </View>
      </View>
      <View>
        {prasadData.map(prasad => (
          <PrasadBox
            key={prasad.id}
            name={prasad.name}
            price={prasad.price}
            imageUri={prasad.imageUri}
            onPress={() => {
              storeData(prasad.name, prasad.imageUri); // Store data to local storage
              navigation.navigate('SelectPrasadPackage', {
                imageUri: prasad.imageUri,
                templeName: prasad.name,
              });
            }}
          />
        ))}
      </View>
    </View>
  );
};

export default PrasadPage;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    display: 'flex',
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
});
