import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import {useNavigation, NavigationProp} from '@react-navigation/native';

type StackParamList = {
  ChalisaDetail: undefined;
};

const Chalisa = () => {
  const navigation = useNavigation<NavigationProp<StackParamList>>(); 
          const handleClick = () => {
            navigation.navigate('ChalisaDetail'); // Navigate to PreviewPuja screen
          };
          const handleGoBack = () => {
            navigation.goBack(); // Navigate back to the previous screen
          };
     const chalisaData = [
       {
         id: 1,
         title: 'Hanuman Chalisa',
         subtitle: 'Vedic Vaibhav',
         image:
           'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/Puja-Prasad-App/Puja/hanuman.png', // Replace with the actual image URL
         backgroundColor: '#F8A126',
         rightIconBackgroundColor: '#EEAF5A',
         borderCol: '#FF6505',
       },
       {
         id: 2,
         title: 'Shiv Chalisa',
         subtitle: 'Vedic Vaibhav',
         image:
           'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/Puja-Prasad-App/Puja/shiv_aarti.png', // Replace with the actual image URL
         backgroundColor: '#0A6B81',
         rightIconBackgroundColor: '#3B8899',
         borderCol: '#3B3A4C',
       },
       {
         id: 3,
         title: 'Durga Chalisa',
         subtitle: 'Vedic Vaibhav',
         image:
           'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/Puja-Prasad-App/Puja/Durga%201.png', // Replace with the actual image URL
         backgroundColor: '#A11A30',
         rightIconBackgroundColor: '#946567',
         borderCol: '#FF6505',
       },
     ];
  return (
    <View>
      <View style={{backgroundColor: '#E6B079'}}>
        <AntDesign
          onPress={handleGoBack}
          name="arrowleft"
          size={23}
          color="white"
          style={{paddingLeft: 10, paddingTop: 10}}
        />
      </View>
      <View style={styles.imageContainer}>
        <Text style={{color: 'white', fontSize: 64, paddingLeft: '5%'}}>
          Chalisa
        </Text>
        <Image
          source={{
            uri: 'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/Puja-Prasad-App/HomePage/boxe.png', // Replace with the actual image URL
          }}
          style={styles.image}
        />
        <View style={{position: 'absolute', top: 15, left: 90}}>
          <Image
            source={{
              uri: 'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/Puja-Prasad-App/HomePage/hanumanlogo.png', // Replace with the actual image URL
            }}
            style={{width: 58, height: 58}}
          />
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {chalisaData.map(item => (
          <TouchableOpacity
            onPress={handleClick}
            key={item.id}
            style={[
              styles.card,
              {backgroundColor: item.backgroundColor},
              {borderColor: item.borderCol},
            ]}>
            <Image source={{uri: item.image}} style={styles.cardImage} />
            <View style={styles.cardContent}>
              <View
                style={{
                  flexDirection: 'row',
                  display: 'flex',
                  alignItems: 'center',
                }}>
                <Image
                  source={{
                    uri: 'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/Puja-Prasad-App/HomePage/home.png', // Replace with the actual image URL
                  }}
                  style={{width: 20, height: 20}}
                />
                <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
              </View>
              <Text style={styles.cardTitle}>{item.title}</Text>
            </View>
            <View
              style={{
                paddingTop: 40,
                paddingRight: 10,
                // backgroundColor: 'rgba(255,254,100,1)',
              }}>
              <View
                style={[
                  styles.rightIconBackground,
                  {backgroundColor: item.rightIconBackgroundColor},
                ]}>
                <AntDesign name="right" size={18} color="#fff" />
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#E6B079',
  },
  headerText: {
    fontSize: 20,
    fontWeight: '600',
    color: 'black',
    marginLeft: 10,
  },
  imageContainer: {
    // alignItems: 'center',
    // marginVertical: 20,
    backgroundColor: '#E6B079',
    marginBottom: '5%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: '4%',
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 10,
    objectFit: 'cover',
    borderWidth: 1,
    // borderColor: 'black',
  },
  scrollContainer: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  card: {
    flexDirection: 'row',
    // alignItems: 'center',
    borderRadius: 20,
    marginBottom: 15,
    // padding: 10,
    height: 100,
    borderWidth: 2,
  },
  cardImage: {
    width: 140,
    height: 96,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    marginRight: 10,
  },
  cardContent: {
    // flex: 1,
    paddingTop: 10,
    width: '45%',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    display: 'flex',
    // justifyContent:'center',
    paddingTop: 10,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#f0f0f0',
    paddingLeft: 5,
  },
  rightIconContainer: {
    paddingTop: 40,
    paddingRight: 10,
  },
  rightIconBackground: {
    padding: 5,
    borderRadius: 10000,
  },
});

export default Chalisa

