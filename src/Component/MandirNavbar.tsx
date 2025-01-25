import { View, Text, Image } from 'react-native'
import React from 'react'
import Antdesign from 'react-native-vector-icons/AntDesign';

const MandirNavbar = () => {
  return (
    <View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
              paddingTop:'3%',
              alignItems:'center'
            }}>
            <View
              style={{
                backgroundColor: 'white',
                borderRadius: 1000,
                // borderColor: '#666161',
                // borderWidth:2,
                padding: 5,
                shadowColor: 'rgba(0, 0, 0, 1)', // Color of the shadow
                shadowOffset: {width: 0, height: 0}, // Horizontal and vertical offset
                shadowOpacity: 1, // Opacity of the shadow
                shadowRadius: 4, // Blur radius
                elevation: 4, // For Android
              }}>
              <Antdesign name="bars" size={30} color="#666161" />
            </View>
            <View style={{display: 'flex', alignItems: 'center'}}>
              <Text style={{color: '#FE6505', fontSize: 20, fontWeight: 600}}>
              Mandir
              </Text>
              
            </View>
            <View
              style={{
                backgroundColor: 'white',
                borderRadius: 1000,
                // borderColor: '#666161',
                // borderWidth:2,
                padding: 5,
                shadowColor: 'rgba(0, 0, 0, 1)', // Color of the shadow
                shadowOffset: {width: 0, height: 0}, // Horizontal and vertical offset
                shadowOpacity: 1, // Opacity of the shadow
                shadowRadius: 4, // Blur radius
                elevation: 4, // For Android
              }}>
              <Image
                source={{
                  uri: 'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/Puja-Prasad-App/HomePage/Bell.png',
                }}
                style={{
                  width: 25, // Adjust width
                  height: 25, // Adjust height
                  resizeMode: 'contain', // Optional, keeps aspect ratio
                }}
              />
            </View>
          </View>
        </View>
  )
}

export default MandirNavbar