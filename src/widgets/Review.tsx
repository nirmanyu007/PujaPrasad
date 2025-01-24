import React, {useState} from 'react';
import {View, Text, Image, StyleSheet, Dimensions} from 'react-native';
import Carousel from 'react-native-snap-carousel';

const reviews = [
  {
    id: '1',
    name: 'Vijay Thakur',
    location: 'Uttar Pradesh',
    review: 'Thank You.. very much vedic vaibhav, for best puja experience.',
    stars: 5,
    image:
      'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/Puja-Prasad-App/Puja/number3.png',
  },
  {
    id: '2',
    name: 'Anjali Sharma',
    location: 'Maharashtra',
    review: 'Amazing puja arrangements. Truly divine experience!',
    stars: 4,
    image: 'https://via.placeholder.com/150',
  },
  {
    id: '3',
    name: 'Ravi Kumar',
    location: 'Karnataka',
    review: 'Well-organized puja services, highly recommended!',
    stars: 5,
    image: 'https://via.placeholder.com/150',
  },
];

const {width: screenWidth} = Dimensions.get('window');

const Review = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const renderStars = (stars: number) => {
    return (
      <View style={{flexDirection: 'row'}}>
        {[...Array(5)].map((_, index) => (
          <Text
            key={index}
            style={[styles.star, index < stars ? styles.activeStar : null]}>
            ★
          </Text>
        ))}
      </View>
    );
  };

  const renderItem = ({item}: {item: (typeof reviews)[0]}) => (
    <View style={styles.card}>
      <View style={{flexDirection: 'column',display:'flex',alignItems:'center',paddingRight:'3%'}}>
        <Image source={{uri: item.image}} style={styles.image} />
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.location}>{item.location}</Text>
      </View>
      <View style={styles.reviewContent}>
        <Text style={styles.reviewText}>{item.review}</Text>
        {renderStars(item.stars)}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Carousel
        data={reviews}
        renderItem={renderItem}
        sliderWidth={screenWidth}
        itemWidth={screenWidth }
        onSnapToItem={index => setActiveIndex(index)}
        vertical={false} // Ensure the carousel is horizontal
      />
      <View style={styles.pagination}>
        {reviews.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              index === activeIndex ? styles.activeDot : null,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    paddingVertical: 16,
    backgroundColor: '#F9F9F9',
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    margin:5,
    padding: 16,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 16,
  },
  reviewContent: {
    flex: 1,
    justifyContent: 'center',
  },
  reviewText: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#555',
    marginBottom: 8,
  },
  star: {
    fontSize: 16,
    color: '#CCC',
  },
  activeStar: {
    color: '#FD7109',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 8,
  },
  location: {
    fontSize: 14,
    color: '#888',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#CCC',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#FD7109',
  },
});

export default Review;
