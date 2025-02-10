import {
  View,
  Text,
  Alert,
  ActivityIndicator,
  StyleSheet,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import PrasadBookingCard from './PrasadBookingCArd';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

// ✅ Define PrasadDelivery Type
interface PrasadDelivery {
  mandirName: string;
  packageName: string;
  prasadPrice: number;
  prasadCount: number;
  statusDate: string;
  mandirImage: string;
}

// ✅ Define PrasadBooking Type
interface PrasadBooking {
  _id: string;
  prasadDeliveries: PrasadDelivery[];
}

const PrasadBooking = () => {
  // ✅ Fix: Define useState type
  const [bookings, setBookings] = useState<PrasadBooking[]>([]);
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

        // ✅ Fix: Explicitly type the API response
        const response = await axios.get<{prasadBookings: PrasadBooking[]}>(
          `http://192.168.1.30:5001/fetch-booked-prasad-by-user-id/${userId}`,
        );

        console.log(response.data);

        if (response.data && Array.isArray(response.data.prasadBookings)) {
          setBookings(response.data.prasadBookings);
        } else {
          setBookings([]); // ✅ Ensure bookings is set correctly
        }
      } catch (error) {
        console.error('Error fetching prasad bookings:', error);
        Alert.alert('Error', 'Failed to fetch prasad bookings.');
        setBookings([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  // ✅ Show Loading Indicator
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  // ✅ Show "No Prasad booked" message when bookings are empty
  if (!bookings.length) {
    return (
      <View style={styles.noBookingsContainer}>
        <Text style={styles.noBookingsText}>No Prasad booked.</Text>
      </View>
    );
  }

  return (
    <View>
      <FlatList
        data={bookings}
        keyExtractor={item => item._id} // ✅ TypeScript will now recognize _id
        renderItem={({item}) => (
          // ✅ FIX: Wrap .map() inside a View or Fragment to return a single JSX element
          <View>
            {item.prasadDeliveries.map(
              (prasad: PrasadDelivery, index: number) => (
                <PrasadBookingCard
                  key={`${item._id}-${index}`}
                  mandirName={prasad.mandirName}
                  packageName={prasad.packageName}
                  prasadPrice={prasad.prasadPrice}
                  prasadCount={prasad.prasadCount}
                  statusDate={prasad.statusDate}
                  mandirImage={prasad.mandirImage}
                />
              ),
            )}
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
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

export default PrasadBooking;
