// src/pages/ChalisaDetail.tsx
import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  Image, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView, 
  ActivityIndicator, 
  Animated, 
  Easing 
} from 'react-native';
import axios from 'axios';
import { useNavigation, NavigationProp, useRoute, RouteProp } from '@react-navigation/native';

type StackParamList = {
  ChalisaDetail: { libraryId: string };
};

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

const LanguageToggle: React.FC<{ isHindi: boolean; onToggle: (value: boolean) => void }> = ({ isHindi, onToggle }) => {
  const animatedValue = React.useRef(new Animated.Value(isHindi ? 1 : 0)).current;
  
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
      <TouchableOpacity style={toggleStyles.touchable} onPress={() => onToggle(false)}>
        <Text style={[toggleStyles.label, !isHindi && toggleStyles.activeLabel]}>English</Text>
      </TouchableOpacity>
      <TouchableOpacity style={toggleStyles.touchable} onPress={() => onToggle(true)}>
        <Text style={[toggleStyles.label, isHindi && toggleStyles.activeLabel]}>Hindi</Text>
      </TouchableOpacity>
      <Animated.View style={[toggleStyles.slider, { transform: [{ translateX: sliderTranslate }] }]} />
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

const ChalisaDetail: React.FC = () => {
  const route = useRoute<RouteProp<StackParamList, 'ChalisaDetail'>>();
  const { libraryId } = route.params;
  const navigation = useNavigation<NavigationProp<StackParamList>>();

  const [isHindi, setIsHindi] = useState<boolean>(false);
  const [libraryItem, setLibraryItem] = useState<LibraryItem | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchLibraryItem = async () => {
    try {
      const response = await axios.get<{ library: LibraryItem }>(`http://192.168.1.7:5001/fetch-library-data-by-id/${libraryId}`);
      setLibraryItem(response.data.library);
    } catch (error) {
      console.error("Error fetching library item", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLibraryItem();
  }, [libraryId]);

  const toggleLanguage = () => {
    setIsHindi(prev => !prev);
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  if (!libraryItem) {
    return (
      <View style={styles.center}>
        <Text>No data available for this item.</Text>
      </View>
    );
  }

  const description: string = isHindi ? libraryItem.descriptionHindi : libraryItem.descriptionEnglish;
  const plainDescription: string = description.replace(/<\/?[^>]+(>|$)/g, "");

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>
      <Image source={{ uri: libraryItem.aartiImage }} style={styles.image} />
      <Text style={styles.title}>{isHindi ? libraryItem.nameHindi : libraryItem.nameEnglish}</Text>
      <Text style={styles.godName}>{libraryItem.godName}</Text>
      <LanguageToggle isHindi={isHindi} onToggle={setIsHindi} />
      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionText}>{plainDescription}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: '#fff' },
  center: { flex:1, justifyContent:'center', alignItems:'center' },
  backButton: { marginBottom: 10 },
  backText: { fontSize: 16, color: '#007AFF' },
  image: { width: '100%', height: 200, resizeMode: 'cover', borderRadius: 10 },
  title: { fontSize: 24, fontWeight: 'bold', marginVertical: 10 },
  godName: { fontSize: 18, color: '#888', marginBottom: 10 },
  descriptionContainer: { marginTop: 10 },
  descriptionText: { fontSize: 16, lineHeight: 24 },
});

export default ChalisaDetail;
