import React, {useEffect, useRef, useState} from 'react';
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
import HomeNavBar from '../Component/HomeNavBAr';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../App';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

interface CarouselItem {
  title: string;
  location: string;
  image: string;
  id: string;
}

const {width} = Dimensions.get('window');

type PoojaMandirList = {
  mandirId: string; // Assuming mandirId is a string representing the Mandir's _id
  originalPrice: number;
  discountPrice: number;
  poojaMandirTime: string;
  poojaMandirDates: string;
  poojaMandirBenefits: string;
  _id: string;
};

type Puja = {
  _id: string;
  poojaID: string;
  title: string;
  titleHindi?: string; // Optional
  poojaGod: string;
  moolmantra: string;
  mandirLists: PoojaMandirList[];
  poojaCardBenefit: string;
  poojaDescription: string;
  poojaCardImage: string;
  images: string[];
  isActive: boolean;
  isExclusive: boolean;
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

type Mandir = {
  _id: string;
  nameEnglish: string;
  poojaMandirDates: string;
};

const HomePage: React.FC = () => {
  const carouselRef = useRef<Carousel<CarouselItem>>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [pujaData, setPujaData] = useState<Puja[]>([]);
  const [mandirMap, setMandirMap] = useState<{[key: string]: Mandir}>({});
  const [carouselData, setCarouselData] = useState<CarouselItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Navigation setup
  type NavigationProps = NativeStackNavigationProp<
    RootStackParamList,
    'PujaDetails'
  >;
  const navigation = useNavigation<NavigationProps>();

  useEffect(() => {
    const fetchPujaData = async () => {
      try {
        const response = await axios.get(
          `http://192.168.1.30:5001/fetch-all-poojas-exclusive`,
        );
        const processedPoojas: Puja[] = response.data.poojas.map(
          (puja: any) => ({
            ...puja,
            poojaCardBenefit: puja.poojaCardBenefit,
            poojaDescription: puja.poojaDescription,
          }),
        );
        setPujaData(processedPoojas);

        const mandirIdsSet = new Set<string>();
        processedPoojas.forEach(puja => {
          puja.mandirLists.forEach(mandir => {
            mandirIdsSet.add(mandir.mandirId);
          });
        });

        const uniqueMandirIds = Array.from(mandirIdsSet);

        const fetchMandirs = uniqueMandirIds.map(id =>
          axios
            .get(`http://192.168.1.30:5001/fetch-mandir-by-id/${id}`)
            .then(res => res.data.mandir as Mandir)
            .catch(err => {
              console.error(`Error fetching mandir with ID ${id}:`, err);
              return null;
            }),
        );

        const mandirResponses = await Promise.all(fetchMandirs);
        const validMandirs = mandirResponses.filter(
          (mandir: Mandir | null) => mandir !== null,
        ) as Mandir[];

        const mandirDataMap: {[key: string]: Mandir} = {};
        validMandirs.forEach((mandir: Mandir) => {
          mandirDataMap[mandir._id] = mandir;
        });
        setMandirMap(mandirDataMap);

        const newCarouselData = processedPoojas.map(puja => {
          const mandir = mandirMap[puja.mandirLists[0]?.mandirId];
          return {
            title: puja.title,
            location: mandir?.nameEnglish || 'Unknown Location',
            image: puja.poojaCardImage,
            id: puja._id,
          };
        });

        setCarouselData(newCarouselData);
      } catch (err: any) {
        console.error('There was an error fetching the Puja data!', err);
        setError('No poojas available right now. We will get back soon.');
      } finally {
        setLoading(false);
      }
    };

    fetchPujaData();
  }, []);

  const renderItem = ({item}: {item: CarouselItem}) => {
    return (
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
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              navigation.navigate('PujaDetails', {pujaId: item.id})
            }>
            <Text style={styles.buttonText}>BOOK PUJA NOW</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{
          uri: 'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/Puja-Prasad-App/HomePage/Mask.png',
        }}
        style={styles.backgroundImage}
        resizeMode="cover">
        <View style={{paddingHorizontal: '4%', paddingTop: '10%'}}>
          <HomeNavBar title="My Custom Title" />
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
        containerCustomStyle={styles.carouselContainer}
        onSnapToItem={index => setActiveIndex(index)}
      />
      <View style={styles.indicators}>
        {carouselData.map((_, index) => (
          <Image
            key={index}
            source={{
              uri: 'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/Puja-Prasad-App/HomePage/Vector.png',
            }}
            style={[
              styles.flower,
              activeIndex === index && styles.activeFlower,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    width: '100%',
    height: 212,
    objectFit: 'contain',
  },
  carouselContainer: {
    marginTop: -30,
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
    tintColor: 'gray',
  },
  activeFlower: {
    tintColor: '#FF6605',
  },
});

export default HomePage;
