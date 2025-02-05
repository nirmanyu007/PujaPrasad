import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {SvgUri} from 'react-native-svg';

const imageArray: string[] = [
  'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/pooja-images/user1.svg',
  'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/pooja-images/user2.svg',
  'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/pooja-images/user3.svg',
  'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/pooja-images/user4.svg',
  'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/pooja-images/user5.svg',
  'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/pooja-images/user6.svg',
  'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/pooja-images/user7.svg',
  'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/pooja-images/user8.svg',
  'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/pooja-images/user9.svg',
  'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/pooja-images/user10.svg',
  'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/pooja-images/user11.svg',
  'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/pooja-images/user12.svg',
  'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/pooja-images/user13.svg',
  'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/pooja-images/user14.svg',
  'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/pooja-images/user15.svg',
  'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/pooja-images/user16.svg',
  'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/pooja-images/user17.svg',
  'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/pooja-images/user18.svg',
  'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/pooja-images/user19.svg',
  'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/pooja-images/user20.svg',
  'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/pooja-images/user21.svg',
  'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/pooja-images/user22.svg',
  'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/pooja-images/user23.svg',
  'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/pooja-images/user24.svg',
  'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/pooja-images/user25.svg',
  'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/pooja-images/user26.svg',
  'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/pooja-images/user27.svg',
  'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/pooja-images/user28.svg',
  'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/pooja-images/user29.svg',
  'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/pooja-images/user30.svg',
  'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/pooja-images/user31.svg',
  'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/pooja-images/user32.svg',
  'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/pooja-images/user33.svg',
  'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/pooja-images/user34.svg',
  'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/pooja-images/user35.svg',
  'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/pooja-images/user36.svg',
  'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/pooja-images/user37.svg',
  'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/pooja-images/user38.svg',
  'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/pooja-images/user39.svg',
  'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/pooja-images/user40.svg',
];

const getRandomImages = (images: string[], count: number): string[] => {
  const shuffled = [...images].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const ImageStack: React.FC = () => {
  const randomImages = getRandomImages(imageArray, 3);
  return (
    <View style={styles.imageStack}>
      <SvgUri uri={randomImages[0]} style={[styles.image, styles.imageLeft]} />
      <SvgUri
        uri={randomImages[1]}
        style={[styles.image, styles.imageMiddle]}
      />
      <SvgUri uri={randomImages[2]} style={[styles.image, styles.imageRight]} />
    </View>
  );
};

const styles = StyleSheet.create({
  imageStack: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: '2%',
  },
  image: {
    width: 30,
    height: 30,
    borderRadius: 15, // Ensures the images remain circular
    position: 'absolute',
    borderWidth: 1,
    borderColor: 'gold',
  },
  imageLeft: {
    left: 0,
    zIndex: 1,
    borderColor: '#007bff', // Blue border
  },
  imageMiddle: {
    left: 15,
    zIndex: 2, // Overlaps other images
  },
  imageRight: {
    left: 30,
    zIndex: 1,
  },
});

export default ImageStack;
