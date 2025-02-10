import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface PrasadBookingCardProps {
  mandirName: string;
  packageName: string;
  prasadPrice: number;
  prasadCount: number;
  statusDate: string;
  mandirImage: string;
}

const prasadData = [
  {
    status: 'In Process',
    statusSubText: 'Prasad will deliver on 1 January 2024, (IST 08:00 AM)',
    prasadTitle: 'Kashi Vishwanath Prasadam',
    temple: 'Kashi Vishwanath Temple, Varanasi, Uttar Pradesh, India',
    quantity: 1,
    price: '₹850/-',
    iconUri:
      'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/Puja-Prasad-App/Icons/puja.png',
  },
];

const PrasadBookingCard: React.FC<PrasadBookingCardProps> = ({
  mandirName,
  packageName,
  prasadPrice,
  prasadCount,
  statusDate,
  mandirImage,
}) => {
  return (
    <LinearGradient colors={['#FFFFFF', '#FFF4E6']} style={styles.container}>
      <View >
        {/* Status Section */}
        <View style={styles.statusContainer}>
          <View style={styles.statusIcon}>
            {/* <Image source={{uri: prasad.iconUri}} style={styles.iconImage} /> */}
          </View>
          <View style={styles.statusTextContainer}>
            <Text style={styles.statusText}>In Process</Text>
            <Text style={styles.statusSubText}>
              Prasad will be delivered on {statusDate}
            </Text>
          </View>
        </View>
        {/* Prasad Details Section */}
        <View style={styles.detailsContainer}>
          <Text style={styles.prasadTitle}>{packageName}</Text>
          <Text style={styles.detailRow}>
            <Text style={styles.detailLabel}>Temple:</Text>{' '}
            <Text style={styles.detailValue}>{mandirName}</Text>
          </Text>
          <Text style={styles.detailRow}>
            <Text style={styles.detailLabel}>Quantity:</Text>{' '}
            <Text style={styles.detailValue}>{prasadCount}</Text>
          </Text>
        </View>
        {/* Pricing and Action Section */}
        <View style={styles.actionContainer}>
          <Text style={styles.priceText}>₹{prasadPrice}/-</Text>
          <TouchableOpacity style={styles.trackButton}>
            <Text style={styles.trackButtonText}>Track Prasad</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    shadowColor: '#000',
    borderColor: 'rgba(0,0,0,0.3)',
    borderWidth: 1,
    marginBottom: 15,
    // shadowOpacity: 0.1,
    // shadowOffset: {width: 0, height: 4},
    // shadowRadius: 4,
    // elevation: 4,
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
  prasadTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
    marginBottom: 5,
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

export default PrasadBookingCard;
