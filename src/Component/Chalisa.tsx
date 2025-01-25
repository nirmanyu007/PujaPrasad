import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'

const Chalisa = () => {
     const chalisaData = [
       {
         id: 1,
         title: 'Hanuman Chalisa',
         subtitle: 'Vedic Vaibhav',
         image:
           'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/Puja-Prasad-App/Puja/hanuman.png', // Replace with the actual image URL
         backgroundColor: '#F8A126',
       },
       {
         id: 2,
         title: 'Shiv Chalisa',
         subtitle: 'Vedic Vaibhav',
         image:
           'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/Puja-Prasad-App/Puja/shiv_aarti.png', // Replace with the actual image URL
         backgroundColor: '#0A6B81',
       },
       {
         id: 3,
         title: 'Durga Chalisa',
         subtitle: 'Vedic Vaibhav',
         image:
           'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/Puja-Prasad-App/Puja/Durga%201.png', // Replace with the actual image URL
         backgroundColor: '#A11A30',
       },
     ];
  return (
    <View>
      <View style={{backgroundColor: '#7F2A04'}}>
        <AntDesign name="arrowleft" size={23} color="black" />
      </View>
      <View style={styles.imageContainer}>
        <Text style={{color: 'white', fontSize: 64, paddingLeft: '5%'}}>
          Chalisa
        </Text>
        <Image
          source={{
            uri: 'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/Puja-Prasad-App/Puja/boxPrasad.png', // Replace with the actual image URL
          }}
          style={styles.image}
        />
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
              {chalisaData.map(item => (
                <TouchableOpacity
                  key={item.id}
                  style={[styles.card, {backgroundColor: item.backgroundColor}]}>
                  <Image source={{uri: item.image}} style={styles.cardImage} />
                  <View style={styles.cardContent}>
                    <Text style={styles.cardTitle}>{item.title}</Text>
                    <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
                  </View>
                  <AntDesign name="right" size={18} color="#fff" />
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
    backgroundColor: '#7F2A04',
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
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 15,
    // padding: 10,
    height: 100,
  },
  cardImage: {
    width: 140,
    height: 100,
    // borderRadius: 10,
    marginRight: 10,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#f0f0f0',
  },
});

export default Chalisa

