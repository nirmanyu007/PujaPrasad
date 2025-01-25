import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
// import { Image } from 'react-native-reanimated/lib/typescript/Animated';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Suvichar = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <AntDesign name="arrowleft" size={23} color="black" />
        <Text style={styles.headerText}>Suvichar</Text>
      </View>

      {/* Quote Box */}
      <View style={styles.quoteBox}>
        <Image
          source={{
            uri: 'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/Puja-Prasad-App/Puja/DesignUp.png', // Replace with actual image URL
          }}
          style={{width: 137, height: 37}}
        />
        <Text style={styles.quoteText}>
          जो हुआ, वह अच्छा हुआ  जो हो रहा है, वह भी अच्छा हो रहा है 
          जो होगा, वह भी अच्छा ही होगा
        </Text>
        <Image
          source={{
            uri: 'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/Puja-Prasad-App/Puja/designDown.png', // Replace with actual image URL
          }}
          style={{width: 137, height: 37}}
        />
      </View>
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
    // paddingHorizontal: 20,
    // paddingVertical: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: '600',
    color: 'black',
    marginLeft: 10,
  },
  quoteBox: {
    backgroundColor: '#E6B079',
    borderRadius: 10,
    padding: 20,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quoteText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: 24,
  },
});

export default Suvichar;
