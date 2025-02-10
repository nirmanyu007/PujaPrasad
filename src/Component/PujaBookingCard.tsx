import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface PujaBookingCardProps {
  poojaName: string;
  totalPrice: number;
  mandirName: string;
  state: string;
  poojaDate: string;
  packageType: string;
  completed: boolean;
  pujatime:string;
}



const PujaBookingCard: React.FC<PujaBookingCardProps> = ({
  poojaName,
  totalPrice,
  mandirName,
  state,
  poojaDate,
  packageType,
  completed,
  pujatime,
}) => {
  console.log('Puja Time:',pujatime);

  return (
    <LinearGradient colors={['#FFFFFF', '#FFF4E6']} style={styles.container}>
      {/* {pujaData.map((puja, index) => ( */}
      <View>
        {/* Status Section */}
        <View style={styles.statusContainer}>
          <View style={styles.statusIcon}>
            {/* <Image source={{uri: puja.iconUri}} style={styles.iconImage} /> */}
          </View>
          <View style={styles.statusTextContainer}>
            {/* <Text style={styles.statusText}>{puja.status}</Text>
              <Text style={styles.statusSubText}>{puja.statusSubText}</Text> */}
            {completed ? (
              <Text style={{color: '#1AA11F', fontSize: 14, fontWeight: '600'}}>
                Completed
              </Text>
            ) : (
              <Text style={{color: '#1AA11F', fontSize: 14, fontWeight: '600'}}>
                In Process
              </Text>
            )}
            <Text style={styles.statusSubText}>
              Pooja scheduled on ,(IST {pujatime})
            </Text>
          </View>
        </View>

        {/* Puja Details Section */}
        <View style={styles.detailsContainer}>
          <Text style={styles.pujaTitle}>{poojaName}</Text>
          {/* <Text style={styles.pujaDescription}>{puja.pujaDescription}</Text> */}
          <View
            style={{
              borderWidth: 1,
              borderColor: '#E1E0E0',
              marginBottom: 10,
            }}></View>
          <Text style={styles.detailRow}>
            <Text style={styles.detailLabel}>Package:</Text>{' '}
            <Text style={styles.detailValue}>{packageType}</Text>
          </Text>
          <View
            style={{
              borderWidth: 1,
              borderColor: '#E1E0E0',
              marginBottom: 10,
            }}></View>
          <Text style={styles.detailRow}>
            <Text style={styles.detailLabel}>Date & Day of Puja:</Text>{' '}
            <Text style={styles.detailValue}>{poojaDate}</Text>
          </Text>
          <View
            style={{
              borderWidth: 1,
              borderColor: '#E1E0E0',
              marginBottom: 10,
            }}></View>
          <Text style={styles.detailRow}>
            <Text style={styles.detailLabel}>Temple:</Text>{' '}
            <Text style={styles.detailValue}>
              {mandirName}, {state}
            </Text>
          </Text>
          <View
            style={{
              borderWidth: 1,
              borderColor: '#E1E0E0',
              borderStyle: 'dotted', // ✅ Makes the border dotted
              marginBottom: 10,
            }}></View>
        </View>

        {/* Pricing and Action Section */}
        <View style={styles.actionContainer}>
          <Text style={styles.priceText}>₹{totalPrice}/-</Text>
          <TouchableOpacity style={styles.trackButton}>
            <Text style={styles.trackButtonText}>Track Prasad</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* ))} */}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    // shadowColor: '#000',
    // shadowOpacity: 0.1,
    // shadowOffset: {width: 0, height: 4},
    // shadowRadius: 4,
    // elevation: 4,
    borderColor: 'rgba(0,0,0,0.3)',
    borderWidth: 1,
    marginBottom: 15,
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
    color: 'rgba(0,0,0,0.6)',
    fontSize: 14,
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

export default PujaBookingCard;
