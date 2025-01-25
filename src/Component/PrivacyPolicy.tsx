import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import Antdesign from 'react-native-vector-icons/AntDesign';

const PrivacyPolicy = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerContainer}>
        <Antdesign
          name="arrowleft"
          size={24}
          color="black"
          style={styles.backIcon}
        />
        <Text style={styles.title}>Terms & Condition</Text>
      </View>

      <Text style={styles.updatedText}>Last updated: 23-01-2025</Text>
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
  updatedText: {
    fontSize: 14,
    color: '#FF5722',
    marginBottom: 16,
    textAlign: 'center',
  },
});

export default PrivacyPolicy;
