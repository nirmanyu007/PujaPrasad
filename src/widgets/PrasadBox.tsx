import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation, NavigationProp} from '@react-navigation/native';

type PrasadBoxProps = {
  name: string;
  price: string;
  imageUri: string;
  onPress: () => void;
};

const PrasadBox: React.FC<PrasadBoxProps> = ({
  name,
  price,
  imageUri,
  onPress,
}) => {
  return (
    <View style={styles.cardContainer}>
      <Image source={{uri: imageUri}} style={styles.mainImage} />
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.priceText}>Starting from {price}</Text>

      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>Get Prasad</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginVertical: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
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
    paddingLeft: '4%',
  },
  priceText: {
    fontSize: 14,
    fontWeight: 'bold',
    paddingLeft: '4%',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#28A745',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 10,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PrasadBox;
