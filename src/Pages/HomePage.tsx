import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import HomeNavBAr from '../Component/HomeNavBAr';

interface CarouselItem {
  title: string;
  location: string;
  image: string;
}

const {width} = Dimensions.get('window');

const carouselData: CarouselItem[] = [
  {
    title: 'Rudra Abhishekam',
    location: 'Kashi Vishwanath Temple, Varanasi',
    image:
      'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/Puja-Prasad-App/HomePage/Rudra_Banner.png',
  },
  {
    title: 'Maha Shivratri Puja',
    location: 'Somnath Temple, Gujarat',
    image:
      'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/Puja-Prasad-App/HomePage/Rudra_Banner.png',
  },
  {
    title: 'Durga Puja',
    location: 'Dakshineswar Temple, Kolkata',
    image:
      'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/Puja-Prasad-App/HomePage/Rudra_Banner.png',
  },
];

const HomePage: React.FC = () => {
  const carouselRef = useRef<Carousel<CarouselItem>>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const renderItem = ({item}: {item: CarouselItem}) => (
    <View style={styles.card}>
      <View style={styles.position}>
        <Image source={{uri: item.image}} style={styles.image} />
      </View>

      <Image
        source={{
          uri: 'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/Puja-Prasad-App/HomePage/logo.png',
        }}
        style={styles.image1}
      />
      <View style={styles.doing}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.location}>{item.location}</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>BOOK PUJA NOW</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{
          uri: 'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/Puja-Prasad-App/HomePage/Decoration_Home.png',
        }}
        style={styles.backgroundImage}
        resizeMode="cover">
        {/* Navbar inside ImageBackground with absolute positioning */}
        <View style={{paddingHorizontal:'4%', paddingTop:'10%'}}>
          <HomeNavBAr />
        </View>
      </ImageBackground>
      <Carousel
        ref={carouselRef}
        data={carouselData}
        renderItem={renderItem}
        sliderWidth={width}
        itemWidth={width * 0.8}
        loop={true}
        autoplay={true}
        autoplayInterval={3000}
        vertical={false}
        containerCustomStyle={styles.carouselContainer} // Added this
        onSnapToItem={index => setActiveIndex(index)} // Track active slide
      />

      {/* Flower Indicators */}
      <View style={styles.indicators}>
        {carouselData.map((_, index) => (
          <Image
            key={index}
            source={{
              uri: 'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/Puja-Prasad-App/HomePage/Vector.png', // Replace with your flower image URL
            }}
            style={[
              styles.flower,
              activeIndex === index && styles.activeFlower, // Highlight the active flower
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
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    width: '100%',
    height: 135,
  },
  carouselContainer: {
    marginTop: -30, // Adjust this value to move the carousel up as needed
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: {width: 0, height: 4},
  },
  position: {
    position: 'relative',
  },
  doing: {
    position: 'absolute',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    top: '70%',
    width: '100%',
  },
  image: {
    width: '100%',
    height: 440,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  image1: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 10,
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFBF00',
    fontFamily: 'Poppins-Bold',
  },
  location: {
    fontSize: 16,
    color: 'white',
    marginBottom: 10,
    fontFamily: 'Poppins-Bold',
  },
  button: {
    backgroundColor: 'white',
    paddingVertical: 8,
    borderRadius: 800,
    color: '#FF6605',
    alignItems: 'center',
    width: '60%',
  },
  buttonText: {
    color: '#FF6605',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Poppins-Bold',
  },
  indicators: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flower: {
    width: 15,
    height: 15,
    marginHorizontal: 5,
    tintColor: 'gray', // Default flower color
  },
  activeFlower: {
    tintColor: '#FF6605', // Highlighted flower color
  },
});

export default HomePage;
