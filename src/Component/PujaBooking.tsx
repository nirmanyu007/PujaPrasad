import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import PujaBookingCard from './PujaBookingCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

interface Booking {
  _id: string;
  poojaname: string;
  totalPrice: number;
  mandirname: string;
  state?: string;
  poojadate: string;
  package: string;
  completed: boolean;
  poojatime: string;
}

const pujaData = [
  {
    status: 'In Process',
    statusSubText: 'Puja will perform on 1 January 2024, (IST 08:00 AM)',
    pujaTitle: 'Mahamrityunjaya Jaap and Rudrabhishek 11 Shashtri',
    pujaDescription:
      'The Mahamrityunjay Jaap offers protection from negative forces, untimely death, and aids in healing and recovery from illnesses.',
    packageType: 'Individual',
    pujaDate: '20 Jan, 2025, Tuesday',
    temple: 'Kashi Vishwanath Temple, Varanasi, Uttar Pradesh, India',
    price: '₹850/-',
    iconUri:
      'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/Puja-Prasad-App/Icons/puja.png',
  },
];

const PujaBooking = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const userDetails = await AsyncStorage.getItem('user');
        const parsedUser = userDetails ? JSON.parse(userDetails) : null;
        const userId = parsedUser?.userId;

        if (!userId) {
          Alert.alert('Error', 'User not found.');
          setLoading(false);
          return;
        }

        const response = await axios.get(
          `http://192.168.1.30:5001/fetch-booked-pooja-by-user-id/${userId}`,
        );
        console.log(response.data);

        if (response.data && Array.isArray(response.data.poojaBooked)) {
          setBookings(response.data.poojaBooked);
        } else {
          Alert.alert('Info', 'No Pooja bookings found.');
          setBookings([]);
        }
      } catch (error) {
        console.error('Error fetching pooja bookings:', error);
        Alert.alert('Error', 'Failed to fetch pooja bookings.');
        setBookings([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!bookings.length) {
    return (
      <View style={styles.noBookingsContainer}>
        <Text style={styles.noBookingsText}>No Pooja bookings found.</Text>
      </View>
    );
  }
  return (
    <View>
      <FlatList
        data={bookings}
        keyExtractor={item => item._id}
        renderItem={({item}) => {
          console.log('Booking ID:', item._id);
          console.log('Puja Time:', item.poojatime); // ✅ Correct field name

          return (
            <PujaBookingCard
              poojaName={item.poojaname}
              totalPrice={item.totalPrice}
              mandirName={item.mandirname}
              state={item.state || 'N/A'}
              poojaDate={item.poojadate}
              packageType={item.package}
              completed={item.completed}
              pujatime={item.poojatime ? item.poojatime : 'Not Available'} // ✅ Use `poojatime`
            />
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 4},
    shadowRadius: 4,
    elevation: 4,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noBookingsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noBookingsText: {
    fontSize: 16,
    color: 'gray',
  },
});

export default PujaBooking;
