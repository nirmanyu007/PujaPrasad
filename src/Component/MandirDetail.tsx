import React from 'react';
import {View, Text, StyleSheet, Image, ScrollView} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MandirInstruction from './MandirInstruction';
import MandirIntro from './MandirIntro';
import MandirHistory from './MandirHistory';
import MandirPuja from './MandirPuja';

const MandirDetail = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <AntDesign name="arrowleft" size={23} color="black" />
        <Text style={styles.headerText}>Mandir</Text>
      </View>

      {/* Mandir Detail Box */}
      <View style={styles.mandirBox}>
        {/* Image */}
        <Image
          source={{
            uri: 'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/Puja-Prasad-App/Puja/baijnath.png', // Replace with actual image URL
          }}
          style={styles.image}
        />

        {/* Text Content */}
        <View style={styles.textContainer}>
          <Text style={styles.title}>Baijnath Temple</Text>
          <Text style={styles.subtitle}>Himachal Pradesh, India</Text>
        </View>
      </View>

      {/* Instructions Section */}
      <View style={styles.section}>
        <MandirInstruction />
      </View>

      {/* Introduction Section */}
      <View style={styles.section}>
        <MandirIntro />
      </View>
      <View style={styles.section}>
        <MandirHistory />
      </View>
      <View style={{backgroundColor: '#0A6B81'}}>
        <MandirPuja />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: '600',
    color: 'black',
    marginLeft: 10,
  },
  mandirBox: {
    borderRadius: 17,
    overflow: 'hidden',
    backgroundColor: '#fff',
    elevation: 3,
    paddingHorizontal: 20,
  },
  image: {
    width: '100%',
    height: 160,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  textContainer: {
    backgroundColor: '#800020', // Deep red color for the text container
    padding: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitle: {
    fontSize: 14,
    color: '#fff',
    marginTop: 5,
  },
  section: {
    marginVertical: 20,
  },
});

export default MandirDetail;
