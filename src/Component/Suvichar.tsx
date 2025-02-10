// src/pages/Suvichar.tsx
import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  Animated,
  Easing,
  Dimensions,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import axios from 'axios';

interface DailyQuote {
  _id: string;
  date: string;
  descriptionEnglish: string;
  descriptionHindi: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const SCREEN_WIDTH = Dimensions.get('window').width;

// Custom Language Toggle Component
interface LanguageToggleProps {
  isHindi: boolean;
  onToggle: (value: boolean) => void;
}

const LanguageToggle: React.FC<LanguageToggleProps> = ({isHindi, onToggle}) => {
  // Animated value for slider position (0 for English, 1 for Hindi)
  const animatedValue = useRef(new Animated.Value(isHindi ? 1 : 0)).current;

  // Animate whenever isHindi changes
  React.useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: isHindi ? 1 : 0,
      duration: 300,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: false,
    }).start();
  }, [isHindi, animatedValue]);

  // Interpolate slider position
  const sliderTranslate = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 100], // Adjust width as needed
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
    width: 100, // half of container width (200)
    height: '100%',
    backgroundColor: '#E6B079',
    opacity: 0.5,
    borderRadius: 20,
    color: 'white',
  },
});

const Suvichar: React.FC = () => {
  const navigation = useNavigation<NavigationProp<any>>();

  // Handler to go back
  const handleGoBack = () => {
    navigation.goBack();
  };

  const [isHindi, setIsHindi] = useState<boolean>(false);
  const [quote, setQuote] = useState<DailyQuote | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Default quotes if no quote exists for today
  const defaultQuoteEng: string =
    'Let what comes come. Let what goes go. Find out what remains.';
  const defaultQuoteHin: string =
    'जो आता है आने दो. जो चल रहा है उसे जाने दो. पता करो क्या बचा है.';

  const fetchDailyQuote = async () => {
    try {
      const response = await axios.get<DailyQuote[]>(
        'http://192.168.1.30:5001/fetch-daily-quotes',
      );
      const quotes = response.data;
      const todayStr = new Date().toISOString().substring(0, 10);
      // Find the quote whose date starts with today's date
      const todaysQuote = quotes.find(
        q => q.date.substring(0, 10) === todayStr,
      );
      if (todaysQuote) {
        setQuote(todaysQuote);
      } else {
        setQuote(null);
      }
    } catch (error) {
      console.error('Error fetching daily quote', error);
      setQuote(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDailyQuote();
  }, []);

  const handleToggle = (value: boolean) => {
    setIsHindi(value);
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  // Choose the appropriate quote text (using API response or default)
  const displayedQuote: string = quote
    ? isHindi
      ? quote.descriptionHindi
      : quote.descriptionEnglish
    : isHindi
    ? defaultQuoteHin
    : defaultQuoteEng;

  // Strip HTML tags (if stored as HTML)
  const plainText: string = displayedQuote.replace(/<\/?[^>]+(>|$)/g, '');

  return (
    <View style={styles.container}>
      {/* Header with Back Arrow and Title */}
      <View style={styles.header}>
        <AntDesign
          name="arrowleft"
          onPress={handleGoBack}
          size={23}
          color="black"
        />
        <Text style={styles.headerText}>Suvichar</Text>
      </View>

      {/* Custom Language Toggle in the Middle */}
      <LanguageToggle isHindi={isHindi} onToggle={handleToggle} />

      {/* Quote Box */}
      <View style={styles.quoteBox}>
        <Image
          source={{
            uri: 'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/Puja-Prasad-App/Puja/DesignUp.png',
          }}
          style={styles.designImage}
        />
        <Text style={styles.quoteText}>{plainText}</Text>
        <Image
          source={{
            uri: 'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/Puja-Prasad-App/Puja/designDown.png',
          }}
          style={styles.designImage}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    fontWeight: '600',
    color: 'black',
    marginLeft: 10,
  },
  quoteBox: {
    backgroundColor: '#E6B079',
    borderRadius: 10,
    padding: 20,
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quoteText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: 24,
    marginVertical: 10,
  },
  designImage: {
    width: 137,
    height: 37,
  },
  toggleContainer: {
    marginVertical: 20,
    alignItems: 'center',
  },
  toggleLabel: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default Suvichar;
