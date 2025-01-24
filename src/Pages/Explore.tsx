import { View, Text } from 'react-native'
import React from 'react'
import ExploreNavbar from '../Component/ExploreNavbar'

const Explore = () => {
  return (
    <View style={{paddingHorizontal: '4%'}}>
      <ExploreNavbar />
      <View
        style={{
          backgroundColor: '#FFA500',
          borderRadius: 20,
          borderBottomWidth: 5,
          borderBottomColor: 'rgba(255,165,0,0.5)',
        }}>
        <Text>Blogs</Text>
      </View>
      <View
        style={{
          backgroundColor: '#FFA500',
          borderRadius: 20,
          borderBottomWidth: 5,
          borderBottomColor: 'rgba(255,165,0,0.5)',
        }}>
        <Text>Library</Text>
      </View>
      <View
        style={{
          backgroundColor: '#FFA500',
          borderRadius: 20,
          borderBottomWidth: 5,
          borderBottomColor: 'rgba(255,165,0,0.5)',
        }}>
        <Text>Suvichar</Text>
      </View>
    </View>
  );
}

export default Explore