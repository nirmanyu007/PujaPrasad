import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const MandirCard = () => {
  return (
    <TouchableOpacity style={styles.card}>
      {/* Image */}
      <Image
        source={{
          uri: 'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/Puja-Prasad-App/Puja/photo.png', // Replace with actual image URL
        }}
        style={styles.cardImage}
      />

      {/* Overlay Content */}
      <View style={styles.overlay}>
        <Text style={styles.title}>Baijnath Temple</Text>
        <View style={styles.locationContainer}>
          <Icon name="location-on" size={16} color="#fff" />
          <Text style={styles.locationText}>Baijnath, Himachal Pradesh</Text>
        </View>
      </View>

      {/* External Link Icon */}
      <TouchableOpacity style={styles.externalLink}>
        <Icon name="open-in-new" size={20} color="#fff" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 3,
    marginVertical: 10,
    position: 'relative',
  },
  cardImage: {
    width: '100%',
    height: 200,
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  locationText: {
    fontSize: 14,
    color: '#fff',
    marginLeft: 5,
  },
  externalLink: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 20,
    padding: 5,
  },
});

export default MandirCard;
