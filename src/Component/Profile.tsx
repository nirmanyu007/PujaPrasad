import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
// import {Picker} from '@react-native-picker/picker';
import {RadioButton} from 'react-native-paper'; // Install if not present using `npm install react-native-paper`
import AntDesign from 'react-native-vector-icons/AntDesign';

const Profile = () => {
  const [gender, setGender] = React.useState<string>('');
  const [addressType, setAddressType] = React.useState<string>('Home');

  return (
    <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
                <AntDesign name="arrowleft" size={23} color="black" />
                <Text style={styles.headerText}>Edit Profile</Text>
              </View>
      {/* Profile Picture */}
      <View style={styles.profilePictureContainer}>
        <View style={styles.profilePicture} />
        <Image
          source={{
            uri: 'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/Puja-Prasad-App/HomePage/bar.png',
          }}
          style={styles.decorativeImage}
        />
      </View>

      {/* Basic Details */}
      <Text style={styles.sectionHeader}>Basic Details</Text>
      <TextInput placeholder="First Name" style={styles.input} />
      <TextInput placeholder="Last Name" style={styles.input} />

      {/* Gender */}
      <Text style={styles.sectionHeader}>Gender</Text>
      <View style={styles.radioGroup}>
        <View style={styles.radioOption}>
          <RadioButton
            value="Male"
            status={gender === 'Male' ? 'checked' : 'unchecked'}
            onPress={() => setGender('Male')}
          />
          <Text>Male</Text>
        </View>
        <View style={styles.radioOption}>
          <RadioButton
            value="Female"
            status={gender === 'Female' ? 'checked' : 'unchecked'}
            onPress={() => setGender('Female')}
          />
          <Text>Female</Text>
        </View>
        <View style={styles.radioOption}>
          <RadioButton
            value="Other"
            status={gender === 'Other' ? 'checked' : 'unchecked'}
            onPress={() => setGender('Other')}
          />
          <Text>Other</Text>
        </View>
      </View>

      {/* Contact Details */}
      <TextInput
        placeholder="Email ID"
        style={styles.input}
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Mobile"
        style={styles.input}
        keyboardType="phone-pad"
      />

      {/* Address Details */}
      <Text style={styles.sectionHeader}>Add Address for Prasad Delivery</Text>
      <TextInput placeholder="Name" style={styles.input} />
      <TextInput
        placeholder="Phone"
        style={styles.input}
        keyboardType="phone-pad"
      />
      <TextInput placeholder="Address 1" style={styles.input} />
      <TextInput placeholder="Address 2" style={styles.input} />
      <TextInput placeholder="Landmark" style={styles.input} />
      <TextInput placeholder="State" style={styles.input} />
      <TextInput placeholder="City" style={styles.input} />

      {/* State and City */}
      {/* <Picker style={styles.picker}>
        <Picker.Item label="Select State" value="" />
        <Picker.Item label="State 1" value="state1" />
        <Picker.Item label="State 2" value="state2" />
      </Picker> */}
      <TextInput
        placeholder="Pincode"
        style={styles.input}
        keyboardType="number-pad"
      />
      {/* <Picker style={styles.picker}>
        <Picker.Item label="Select City" value="" />
        <Picker.Item label="City 1" value="city1" />
        <Picker.Item label="City 2" value="city2" />
      </Picker> */}

      {/* Address Type */}
      <View style={styles.radioGroup}>
        <View style={styles.radioOption}>
          <RadioButton
            value="Home"
            status={addressType === 'Home' ? 'checked' : 'unchecked'}
            onPress={() => setAddressType('Home')}
          />
          <Text>Home</Text>
        </View>
        <View style={styles.radioOption}>
          <RadioButton
            value="Work"
            status={addressType === 'Work' ? 'checked' : 'unchecked'}
            onPress={() => setAddressType('Work')}
          />
          <Text>Work</Text>
        </View>
        <View style={styles.radioOption}>
          <RadioButton
            value="Other"
            status={addressType === 'Other' ? 'checked' : 'unchecked'}
            onPress={() => setAddressType('Other')}
          />
          <Text>Other</Text>
        </View>
      </View>

      {/* Save Button */}
      <TouchableOpacity style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    // paddingHorizontal: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: '600',
    color: 'black',
    marginLeft: 10,
  },
  profilePictureContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#ccc',
  },
  decorativeImage: {
    width: 200,
    height: 50,
    marginTop: 10,
    resizeMode: 'contain',
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: '600',
    marginVertical: 10,
    color: '#FF5704',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  picker: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 10,
  },
  radioGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  saveButton: {
    backgroundColor: '#FF5704',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Profile;
