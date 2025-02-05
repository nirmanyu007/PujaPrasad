import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

interface StarRatingProps {
  rating: number; // Rating out of 5
  starImage: string;
}

const StarRating: React.FC<StarRatingProps> = ({rating, starImage}) => {
  // Determine the number of stars to show
  const totalStars = rating >= 4 ? 5 : Math.ceil(rating);

  return (
    <View style={styles.container}>
      <Text style={styles.ratingText}>{rating.toFixed(1)}</Text>
      <View style={styles.starsContainer}>
        {Array.from({length: totalStars}, (_, index) => (
          <Image
            key={index}
            source={{uri: starImage}}
            style={styles.starIcon}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FDD835', // Gold color for the rating number
    marginRight: 8,
  },
  starsContainer: {
    flexDirection: 'row',
  },
  starIcon: {
    width: 30,
    height: 30,
    marginRight: 2,
    resizeMode: 'contain',
  },
});

export default StarRating;
