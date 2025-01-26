import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {DrawerContentComponentProps} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';

const CustomDrawer: React.FC<DrawerContentComponentProps> = props => {
  const [isShareExpanded, setShareExpanded] = useState(false);
  const [isMoreExpanded, setMoreExpanded] = useState(false);
  const [isMyBookingExpanded, setMyBookingExpanded] = useState(false); // State for "My Booking"

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View
        style={{
          backgroundColor: '#FF8901',
          flexDirection: 'row',
          display: 'flex',
          alignItems: 'center',
          paddingLeft: '4%',
          paddingVertical: '4%',
        }}>
        <Image
          source={{
            uri: 'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/Puja-Prasad-App/Puja/loogoo.png', // Replace with actual image URL
          }}
          style={{width: 14, height: 20}}
        />
        <Text style={{fontSize: 18, color: 'white', paddingLeft: '2%'}}>
          Vedic Vaibhav
        </Text>
      </View>
      <View style={styles.header}>
        {/* <AntDesign
          name="user"
          // size={40}
          color="black"
          style={styles.profileImage}
        /> */}
        <View style={styles.profileImage}></View>
        <View style={styles.headerTextContainer}>
          <Text style={styles.username}>UserName</Text>
          <Text style={styles.completeProfile}>Complete your Profile</Text>
        </View>
      </View>

      {/* Account Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>
        <TouchableOpacity
          style={[
            styles.drawerItem1,
            {
              shadowColor: '#000', // Black color
              shadowOffset: {width: 0, height: 1}, // x: 0, y: 1
              shadowOpacity: 0.25, // 0.25 opacity
              shadowRadius: 1, // Blur radius
              // elevation: 2, // Required for Android
              borderBottomWidth: 1,
              borderBottomColor: 'rgba(0,0,0,0.25)',
              borderRadius: 7,
            },
          ]}
          onPress={() => props.navigation.navigate('Profile')}>
          <Icon name="person" size={20} color="#FF5704" />
          <Text style={styles.drawerText}>My Profile</Text>
        </TouchableOpacity>
        {/* My Booking with Dropdown */}
        <TouchableOpacity
          style={[
            styles.drawerItem,
            {
              shadowColor: '#000', // Black color
              shadowOffset: {width: 0, height: 1}, // x: 0, y: 1
              shadowOpacity: 0.25, // 0.25 opacity
              shadowRadius: 1, // Blur radius
              // elevation: 2, // Required for Android
              borderBottomWidth: 1,
              borderBottomColor: 'rgba(0,0,0,0.25)',
              borderRadius: 7,
            },
          ]}
          onPress={() => setMyBookingExpanded(!isMyBookingExpanded)}>
          <View
            style={{
              flexDirection: 'row',
              display: 'flex',
              alignItems: 'center',
            }}>
            <Icon name="bookmark" size={20} color="#FF5704" />
            <Text style={styles.drawerText}>My Booking</Text>
          </View>
          <View>
            <Icon
              name={isMyBookingExpanded ? 'chevron-up' : 'chevron-down'}
              size={20}
              color="#FF5704"
            />
          </View>
        </TouchableOpacity>
        {isMyBookingExpanded && (
          <View style={styles.subItems}>
            <TouchableOpacity
              style={styles.subItem}
              onPress={() => props.navigation.navigate('MyBooking')}>
              <Text style={styles.subItemText}>Puja Booking</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.subItem}
              onPress={() => props.navigation.navigate('MyBooking')}>
              <Text style={styles.subItemText}>Prasad Booking</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Puja Booking Section */}

        {/* Share & Connect */}
        <TouchableOpacity
          style={[
            styles.expandableItem,
            {
              shadowColor: '#000', // Black color
              shadowOffset: {width: 0, height: 1}, // x: 0, y: 1
              shadowOpacity: 0.25, // 0.25 opacity
              shadowRadius: 1, // Blur radius
              // elevation: 2, // Required for Android
              borderBottomWidth: 1,
              borderBottomColor: 'rgba(0,0,0,0.25)',
              borderRadius: 7,
            },
          ]}
          onPress={() => setShareExpanded(!isShareExpanded)}>
          <View
            style={{
              flexDirection: 'row',
              display: 'flex',
              alignItems: 'center',
            }}>
            <Icon name="share-social" size={20} color="#FF5704" />
            <Text style={styles.drawerText}>Share & Connect</Text>
          </View>
          <View>
            <Icon
              name={isShareExpanded ? 'chevron-up' : 'chevron-down'}
              size={20}
              color="#FF5704"
            />
          </View>
        </TouchableOpacity>
        {isShareExpanded && (
          <View style={styles.subItems}>
            <TouchableOpacity style={styles.subItem}>
              <Text style={styles.subItemText}>Share App</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.subItem}>
              <Text style={styles.subItemText}>Invite Friends</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('ContactUs')}
              style={styles.subItem}>
              <Text style={styles.subItemText}>Contact Us</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Other Sections */}
        <TouchableOpacity
          style={[
            styles.drawerItem1,
            {
              shadowColor: '#000', // Black color
              shadowOffset: {width: 0, height: 1}, // x: 0, y: 1
              shadowOpacity: 0.25, // 0.25 opacity
              shadowRadius: 1, // Blur radius
              // elevation: 2, // Required for Android
              borderBottomWidth: 1,
              borderBottomColor: 'rgba(0,0,0,0.25)',
              borderRadius: 7,
            },
          ]}
          onPress={() => props.navigation.navigate('About')}>
          <Icon name="information-circle" size={20} color="#FF5704" />
          <Text style={styles.drawerText}>About Vedic Vaibhav</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.drawerItem1,
            {
              shadowColor: '#000', // Black color
              shadowOffset: {width: 0, height: 1}, // x: 0, y: 1
              shadowOpacity: 0.25, // 0.25 opacity
              shadowRadius: 1, // Blur radius
              // elevation: 2, // Required for Android
              borderBottomWidth: 1,
              borderBottomColor: 'rgba(0,0,0,0.25)',
              borderRadius: 7,
            },
          ]}>
          <Icon name="refresh" size={20} color="#FF5704" />
          <Text style={styles.drawerText}>Update Your App</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.drawerItem1,
            {
              shadowColor: '#000', // Black color
              shadowOffset: {width: 0, height: 1}, // x: 0, y: 1
              shadowOpacity: 0.25, // 0.25 opacity
              shadowRadius: 1, // Blur radius
              // elevation: 2, // Required for Android
              borderBottomWidth: 1,
              borderBottomColor: 'rgba(0,0,0,0.25)',
              borderRadius: 7,
            },
          ]}>
          <Icon name="help-circle" size={20} color="#FF5704" />
          <Text style={styles.drawerText}>Help Center</Text>
        </TouchableOpacity>

        {/* More Options */}
        <TouchableOpacity
          style={[
            styles.drawerItem1,
            {
              shadowColor: '#000', // Black color
              shadowOffset: {width: 0, height: 1}, // x: 0, y: 1
              shadowOpacity: 0.25, // 0.25 opacity
              shadowRadius: 1, // Blur radius
              // elevation: 2, // Required for Android
              borderBottomWidth: 1,
              borderBottomColor: 'rgba(0,0,0,0.25)',
              borderRadius: 7,
            },
          ]}
          onPress={() => setMoreExpanded(!isMoreExpanded)}>
          <Icon name="ellipsis-horizontal" size={20} color="#FF5704" />
          <Text style={styles.drawerText}>More Option</Text>
          <Icon
            name={isMoreExpanded ? 'chevron-up' : 'chevron-down'}
            size={20}
            color="#FF5704"
          />
        </TouchableOpacity>
        {isMoreExpanded && (
          <View style={styles.subItems}>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('TermsCondition')}
              style={styles.subItem}>
              <Text style={styles.subItemText}>Terms & Condition</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('PrivacyPolicy')}
              style={styles.subItem}>
              <Text style={styles.subItemText}>Privacy and Policy</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>ver 2.41</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#FFF4E6',
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
    borderWidth: 2,
    borderColor: 'black',
    justifyContent: 'center', // Center content vertically
    alignItems: 'center', // Center content horizontally
  },
  headerTextContainer: {
    flex: 1,
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  completeProfile: {
    fontSize: 12,
    color: 'rgba(0,0,0,0.6)',
  },
  section: {
    padding: 10,
  },
  sectionTitle: {
    fontSize: 14,
    color: 'rgba(0,0,0,0.5)',
    marginBottom: 5,
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    justifyContent: 'space-between',
  },
  drawerItem1: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  drawerText: {
    fontSize: 16,
    marginLeft: 10,
    color: '#333',
  },
  expandableItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  subItems: {
    paddingLeft: 40,
  },
  subItem: {
    paddingVertical: 5,
  },
  subItemText: {
    fontSize: 14,
    color: '#555',
  },
  footer: {
    padding: 20,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#f4f4f4',
  },
  footerText: {
    fontSize: 14,
    color: '#999',
  },
});

export default CustomDrawer;
