import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CardBox = () => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('PujaDetail' as never); // TypeScript compatibility
  };

  return (
    <View style={styles.cardContainer}>
      {/* Top Section with Image */}
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: 'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/Puja-Prasad-App/Puja/rudra-min.png',
          }}
          style={styles.cardImage}
        />
      </View>

      {/* Text Content */}
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Rudrabhishek (5 Shastri)</Text>
        <Text style={styles.description}>
          The Mahamrityunjay Jaap offers protection from negative forces and
          aids in healing and recovery from...
        </Text>

        {/* Location Section */}
        <View style={styles.infoRow}>
          <Image
            source={{
              uri: 'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/Puja-Prasad-App/Puja/temple.png',
            }}
            style={styles.icon}
          />
          <Text style={styles.infoText}>
            Kashi Vishwanath Temple, Varanasi, Uttar Pradesh, India
          </Text>
        </View>

        {/* Date Section */}
        <View style={styles.infoRow}>
          <Image
            source={{
              uri: 'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/Puja-Prasad-App/Puja/date.png',
            }}
            style={styles.icon}
          />
          <Text style={styles.infoText}>17 December, Tuesday</Text>
        </View>

        {/* Footer Section */}
        <View style={styles.footer}>
          <Text style={styles.startingPrice}>*Starting from ₹850/-</Text>
          <TouchableOpacity style={styles.button} onPress={handlePress}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={styles.buttonText10}> |</Text>
              <Text style={styles.buttonText}> Book Puja</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 5, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOpacity: 0.2,
    shadowOffset: {width: 0, height: 2},

    shadowRadius: 5,
    alignSelf: 'stretch', // Ensures it stretches to fill parent width
    paddingHorizontal: 0, // No extra padding horizontally
  },
  imageContainer: {
    position: 'relative',
  },
  cardImage: {
    width: '100%',
    height: 180,
    objectFit: 'cover',
  },
  labelContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: '#FF6F00',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  labelText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  contentContainer: {
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F55E00',
    paddingTop: '2%',
  },
  description: {
    fontSize: 14,
    color: 'rgba(0,0,0,0.8)',
    fontStyle: 'italic',
    paddingTop: '1%',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  icon: {
    width: 25,
    height: 25,
    marginRight: 10,
  },
  infoText: {
    fontSize: 14,
    color: 'rgba(0,0,0,0.5)',
    flex: 1,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 15,
    backgroundColor: '#008732',
    borderRadius: 10,
    marginBottom: '5%',
  },
  startingPrice: {
    fontSize: 14,
    color: 'white',
    fontStyle: 'italic',
    fontWeight: 'bold',
    paddingLeft: 10,
  },
  button: {
    // backgroundColor: '#28a745',
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 3,
  },
  buttonText10: {
    fontSize: 32,
    color: 'white',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default CardBox;
