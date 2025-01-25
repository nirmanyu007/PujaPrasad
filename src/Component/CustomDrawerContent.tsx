import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import {TouchableOpacity} from 'react-native-gesture-handler';

const CustomDrawerContent: React.FC<DrawerContentComponentProps> = props => {
  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={{flex: 1}} // Ensures the container takes full height
    >
      {/* Main content container */}
      <View style={{flex: 1}}>
        {/* Header with Image and Text */}
        <View style={styles.header}>
          
          <Text style={styles.profileName}>Vedic Vaibhav</Text>
        </View>

        {/* Drawer Items */}
        <View>
          <DrawerItemList {...props} />
        </View>

        {/* Logout Button directly below Drawer Items */}
        <View style={styles.logoutContainer}>
          <TouchableOpacity style={styles.logoutButton}>
            <Text style={styles.logoutText}>LogOut</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Bottom Image fixed to the end of the drawer */}
      <View style={styles.bottomImageContainer}>
        
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#f0f0f0', // Background color for the header
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40, // Circular image
    marginBottom: 10,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  logoutContainer: {
    width: '100%',
    display: 'flex',
    textAlign: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  logoutButton: {
    paddingHorizontal: '5%',
    paddingVertical: '0.7%',
    backgroundColor: '#FF0000',
    width: 155,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 21,
  },
  logoutText: {
    color: 'white',
    fontWeight: '500',
    fontSize: 18,
    paddingVertical: '2%',
  },
  bottomImageContainer: {
    width: '100%',
    height: 150, // Adjust as needed to fit the image
    position: 'absolute',
    bottom: 0,
  },
  bottomImage: {
    width: '100%',
    height: '100%',
  },
});

export default CustomDrawerContent;
