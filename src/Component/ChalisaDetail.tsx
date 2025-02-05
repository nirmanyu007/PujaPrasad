import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
// import React from 'react';

const ChalisaDetail = () => {

    
      const [isHindi, setIsHindi] = useState(false);
    
      const handleLanguageToggle = () => {
        setIsHindi(!isHindi);
      };

  return (
    <View style={styles.container}>
      {/* Image */}
      <Image
        source={{
          uri: 'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/Puja-Prasad-App/Puja/hanuman.png', // Replace with actual image URL
        }}
        style={styles.image}
      />

      {/* Title */}
      <Text style={styles.title}>
        {isHindi ? 'आरती कुंज बिहारी जी' : 'Hanuman Chalisa'}
      </Text>

      {/* Toggle Button */}
      <TouchableOpacity style={styles.button} onPress={handleLanguageToggle}>
              <View style={styles.buttonContent}>
                {isHindi ? (
                  <>
                    <Image
                      source={{
                        uri: 'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/Puja-Prasad-App/HomePage/vec12.png', // Replace with the actual image URL
                      }}
                      style={styles.languageImage1}
                    />
                    {/* <Image
                      source={{
                        uri: 'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/Puja-Prasad-App/HomePage/hindi.png', // Replace with the actual image URL
                      }}
                      style={styles.languageImage}
                    /> */}
                    <Text style={{color:'white',fontSize:18}}>En</Text>
                  </>
                ) : (
                  <>
                    <Image
                      source={{
                        uri: 'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/Puja-Prasad-App/HomePage/vec12.png', // Replace with the actual image URL
                      }}
                      style={styles.languageImage1}
                    />
                    <Image
                      source={{
                        uri: 'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/Puja-Prasad-App/HomePage/hindi.png', // Replace with the actual image URL
                      }}
                      style={styles.languageImage}
                    />
                  </>
                )}
              </View>
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
    position: 'absolute',
    zIndex: 10, // Ensure the button is on top of other elements
    right: 15, // Adjust distance from the right
    top: '50%', // Adjust vertical position
    transform: [{translateY: -25}], // Center the button vertically
    backgroundColor: '#FF4E18',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 8000,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal:5
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  languageImage: {
    width: 35,
    height: 20,
    borderRadius: 4,
  },
  languageImage1: {
    width: 20,
    height: 20,
    borderRadius: 4,
    marginRight: 5,
  },
  languageText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',
  },
  scrollContainer: {
    padding: 15,
    paddingLeft: 25,
  },
  verse: {
    fontSize: 16,
    color: '#444',
    lineHeight: 24,
    marginBottom: 10,
  },
});


export default ChalisaDetail;


