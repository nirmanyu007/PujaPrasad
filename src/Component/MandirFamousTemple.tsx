import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import Icon from 'react-native-vector-icons/MaterialIcons';

const MandirFamousTemple = () => {
  const data = [
    {
      id: 1,
      title: 'Baijnath Temple',
      location: 'Baijnath, Himachal Pradesh',
      image: 'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/Puja-Prasad-App/Mandir/baijnath.png',
    },
    {
      id: 2,
      title: 'Kashi Vishwanath Temple',
      location: 'Varanasi, Uttar Pradesh',
      image: 'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/Puja-Prasad-App/Mandir/kashi.png',
    },
    {
      id: 3,
      title: 'Meenakshi Temple',
      location: 'Madurai, Tamil Nadu',
      image: 'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/Puja-Prasad-App/Mandir/meenakshi.png',
    },
  ];

  const renderItem = ({ item, index }: { item: typeof data[0]; index: number }) => (
    <View style={styles.card} key={index}>
      <Image source={{ uri: item.image }} style={styles.cardImage} />
      <TouchableOpacity style={styles.externalLink}>
        <Icon name="open-in-new" size={20} color="#fff" />
      </TouchableOpacity>
      <View style={styles.overlay}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <View style={styles.locationContainer}>
          <Icon name="location-on" size={16} color="#fff" />
          <Text style={styles.locationText}>{item.location}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.header}>
        Discover Sacred Sites Beyond Borders{'\n'}
        <Text style={styles.subHeader}>Most Famous Temple</Text>
      </Text>

      {/* Carousel */}
      <Carousel
        data={data}
        renderItem={renderItem}
        sliderWidth={300}
        itemWidth={280}
        loop={true}
        autoplay={true}
        autoplayDelay={3000}
        autoplayInterval={5000}
        inactiveSlideScale={0.95}
        inactiveSlideOpacity={0.7}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3D2A8',
    padding: 20,
  },
  header: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 20,
  },
  subHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF8901',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 3,
    position: 'relative',
  },
  cardImage: {
    width: '100%',
    height: 180,
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 10,
  },
  cardTitle: {
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
    borderRadius: 15,
    padding: 5,
  },
});

export default MandirFamousTemple;
