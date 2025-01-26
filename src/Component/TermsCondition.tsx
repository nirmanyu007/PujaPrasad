import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import Antdesign from 'react-native-vector-icons/AntDesign';
import {useNavigation, NavigationProp} from '@react-navigation/native';

type StackParamList = {
  PujaDetail: undefined;
  ViewPujaBooking: undefined; // Define any params if required, e.g., { id: number }
};

const TermsCondition = () => {
  const navigation = useNavigation<NavigationProp<StackParamList>>(); // Get the navigation object
  
     const handleGoBack = () => {
       navigation.goBack(); // Navigate back to the previous screen
     };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerContainer}>
        <Antdesign
          name="arrowleft"
          onPress={handleGoBack}
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

export default TermsCondition;
