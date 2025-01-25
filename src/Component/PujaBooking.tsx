import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';

const PujaBooking = () => {
  return (
    <View style={styles.container}>
      {/* Status Section */}
      <View style={styles.statusContainer}>
        <View style={styles.statusIcon}>
          <Image
            source={{
              uri: 'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/Puja-Prasad-App/Icons/puja.png', // Replace with appropriate icon
            }}
            style={styles.iconImage}
          />
        </View>
        <View style={styles.statusTextContainer}>
          <Text style={styles.statusText}>In Process</Text>
          <Text style={styles.statusSubText}>
            Puja will perform on 1 January 2024, (IST 08:00 AM)
          </Text>
        </View>
      </View>

      {/* Puja Details Section */}
      <View style={styles.detailsContainer}>
        <Text style={styles.pujaTitle}>
          Mahamrityunjaya Jaap and Rudrabhishek 11 Shashtri
        </Text>
        <Text style={styles.pujaDescription}>
          The Mahamrityunjay Jaap offers protection from negative forces,
          untimely death, and aids in healing and recovery from illnesses.
        </Text>
        <Text style={styles.detailRow}>
          <Text style={styles.detailLabel}>Package:</Text>{' '}
          <Text style={styles.detailValue}>Individual</Text>
        </Text>
        <Text style={styles.detailRow}>
          <Text style={styles.detailLabel}>Date & Day of Puja:</Text>{' '}
          <Text style={styles.detailValue}>20 Jan, 2025, Tuesday</Text>
        </Text>
        <Text style={styles.detailRow}>
          <Text style={styles.detailLabel}>Temple:</Text>{' '}
          <Text style={styles.detailValue}>
            Kashi Vishwanath Temple, Varanasi, Uttar Pradesh, India
          </Text>
        </Text>
      </View>

      {/* Pricing and Action Section */}
      <View style={styles.actionContainer}>
        <Text style={styles.priceText}>₹850/-</Text>
        <TouchableOpacity style={styles.trackButton}>
          <Text style={styles.trackButtonText}>Track Prasad</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    // margin: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 4},
    shadowRadius: 4,
    elevation: 4,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  statusIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFEDD5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconImage: {
    width: 25,
    height: 25,
  },
  statusTextContainer: {
    marginLeft: 10,
  },
  statusText: {
    color: '#1AA11F',
    fontWeight: '700',
    fontSize: 14,
  },
  statusSubText: {
    color: '#666',
    fontSize: 11,
    marginTop: 2,
  },
  detailsContainer: {
    marginBottom: 15,
  },
  pujaTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
    marginBottom: 5,
  },
  pujaDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  detailRow: {
    fontSize: 14,
    marginBottom: 5,
  },
  detailLabel: {
    fontWeight: '600',
    color: '#000',
  },
  detailValue: {
    color: '#FF5704',
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#002776',
  },
  trackButton: {
    backgroundColor: '#E7F4EA',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  trackButtonText: {
    color: '#00A944',
    fontSize: 14,
    fontWeight: '700',
  },
});

export default PujaBooking;
