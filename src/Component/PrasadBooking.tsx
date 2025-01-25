import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';

const PrasadBooking = () => {
  return (
    <View style={styles.container}>
      {/* Status Section */}
      <View style={styles.statusContainer}>
        <Image
          source={{uri: 'https://example.com/prasad-icon.png'}} // Replace with your icon URL
          style={styles.statusIcon}
        />
        <View>
          <Text style={styles.statusText}>In Process</Text>
          <Text style={styles.deliveryText}>
            Prasad will deliver on 1 January 2024, (IST 08:00 AM)
          </Text>
        </View>
      </View>

      {/* Card Content */}
      <View style={styles.card}>
        {/* Temple Details */}
        <Text style={styles.templeName}>Kashi Vishwanath Prasadam</Text>
        <View style={styles.locationContainer}>
          <Image
            source={{
              uri: 'https://example.com/temple-icon.png', // Replace with your icon URL
            }}
            style={styles.locationIcon}
          />
          <Text style={styles.locationText}>
            Kashi Vishwanath Temple, Varanasi, Uttar Pradesh, India
          </Text>
        </View>

        {/* Quantity and Price Section */}
        <View style={styles.detailsContainer}>
          <Text style={styles.quantityText}>Quantity: 1</Text>
          <Text style={styles.priceText}>₹850/-</Text>
        </View>

        {/* Track Button */}
        <TouchableOpacity style={styles.trackButton}>
          <Text style={styles.trackButtonText}>Track Prasad</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  statusContainer: {
    marginBottom: 16,
    padding: 10,
    backgroundColor: '#eaf7e9',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusIcon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  statusText: {
    color: '#2b8a3e',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
  },
  deliveryText: {
    fontSize: 14,
    color: '#333',
    marginLeft: 10,
    flex: 1,
    flexWrap: 'wrap',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  templeName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  locationIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  locationText: {
    fontSize: 14,
    color: '#666',
    flexWrap: 'wrap',
    flex: 1,
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  quantityText: {
    fontSize: 14,
    color: '#666',
  },
  priceText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  trackButton: {
    backgroundColor: '#2b8a3e',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  trackButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PrasadBooking;
