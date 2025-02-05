import { View, Text } from 'react-native'
import React from 'react'

const Splash = () => {
  return (
    <View>
      <View
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: '10%',
        }}>
        <Text style={{color: '#FF651C', fontSize: 24, fontWeight: '600'}}>
          Welcome to Vedic Vaibhav...
        </Text>
      </View>
      <View
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: '5%',
          width:'100%'
          
        }}>
        <Text style={{color: 'black', fontSize: 13, fontWeight: '500',textAlign:'center',width:'70%'}}>
          offering authentic Hindu spiritual services and rituals at your home
          with devotion.
        </Text>
      </View>
    </View>
  );
}

export default Splash