import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation, NavigationProp} from '@react-navigation/native';

type StackParamList = {
  PujaDetail: undefined;
  SelectPrasadPackage: undefined; // Define any params if required, e.g., { id: number }
};

const PrasadBox: React.FC = () => {
  const navigation = useNavigation<NavigationProp<StackParamList>>();
  const handleSelectPackage = () => {
    navigation.navigate('SelectPrasadPackage'); // Navigate to PreviewPuja screen
  };
  return (
    <View style={styles.cardContainer}>
      <Image
        source={{
          uri: 'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/Puja-Prasad-App/Puja/kashi_prasad.png',
        }} // Replace with actual image of Kashi ghat
        style={styles.mainImage}
      />
      <Text style={styles.name}>Kashi Vishwanath Temple Prasad</Text>
      <Text style={styles.priceText}>Starting from ₹501/-</Text>

      <TouchableOpacity style={styles.button} onPress={handleSelectPackage}>
        <Text style={styles.buttonText}>Get Prasad</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    // padding: 16,
    margin: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 8,
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  mainImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginBottom: 16,
  },
  name: {
    color: '#F55E00',
    fontWeight: 'bold',
    fontSize: 18,
    paddingLeft:'4%'
  },
  priceText: {
    fontSize: 14,
    // color: '#FF5733',
    fontWeight: 'bold',
    paddingLeft:'4%',
    marginBottom: 16,

  },
  button: {
    backgroundColor: '#28A745',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 10,
    marginBottom:10
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PrasadBox;
