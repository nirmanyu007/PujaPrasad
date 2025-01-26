import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import Antdesign from 'react-native-vector-icons/AntDesign';
import {useNavigation, NavigationProp} from '@react-navigation/native';

type StackParamList = {
  PujaDetail: undefined;
  ViewPujaBooking: undefined; // Define any params if required, e.g., { id: number }
};

const About = () => {
  const navigation = useNavigation<NavigationProp<StackParamList>>(); // Get the navigation object
    
       const handleGoBack = () => {
         navigation.goBack(); // Navigate back to the previous screen
       };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerContainer}>
        <Antdesign
          onPress={handleGoBack}
          name="arrowleft"
          size={24}
          color="black"
          style={styles.backIcon}
        />
        <Text style={styles.title}>About Vedic Vaibhav</Text>
      </View>

      <Text style={styles.sectionHeader}>
        Puja and Prasad Services by Vedic Vaibhav
      </Text>

      <Text style={styles.paragraph}>
        At Vedic Vaibhav, we specialize in delivering authentic puja and prasad
        services to connect you with the divine. Our mission is to make Vedic
        rituals and sacred offerings accessible to everyone, no matter where you
        are.
      </Text>

      <Text style={styles.paragraph}>
        With our expert Vedic pandits, you can book and participate in a variety
        of pujas tailored for festivals, personal milestones, or specific
        intentions. Each ceremony is performed with utmost devotion and
        adherence to Vedic traditions.
      </Text>

      <Text style={styles.paragraph}>
        We also offer prasad delivery from renowned temples across India,
        allowing you to receive the sacred blessings of the deity right at your
        doorstep.
      </Text>

      <Text style={styles.paragraph}>
        Whether it’s an online puja or temple prasad, Vedic Vaibhav ensures an
        unparalleled spiritual experience, rooted in authenticity and reverence.
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  backIcon: {
    marginRight: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    // textAlign: 'center',
    marginBottom: 16,
    color: '#FE1F04',
    marginTop: 16,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    marginBottom: 16,
    textAlign: 'justify',
  },
});

export default About;
