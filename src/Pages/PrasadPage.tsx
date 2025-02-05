import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PrasadNavbar from '../Component/PrasadNavbar';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Iconn from 'react-native-vector-icons/FontAwesome5';
import PrasadBox from '../widgets/PrasadBox';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import axios from 'axios';

type StackParamList = {
  Cart: undefined;
  SelectPrasadPackage: {
    imageUri: string;
    templeName: string;
    // description: string;
    prasadEntries: {price: number; description: string}[];
  }; // ✅ Add description here
};

const PrasadPage = () => {
  const [prasadBoxes, setPrasadBoxes] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigation = useNavigation<NavigationProp<StackParamList>>();

  const handleClick = () => {
    navigation.navigate('Cart'); // Navigate to Cart screen
  };

  useEffect(() => {
    const fetchPrasadBoxes = async () => {
      try {
        const response = await axios.get(
          `http://192.168.1.30:5001/fetch-active-mandirs`,
        );
        const data = response.data;
        console.log(data);

        // Assuming the API returns an array of mandirs and we filter those with prasad available
        const prasadMandirs = data.mandirs.filter(
          (mandir: any) => mandir.isPrasadAvailable,
        );
        setPrasadBoxes(prasadMandirs);
      } catch (error) {
        console.error('Error fetching prasad boxes:', error);
        // message.error('Failed to load mandirs. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPrasadBoxes();
  }, []);

  const storeData = async (name: string, imageUri: string) => {
    try {
      const prasad = {name, imageUri};
      await AsyncStorage.setItem('selectedPrasad', JSON.stringify(prasad));
      Alert.alert('Success', 'Prasad saved to local storage!');
    } catch (error) {
      console.error('Error saving data', error);
      Alert.alert('Error', 'Failed to save Prasad to local storage.');
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
        <ScrollView>
          {loading ? (
            <Text style={styles.loadingText}>Loading...</Text>
          ) : prasadBoxes.length > 0 ? (
            prasadBoxes.map((prasad: any) => (
              <PrasadBox
                key={prasad._id}
                name={prasad.nameEnglish}
                price={`₹${prasad.prasadPrice}/-`} // Use API Price
                imageUri={prasad.prasadCardImage || prasad.images[0]} // Fallback Image
                onPress={() => {
                  navigation.navigate('SelectPrasadPackage', {
                    imageUri: prasad.prasadCardImage || prasad.images[0], // Temple image
                    templeName: prasad.nameEnglish, // Temple Name
                    prasadEntries: prasad.prasadEntries, // Pass all prasad entries
                  });
                }}
              />
            ))
          ) : (
            <View style={styles.noDataContainer}>
              <Image
                source={{
                  uri: 'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/prashad-images/notemplefound.png',
                }}
                style={styles.noDataImage}
              />
              <Text style={styles.noDataText}>No Prasad Available</Text>
            </View>
          )}
        </ScrollView>
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
  loadingText: {
    textAlign: 'center',
    fontSize: 18,
    marginTop: 20,
  },
  noDataContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: '4%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    zIndex: 1000,
    position: 'relative',
  },
  noDataImage: {
    width: '50%',
    resizeMode: 'contain',
  },
  noDataText: {
    fontSize: 16,
    marginTop: 10,
    color: '#888',
  },
});
