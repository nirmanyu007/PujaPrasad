import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

const MyAccount = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity>
            <Text style={styles.backButton}>{'<'}</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>My Account</Text>
        </View>
        <TouchableOpacity>
          <Text style={styles.editButton}>Edit</Text>
        </TouchableOpacity>
      </View>

      {/* User Info */}
      <View style={styles.userCard}>
        <Image
          source={{
            uri: 'https://via.placeholder.com/80', // Replace with user image URL
          }}
          style={styles.userImage}
        />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>Hello, Ved Prakash</Text>
          <Text style={styles.userSubtitle}>My Puja Booking</Text>
        </View>
        <TouchableOpacity style={styles.dropdownButton}>
          <Text style={styles.dropdownArrow}>⌄</Text>
        </TouchableOpacity>
      </View>

      {/* My Puja Booking Section */}
      <View style={styles.bookingSection}>
        <Text style={styles.sectionTitle}>My Puja Booking</Text>

        {/* Booking Card */}
        <View style={styles.bookingCard}>
          {/* Status */}
          <View style={styles.bookingStatus}>
            <View style={styles.statusIcon}>
              <Image
                source={{
                  uri: 'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/Puja-Prasad-App/Icons/puja.png',
                }}
                style={styles.statusImage}
              />
            </View>
            <View>
              <Text style={styles.statusText}>In Process</Text>
              <Text style={styles.statusSubText}>
                Puja will perform on 1 January 2024, (IST 08:00 AM)
              </Text>
            </View>
            <TouchableOpacity style={styles.trackButton}>
              <Text style={styles.trackButtonText}>Track Prasad</Text>
            </TouchableOpacity>
          </View>

          {/* Booking Details */}
          <View style={styles.bookingDetails}>
            <Image
              source={{
                uri: 'https://via.placeholder.com/80', // Replace with Puja image
              }}
              style={styles.pujaImage}
            />
            <View style={styles.bookingInfo}>
              <Text style={styles.pujaTitle}>Rudrabhishek (5 Shastri)</Text>
              <Text style={styles.detailText}>
                Temple Name:{' '}
                <Text style={styles.highlightText}>
                  Kashi Vishwanath, Kashi (Uttar Pradesh)
                </Text>
              </Text>
              <Text style={styles.detailText}>
                Package: <Text style={styles.highlightText}>Single</Text>
              </Text>
            </View>
          </View>

          {/* Price */}
          <Text style={styles.priceText}>₹490/-</Text>
        </View>

        {/* Puja Status */}
        <View style={styles.pujaStatus}>
          <Text style={styles.statusTitle}>Puja Status</Text>
          <View style={styles.statusRow}>
            <View style={styles.statusDotActive} />
            <Text style={styles.statusTextDetail}>Puja Booked</Text>
            <Text style={styles.statusDate}>12 Sep, 2024</Text>
          </View>
          <View style={styles.statusRow}>
            <View style={styles.statusDotActive} />
            <Text style={styles.statusTextDetail}>Puja Started</Text>
            <Text style={styles.statusDate}>12 Sep, 2024</Text>
          </View>
          <View style={styles.statusRow}>
            <View style={styles.statusDotActive} />
            <Text style={styles.statusTextDetail}>Puja Completed</Text>
            <Text style={styles.statusDate}>12 Sep, 2024</Text>
          </View>
          <View style={styles.statusRow}>
            <View style={styles.statusDotInactive} />
            <Text style={styles.statusTextDetail}>
              Picture & Video Received On WhatsApp
            </Text>
            <Text style={styles.statusDate}>12 Sep, 2024</Text>
          </View>
        </View>

        {/* See Full Details */}
        <TouchableOpacity>
          <Text style={styles.fullDetailsText}>See Full Details</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    alignItems: 'center',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    fontSize: 20,
    color: '#000',
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  editButton: {
    fontSize: 16,
    color: '#FF5704',
  },
  userCard: {
    backgroundColor: '#FEE2C5',
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
  },
  userSubtitle: {
    fontSize: 14,
    color: '#000',
  },
  dropdownButton: {
    paddingHorizontal: 10,
  },
  dropdownArrow: {
    fontSize: 18,
    color: '#000',
  },
  bookingSection: {
    padding: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  bookingCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 4},
    shadowRadius: 4,
    elevation: 4,
  },
  bookingStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  statusIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFEDD5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  statusImage: {
    width: 25,
    height: 25,
  },
  statusText: {
    color: '#FF5704',
    fontWeight: '700',
  },
  statusSubText: {
    fontSize: 12,
    color: '#666',
  },
  trackButton: {
    backgroundColor: '#E7F4EA',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginLeft: 'auto',
  },
  trackButtonText: {
    color: '#00A944',
    fontSize: 12,
    fontWeight: '700',
  },
  bookingDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  pujaImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 15,
  },
  bookingInfo: {
    flex: 1,
  },
  pujaTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
  detailText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  highlightText: {
    color: '#FF5704',
  },
  priceText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#002776',
  },
  pujaStatus: {
    marginTop: 20,
  },
  statusTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  statusDotActive: {
    width: 10,
    height: 10,
    backgroundColor: '#00A944',
    borderRadius: 5,
    marginRight: 10,
  },
  statusDotInactive: {
    width: 10,
    height: 10,
    backgroundColor: '#CCC',
    borderRadius: 5,
    marginRight: 10,
  },
  statusTextDetail: {
    fontSize: 14,
    flex: 1,
  },
  statusDate: {
    fontSize: 12,
    color: '#666',
  },
  fullDetailsText: {
    color: '#FF5704',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'right',
  },
});

export default MyAccount;
