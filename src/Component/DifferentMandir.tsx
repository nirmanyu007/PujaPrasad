import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation, NavigationProp} from '@react-navigation/native';

interface Temple {
  _id: string;
  mandirSectionImage: string;
  nameEnglish: string;
  location: string;
}

type RootStackParamList = {
  MandirDetail: {id: string; templeData: Temple};
};

const {width} = Dimensions.get('window');

interface DifferentMandirProps {
  currentMandirId: string; // Exclude the current mandir
}

const DifferentMandir: React.FC<DifferentMandirProps> = ({currentMandirId}) => {
  const [templeData, setTempleData] = useState<Temple[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>(); // Typed navigation hook

  useEffect(() => {
    const fetchMandirs = async () => {
      try {
        const response = await axios.get(
          `http://192.168.1.30:5001/fetch-active-mandirs`,
        );
        const allMandirs: Temple[] = response.data.mandirs || [];

        // Exclude the current mandir and pick 3 others
        const filteredMandirs = allMandirs
          .filter(mandir => mandir._id !== currentMandirId)
          .slice(0, 3);

        setTempleData(filteredMandirs);
      } catch (error) {
        console.error('Error fetching mandirs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMandirs();
  }, [currentMandirId]);

  // Handle navigation to MandirDetail screen
  const handleCardPress = (temple: Temple) => {
    navigation.navigate('MandirDetail', {id: temple._id, templeData: temple});
  };

  // ✅ Improved Card UI
  const renderItem = ({item}: {item: Temple}) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => handleCardPress(item)} // Navigate to MandirDetail
    >
      {/* Image */}
      <Image source={{uri: item.mandirSectionImage}} style={styles.cardImage} />

      {/* Overlay Content */}
      <View style={styles.overlay}>
        <Text style={styles.title}>{item.nameEnglish}</Text>
        <View style={styles.locationContainer}>
          <Icon name="location-on" size={16} color="#fff" />
          <Text style={styles.locationText}>{item.location}</Text>
        </View>
      </View>

      {/* External Link Icon */}
      <TouchableOpacity style={styles.externalLink}>
        <Image
          source={{
            uri: 'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/Puja-Prasad-App/Puja/arrowRight.png',
          }}
          style={{height: 35, width: 28}}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View>
        <Text>Loading mandirs...</Text>
      </View>
    );
  }

  return (
    <View>
      <View style={{display: 'flex', alignItems: 'center', width: '100%'}}>
        <Text style={styles.headerText}>
          Discover Sacred Sites Beyond Borders Most Famous Temple
        </Text>
      </View>
      <View style={{marginVertical: '5%'}}>
        <Carousel
          data={templeData}
          renderItem={renderItem}
          sliderWidth={width}
          itemWidth={width * 0.8}
          loop
          autoplay
          autoplayInterval={3000}
          vertical={false} // ✅ Required for horizontal layout
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    width: '80%',
    textAlign: 'center',
    paddingTop: '5%',
  },
  card: {
    borderRadius: 10,
    overflow: 'hidden',
    position: 'relative',
    width: '100%',
    height: 220,
    backgroundColor: '#222',
    elevation: 4,
  },
  cardImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 3,
  },
  locationText: {
    color: '#fff',
    fontSize: 14,
    marginLeft: 5,
  },
  externalLink: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 5,
    borderRadius: 5,
  },
});

export default DifferentMandir;
