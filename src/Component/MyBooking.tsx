import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import PujaBooking from './PujaBooking';
import PrasadBooking from './PrasadBooking';

const MyBooking = () => {
  const [activeTab, setActiveTab] = useState<'puja' | 'prasad'>('puja');

  const renderContent = () => {
    if (activeTab === 'puja') {
      return <PujaBooking />;
    }
    if (activeTab === 'prasad') {
      return <PrasadBooking />;
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.header}>My Bookings</Text>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'puja' && styles.activeTab, // Highlight active tab
          ]}
          onPress={() => setActiveTab('puja')}>
          <Image
            source={{
              uri: 'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/Puja-Prasad-App/HomePage/puja.png', // Replace with your image URL
            }}
            style={[
              styles.tabImage,
              activeTab === 'puja' && styles.activeTabImage,
            ]}
          />
          <Text
            style={[
              styles.tabText,
              activeTab === 'puja' && styles.activeTabText,
            ]}>
            Puja Booking
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'prasad' && styles.activeTab, // Highlight active tab
          ]}
          onPress={() => setActiveTab('prasad')}>
          <Image
            source={{
              uri: 'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/Puja-Prasad-App/HomePage/laddoo.png', // Replace with your image URL
            }}
            style={[
              styles.tabImage,
              activeTab === 'prasad' && styles.activeTabImage,
            ]}
          />
          <Text
            style={[
              styles.tabText,
              activeTab === 'prasad' && styles.activeTabText,
            ]}>
            Prasad Booking
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <View style={styles.content}>{renderContent()}</View>
    </View>
  );
};

export default MyBooking;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20,
    color: '#000',
  },
  tabContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
  },
  activeTab: {
    borderBottomWidth: 3,
    borderBottomColor: '#FF5704',
  },
  tabImage: {
    width: 30,
    height: 30,
    marginBottom: 5, // Add some spacing between the image and text
  },
  activeTabImage: {
    tintColor: '#FF5704', // Highlight active tab image
  },
  tabText: {
    fontSize: 16,
    color: '#666',
  },
  activeTabText: {
    color: '#FF5704',
    fontWeight: '600',
  },
  content: {
    flex: 1,
    marginTop: 20,
  },
});
