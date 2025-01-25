import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import {useNavigation, NavigationProp} from '@react-navigation/native';
type StackParamList = {
  ArtiDetail: undefined;
};

const ArtiDetail = () => {
  const [isHindi, setIsHindi] = useState(false);

  const handleLanguageToggle = () => {
    setIsHindi(!isHindi);
  };

 const navigation = useNavigation<NavigationProp<StackParamList>>(); 
  const handleGoBack = () => {
    navigation.goBack(); // Navigate back to the previous screen
  };
  return (
    <View style={styles.container}>
      {/* Image */}
      <Image
        source={{
          uri: 'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/Puja-Prasad-App/Puja/krishna.png', // Replace with actual image URL
        }}
        style={styles.image}
      />

      {/* Title */}
      <Text style={styles.title}>
        {isHindi ? 'आरती कुंज बिहारी जी' : 'Aarti Kunj Bihari Ji'}
      </Text>

      {/* Toggle Button */}
      <TouchableOpacity style={styles.button} onPress={handleLanguageToggle}>
        <Text style={styles.buttonText}>
          {isHindi ? 'Switch to English' : 'Switch to Hindi'}
        </Text>
      </TouchableOpacity>

      {/* Verses */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {!isHindi ? (
          <>
            <Text style={styles.verse}>
              Aarti Kunj Bihari Ki,
              {'\n'}Shri Girdhar Krishna Murari Ki
              {'\n'}Aarti Kunj Bihari Ki,
              {'\n'}Shri Girdhar Krishna Murari Ki{'\n\n'}
            </Text>

            <Text style={styles.verse}>
              Gale Mein Bajanti Mala,
              {'\n'}Bajave Murali Madhur Bala
              {'\n'}Shravan Mein Kundal Jhalakala,
              {'\n'}Nand Ke Anand Nandlala{'\n\n'}
            </Text>

            <Text style={styles.verse}>
              Sagan Sam Ang Kanti Kali,
              {'\n'}Radhika Chamak Rahi Aali
              {'\n'}Latan Mein Thadhe Banamali{'\n\n'}
            </Text>

            <Text style={styles.verse}>
              Bhramar Si Alak, Kasturi-Tilak,
              {'\n'}Chandra Si Jhalak
              {'\n'}Lalit Chavi Shyama Pyari Ki,
              {'\n'}Shri Girdhar Krishna Murari Ki{'\n\n'}
            </Text>
          </>
        ) : (
          <>
            <Text style={styles.verse}>
              आरती कुंज बिहारी की,
              {'\n'}श्री गिरिधर कृष्ण मुरारी की
              {'\n'}आरती कुंज बिहारी की,
              {'\n'}श्री गिरिधर कृष्ण मुरारी की{'\n\n'}
            </Text>

            <Text style={styles.verse}>
              गले में बैजंती माला,
              {'\n'}बजावें मुरली मधुर बाला
              {'\n'}श्रवण में कुंडल झलकाला,
              {'\n'}नंद के आनंद नंदलाला{'\n\n'}
            </Text>

            <Text style={styles.verse}>
              सगन सम अंग कांति काली,
              {'\n'}राधिका चमक रही आली
              {'\n'}लतन में ठाढ़े बनमाली{'\n\n'}
            </Text>

            <Text style={styles.verse}>
              भृमर सी अलक, कस्तूरी-तिलक,
              {'\n'}चंद्र सी झलक
              {'\n'}ललित छवि श्यामा प्यारी की,
              {'\n'}श्री गिरिधर कृष्ण मुरारी की{'\n\n'}
            </Text>
          </>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginVertical: 10,
  },
  button: {
    alignSelf: 'center',
    backgroundColor: '#FFA500',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  scrollContainer: {
    padding: 15,
    paddingLeft:25
  },
  verse: {
    fontSize: 16,
    color: '#444',
    lineHeight: 24,
    marginBottom: 10,
  },
});

export default ArtiDetail;
