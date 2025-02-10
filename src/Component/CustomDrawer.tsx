import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import {DrawerContentComponentProps} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import GoogleAuth from './GoogleAuth';
import {AuthContext} from './AuthContext';

const CustomDrawer: React.FC<DrawerContentComponentProps> = props => {
  // Use the global AuthContext
  const auth = useContext(AuthContext);

  // Local states for expandable sections
  const [isShareExpanded, setShareExpanded] = useState(false);
  const [isMoreExpanded, setMoreExpanded] = useState(false);
  const [isMyBookingExpanded, setMyBookingExpanded] = useState(false);

  if (!auth) {
    return null;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <Image
          source={{
            uri: 'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/Puja-Prasad-App/Puja/loogoo.png',
          }}
          style={{width: 14, height: 20}}
        />
        <Text style={styles.headerTitle}>Vedic Vaibhav</Text>
      </View>

      {/* Profile Section */}
      <View style={styles.header}>
        {auth.isSignedIn ? (
          <>
            <Image
              source={
                auth.user?.photo
                  ? {uri: auth.user.photo}
                  : {
                      uri: 'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/Puja-Prasad-App/HomePage/user.png',
                    } // Use a local placeholder image
              }
              style={styles.profileImage}
            />
            <View style={styles.headerTextContainer}>
              <Text style={styles.username}>{auth.user?.name}</Text>
              <Text style={styles.completeProfile}>{auth.user?.email}</Text>
            </View>
          </>
        ) : (
          <>
            <View style={styles.profileImage} />
            <View style={styles.headerTextContainer}>
              <Text style={styles.username}>UserName</Text>
              <Text style={styles.completeProfile}>Complete your Profile</Text>
            </View>
          </>
        )}
      </View>

      {/* Account Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>
        {auth.isSignedIn && (
          <>
            <TouchableOpacity
              style={[styles.drawerItem1, styles.itemShadow]}
              onPress={() => props.navigation.navigate('Profile')}>
              <Icon name="person" size={20} color="#FF5704" />
              <Text style={styles.drawerText}>My Profile</Text>
            </TouchableOpacity>
            {/* My Booking with Dropdown */}
            <TouchableOpacity
              style={[styles.drawerItem, styles.itemShadow]}
              onPress={() => setMyBookingExpanded(!isMyBookingExpanded)}>
              <View style={styles.row}>
                <Icon name="bookmark" size={20} color="#FF5704" />
                <Text style={styles.drawerText}>My Booking</Text>
              </View>
              <Icon
                name={isMyBookingExpanded ? 'chevron-up' : 'chevron-down'}
                size={20}
                color="#FF5704"
              />
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
          </>
        )}

        {/* Share & Connect Section */}
        <TouchableOpacity
          style={[styles.expandableItem, styles.itemShadow]}
          onPress={() => setShareExpanded(!isShareExpanded)}>
          <View style={styles.row}>
            <Icon name="share-social" size={20} color="#FF5704" />
            <Text style={styles.drawerText}>Share & Connect</Text>
          </View>
          <Icon
            name={isShareExpanded ? 'chevron-up' : 'chevron-down'}
            size={20}
            color="#FF5704"
          />
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
          style={[styles.drawerItem1, styles.itemShadow]}
          onPress={() => props.navigation.navigate('About')}>
          <Icon name="information-circle" size={20} color="#FF5704" />
          <Text style={styles.drawerText}>About Vedic Vaibhav</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.drawerItem1, styles.itemShadow]}>
          <Icon name="refresh" size={20} color="#FF5704" />
          <Text style={styles.drawerText}>Update Your App</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.drawerItem1, styles.itemShadow]}>
          <Icon name="help-circle" size={20} color="#FF5704" />
          <Text style={styles.drawerText}>Help Center</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.drawerItem1, styles.itemShadow]}
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

      {/* GoogleAuth Section */}
      <View>
        {/* 
          When the user is logged in globally (via auth.isSignedIn), the GoogleAuth 
          component will display a logout button. Otherwise, it shows the sign-in button.
        */}
        <GoogleAuth
          onSignIn={auth.login}
          onSignOut={auth.logout}
          isSignedIn={auth.isSignedIn}
        />
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>ver 2.41</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},
  headerContainer: {
    backgroundColor: '#FF8901',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: '4%',
    paddingVertical: '4%',
  },
  headerTitle: {fontSize: 18, color: 'white', paddingLeft: '2%'},
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTextContainer: {flex: 1},
  username: {fontSize: 16, fontWeight: 'bold', color: 'black'},
  completeProfile: {fontSize: 12, color: 'rgba(0,0,0,0.6)'},
  section: {padding: 10},
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
  drawerText: {fontSize: 16, marginLeft: 10, color: '#333'},
  expandableItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  subItems: {paddingLeft: 40},
  subItem: {paddingVertical: 5},
  subItemText: {fontSize: 14, color: '#555'},
  footer: {
    padding: 20,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#f4f4f4',
  },
  footerText: {fontSize: 14, color: '#999'},
  row: {flexDirection: 'row', alignItems: 'center'},
  itemShadow: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.25,
    shadowRadius: 1,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.25)',
    borderRadius: 7,
  },
});

export default CustomDrawer;
