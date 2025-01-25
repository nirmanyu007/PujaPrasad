import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const MandirPuja = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.headerText}>
        🌼 BOOK ONLINE PUJA IN 🌼{'\n'}
        <Text style={styles.headerSubText}>Baijnath Temple</Text>
      </Text>

      {/* Puja Card */}
      <View style={styles.card}>
        {/* Top Section */}
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: 'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/Puja-Prasad-App/Puja/pujaBack.png', // Replace with actual image URL
            }}
            style={styles.image}
          />
          <Text style={styles.badge}>BHOG</Text>
        </View>

        {/* Middle Section */}
        <View style={styles.detailsContainer}>
          <Text style={styles.pujaName}>Bhog</Text>
          <Text style={styles.pujaDescription}>Health & Well Being</Text>
          <View style={styles.locationContainer}>
            <Icon name="location-on" size={18} color="#FF8901" />
            <Text style={styles.locationText}>
              Kashi Vishwanath Temple, Varanasi,{'\n'}Uttar Pradesh, India
            </Text>
          </View>
          <View style={styles.dateContainer}>
            <Icon name="event" size={18} color="#FF8901" />
            <Text style={styles.dateText}>17 December, Tuesday</Text>
          </View>
        </View>

        {/* Bottom Section */}
        <View style={styles.footer}>
          <Text style={styles.price}>*Starting from ₹ 850/-</Text>
          <TouchableOpacity style={styles.bookButton}>
            <Text style={styles.bookButtonText}>Book Puja →</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#0A6B81',
  },
  headerText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  headerSubText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  card: {
    marginTop: 20,
    backgroundColor: '#FFF',
    borderRadius: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 5,
    overflow: 'hidden',
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 180,
  },
  badge: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: '#FF8901',
    color: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    fontSize: 12,
    fontWeight: 'bold',
  },
  detailsContainer: {
    padding: 15,
  },
  pujaName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  pujaDescription: {
    fontSize: 14,
    color: '#666',
    marginVertical: 5,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  locationText: {
    fontSize: 14,
    color: '#333',
    marginLeft: 5,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  dateText: {
    fontSize: 14,
    color: '#333',
    marginLeft: 5,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF7EB',
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#EEE',
  },
  price: {
    fontSize: 14,
    color: '#FF8901',
    fontWeight: 'bold',
  },
  bookButton: {
    backgroundColor: '#FF8901',
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 15,
  },
  bookButtonText: {
    fontSize: 14,
    color: '#FFF',
    fontWeight: 'bold',
  },
});

export default MandirPuja;
