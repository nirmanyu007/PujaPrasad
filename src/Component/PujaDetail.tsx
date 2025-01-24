import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {Dimensions} from 'react-native';
import Detailing from './Detailing';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation, NavigationProp} from '@react-navigation/native';

type StackParamList = {
  PujaDetail: undefined;
  PreviewPuja: undefined; // Define any params if required, e.g., { id: number }
};

interface PujaDetails {
  title: string;
  poojaCardBenefit: string;
  templeDetails: {
    nameEnglish: string;
    city: string;
    state: string;
  };
  poojaDate: string;
  poojaDay: string;
  images: string[];
  ratings: number;
  ratingCount: number;
}

const {width: screenWidth} = Dimensions.get('window');

const PujaDetail: React.FC = () => {
  const staticPuja: PujaDetails = {
    title: 'Puja Title in Hindi',
    poojaCardBenefit: '<ul><li>Benefit 1</li><li>Benefit 2</li></ul>',
    templeDetails: {
      nameEnglish: 'Shri Temple',
      city: 'CityName',
      state: 'StateName',
    },
    poojaDate: '25th January 2025',
    poojaDay: 'Sunday',
    images: [
      'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/Puja-Prasad-App/Puja/rudra-min.png',
      'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/Puja-Prasad-App/Puja/rudra-min.png',
    ],
    ratings: 4.5,
    ratingCount: 120,
  };

  const handleShareOnWhatsApp = () => {
    console.log('Shared on WhatsApp!');
  };

  const navigation = useNavigation<NavigationProp<StackParamList>>(); // Get the navigation object

   const handleGoBack = () => {
     navigation.goBack(); // Navigate back to the previous screen
   };
    const handleSelectPackage = () => {
      navigation.navigate('PreviewPuja'); // Navigate to PreviewPuja screen
    };

  const renderCarouselItem = ({item}: {item: string}) => {
    return (
      <View style={styles.carouselImageContainer}>
        <Image source={{uri: item}} style={styles.carouselImage} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Content Scroll */}
      <ScrollView style={styles.scrollViewContent}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: '2%',
            paddingVertical: '2%',
          }}>
          <AntDesign
            onPress={handleGoBack}
            name="arrowleft"
            size={23}
            color="black"
          />
          <Text style={{paddingLeft: '2%', fontSize:18,color:'black',fontWeight:600}}>Rudrabhishek</Text>
        </View>
        {/* Carousel */}
        <View style={styles.carouselContainer}>
          <Carousel<string>
            data={staticPuja.images}
            renderItem={renderCarouselItem}
            sliderWidth={screenWidth}
            itemWidth={screenWidth}
            loop={true}
            autoplay={true}
            autoplayDelay={1000}
            autoplayInterval={3000}
            vertical={false}
          />
        </View>

        {/* Puja Details */}
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>{staticPuja.title}</Text>
          <View
            style={styles.benefitsContainer}
            children={
              <Text style={styles.benefitsText}>
                {'• Benefit 1\n• Benefit 2'}
              </Text>
            }
          />
          <View style={styles.detailRow}>
            <Image
                        source={{
                          uri: 'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/Puja-Prasad-App/Puja/temple.png',
                        }}
                        style={styles.icon}
                      />
            <Text style={styles.detailText}>
              {staticPuja.templeDetails.nameEnglish},{' '}
              {staticPuja.templeDetails.city}, {staticPuja.templeDetails.state}
            </Text>
          </View>
          <View style={styles.detailRow}>
            <Image
                        source={{
                          uri: 'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/Puja-Prasad-App/Puja/date.png',
                        }}
                        style={styles.icon}
                      />
            <Text style={styles.detailText}>
              {staticPuja.poojaDate}, {staticPuja.poojaDay}
            </Text>
          </View>
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingText}>
              {staticPuja.ratings} Based on {staticPuja.ratingCount} ratings
            </Text>
          </View>
        </View>

        {/* Additional Details */}
        <View>
          <Detailing />
        </View>
      </ScrollView>

      {/* Fixed Button */}
      <View style={styles.floatingButton}>
        <TouchableOpacity
          onPress={handleSelectPackage}
          style={styles.selectPackageButton}>
          <Text style={styles.selectPackageText}>Select Package </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollViewContent: {
    flex: 1,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 10,
    width: '100%',
    alignItems: 'center',
    zIndex: 1,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  selectPackageButton: {
    backgroundColor: '#FF7D00',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 50,
    width: '90%',
    elevation: 5,
  },
  selectPackageText: {
    color: 'white',
    fontSize: 17,
    fontWeight: 'bold',
  },
  carouselContainer: {
    alignItems: 'center',
  },
  carouselImageContainer: {
    paddingHorizontal: '3%',
    borderRadius: 12,
    overflow: 'hidden',
  },
  carouselImage: {
    width: '100%',
    height: 185,
    borderRadius: 12,
  },
  detailsContainer: {
    paddingHorizontal: '4%',
    marginBottom: 20, // Add some space for clarity
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'sans-serif',
    marginTop: 10,
    color: 'rgba(0,0,0,0.95)',
  },
  benefitsContainer: {
    marginVertical: 5,
  },
  benefitsText: {
    fontSize: 14,
    color: 'rgba(0,0,0,0.5)',
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  detailText: {
    marginLeft: 5,
    fontSize: 14,
    color: 'rgba(0,0,0,0.5)',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  ratingText: {
    marginLeft: 10,
    fontSize: 14,
    color: 'rgba(0,0,0,0.7)',
  },
});

export default PujaDetail;
