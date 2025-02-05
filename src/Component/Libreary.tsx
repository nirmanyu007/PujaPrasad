import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity, ImageBackground} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation, NavigationProp} from '@react-navigation/native';

type StackParamList = {
  Arti: undefined;
  Chalisa: undefined;
};

const Library = () => {
  const navigation = useNavigation<NavigationProp<StackParamList>>(); 
      const handleClick = () => {
        navigation.navigate('Arti'); // Navigate to PreviewPuja screen
      };
      const handleClick2 = () => {
        navigation.navigate('Chalisa'); // Navigate to PreviewPuja screen
      };
      const handleGoBack = () => {
        navigation.goBack(); // Navigate back to the previous screen
      };
  return (
    <View style={styles.container}>
      <ImageBackground
        source={{
          uri: 'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/Puja-Prasad-App/HomePage/libback.png', // Replace with Aarti image URL
        }}
        style={{height: '100%', width: '100%'}}>
        {/* Header */}
        <View style={styles.header}>
          <AntDesign
            onPress={handleGoBack}
            name="arrowleft"
            size={23}
            color="black"
          />
          <Text style={styles.headerText}>Library</Text>
        </View>

        {/* Boxes */}
        <View style={styles.boxContainer}>
          {/* Aarti Box */}
          <TouchableOpacity
            onPress={handleClick}
            style={[styles.box, styles.aartiBox]}>
            <Text style={styles.boxText}>Aarti</Text>
            <Image
              source={{
                uri: 'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/Puja-Prasad-App/Puja/arti.png', // Replace with Aarti image URL
              }}
              style={styles.boxImage}
            />
          </TouchableOpacity>

          {/* Chalisa Box */}
          <TouchableOpacity
            onPress={handleClick2}
            style={[styles.box, styles.chalisaBox]}>
            <Image
              source={{
                uri: 'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/Puja-Prasad-App/Puja/boxPrasad.png', // Replace with Chalisa image URL
              }}
              style={styles.boxImage}
            />
            <Text style={styles.boxText}>Chalisa</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
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
    marginBottom: 30,
  },
  headerText: {
    paddingLeft: 10,
    fontSize: 18,
    fontWeight: '600',
    color: 'black',
  },
  boxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  box: {
    width: '48%',
    height: 150,
    borderRadius: 10,
    overflow: 'hidden',
    justifyContent: 'flex-end',
    padding: 10,
  },
  aartiBox: {
    backgroundColor: '#E6B079',
  },
  chalisaBox: {
    backgroundColor: '#7F2A04',
  },
  boxImage: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: '100%',
    height: 135,
    resizeMode: 'cover',
  },
  boxText: {
    position: 'absolute',
    top:20,
    left:15,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default Library;
