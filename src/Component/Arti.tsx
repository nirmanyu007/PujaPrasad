// src/pages/Arti.tsx
import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Animated,
  Easing,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import axios from 'axios';
import {useNavigation, NavigationProp} from '@react-navigation/native';

interface LibraryItem {
  _id: string;
  id: string;
  nameEnglish: string;
  nameHindi: string;
  descriptionEnglish: string;
  descriptionHindi: string;
  godName: string;
  aartiImage: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

type StackParamList = {
  ArtiDetail: {libraryId: string};
};

const LanguageToggle: React.FC<{
  isHindi: boolean;
  onToggle: (value: boolean) => void;
}> = ({isHindi, onToggle}) => {
  const animatedValue = useRef(new Animated.Value(isHindi ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: isHindi ? 1 : 0,
      duration: 300,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: false,
    }).start();
  }, [isHindi, animatedValue]);

  const sliderTranslate = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 100],
  });

  return (
    <View style={toggleStyles.container}>
      <TouchableOpacity
        style={toggleStyles.touchable}
        onPress={() => onToggle(false)}>
        <Text
          style={[toggleStyles.label, !isHindi && toggleStyles.activeLabel]}>
          English
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={toggleStyles.touchable}
        onPress={() => onToggle(true)}>
        <Text style={[toggleStyles.label, isHindi && toggleStyles.activeLabel]}>
          Hindi
        </Text>
      </TouchableOpacity>
      <Animated.View
        style={[
          toggleStyles.slider,
          {transform: [{translateX: sliderTranslate}]},
        ]}
      />
    </View>
  );
};

const toggleStyles = StyleSheet.create({
  container: {
    width: 200,
    height: 40,
    backgroundColor: '#ddd',
    borderRadius: 20,
    flexDirection: 'row',
    position: 'relative',
    overflow: 'hidden',
    alignSelf: 'center',
    marginVertical: 10,
  },
  touchable: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    color: '#555',
    fontWeight: '500',
  },
  activeLabel: {
    color: 'black',
  },
  slider: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 100,
    height: '100%',
    backgroundColor: '#E6B079',
    opacity: 0.5,
    borderRadius: 20,
  },
});

const Arti: React.FC = () => {
  const navigation = useNavigation<NavigationProp<StackParamList>>();
  const [libraryItems, setLibraryItems] = useState<LibraryItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isHindi, setIsHindi] = useState<boolean>(false);

  const fetchLibraryData = async () => {
    try {
      const response = await axios.get<LibraryItem[]>(
        'http://192.168.1.30:5001/fetch-library-data',
      );
      const data = response.data.filter(
        item => item.id.toLowerCase() === 'aarti',
      );
      setLibraryItems(data);
    } catch (error) {
      console.error('Error fetching library data', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLibraryData();
  }, []);

  const handleGoBack = () => navigation.goBack();
  const handlePress = (item: LibraryItem) =>
    navigation.navigate('ArtiDetail', {libraryId: item._id});

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: 'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/Puja-Prasad-App/HomePage/libback.png',
        }}
        style={styles.backgroundImage}
      />
      <View style={styles.header}>
        <AntDesign
          name="arrowleft"
          onPress={handleGoBack}
          size={23}
          color="black"
        />
        <Text style={styles.headerText}>Library</Text>
      </View>
      <LanguageToggle isHindi={isHindi} onToggle={setIsHindi} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {loading ? (
          <ActivityIndicator size="large" color="#000" />
        ) : libraryItems.length === 0 ? (
          <Text style={styles.noDataText}>
            No Aarti present for now. WILL BRING SOON IN A GOOD FORMATTED MANNER
          </Text>
        ) : (
          libraryItems.map(item => (
            <TouchableOpacity
              key={item._id}
              style={[
                styles.card,
                {backgroundColor: '#E6B079', borderColor: '#FF6505'},
              ]}
              onPress={() => handlePress(item)}>
              <Image source={{uri: item.aartiImage}} style={styles.cardImage} />
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>
                  {isHindi ? item.nameHindi : item.nameEnglish}
                </Text>
                <Text style={styles.cardSubtitle}>Vedic Vaibhav</Text>
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff', padding: 20},
  backgroundImage: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  header: {flexDirection: 'row', alignItems: 'center', marginBottom: 30},
  headerText: {
    paddingLeft: 10,
    fontSize: 18,
    fontWeight: '600',
    color: 'black',
  },
  scrollContainer: {paddingBottom: 20},
  card: {
    flexDirection: 'row',
    borderRadius: 10,
    marginBottom: 15,
    height: 150,
    overflow: 'hidden',
    borderWidth: 2,
  },
  cardImage: {width: '40%', height: '100%'},
  cardContent: {flex: 1, padding: 10, justifyContent: 'center'},
  cardTitle: {fontSize: 18, fontWeight: 'bold', color: '#fff'},
  cardSubtitle: {fontSize: 16, color: '#fff'},
  noDataText: {
    fontSize: 16,
    color: '#444',
    textAlign: 'center',
    marginVertical: 20,
  },
});

export default Arti;
