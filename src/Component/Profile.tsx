import React, { useState } from 'react';
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
import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import * as ImagePicker from 'react-native-image-picker';

type StackParamList = {
  PujaDetailPage: undefined;
};

const Profile = () => {
  const [gender, setGender] = useState<string>('Male');
  const [addressType, setAddressType] = React.useState<string>('Home');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isFormVisible, setFormVisible] = useState(false);
  const navigation = useNavigation<NavigationProp<StackParamList>>(); 

  const toggleAddressForm = () => {
    setFormVisible(!isFormVisible);
  };

  const handleGoBack = () => {
    navigation.goBack(); // Navigate back to the previous screen
  };

  const handleEditPicture = () => {
    ImagePicker.launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: false, // Use base64 only if needed
      },
      response => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorCode) {
          console.error('ImagePicker Error: ', response.errorMessage);
        } else if (response.assets && response.assets.length > 0) {
          setSelectedImage(response.assets[0].uri || null); // Safely set the selected image URI
        }
      },
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <AntDesign
          onPress={handleGoBack}
          name="arrowleft"
          size={23}
          color="black"
        />
        <Text style={styles.headerText}>Edit Profile</Text>
      </View>
      {/* Profile Picture */}
      <View style={styles.profilePictureContainer}>
        <View style={styles.profilePicture}>
          {selectedImage ? (
            <Image
              source={{uri: selectedImage}}
              style={styles.image}
              resizeMode="cover"
            />
          ) : (
            // <Text style={styles.placeholderText}>No Photo</Text>
            // <EvilIcons name="user" size={110} />
            <View
              style={{
                borderWidth: 2,
                borderColor: 'black',
                padding: 40,
                borderRadius: 500,
              }}
            />
          )}
          <TouchableOpacity
            style={styles.editButton}
            onPress={handleEditPicture}>
            {/* <Text style={styles.editButtonText}>Edit</Text> */}
            <AntDesign name="edit" color="#FF8901" size={15} />
          </TouchableOpacity>
        </View>
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
        <TouchableOpacity
          style={styles.radioOption}
          onPress={() => setGender('Male')}>
          <View
            style={[
              styles.radioButton,
              {borderColor: gender === 'Male' ? '#FF5704' : '#000'},
            ]}>
            <FontAwesome
              name="male"
              size={15}
              color={gender === 'Male' ? '#FF5704' : '#000'}
            />
          </View>
          <Text style={styles.optionLabel}>Male</Text>
        </TouchableOpacity>
        <View style={styles.radioOption}>
          <TouchableOpacity
            style={styles.radioOption}
            onPress={() => setGender('Female')}>
            <View
              style={[
                styles.radioButton,
                {borderColor: gender === 'Female' ? '#FF5704' : '#000'},
              ]}>
              <FontAwesome
                name="female"
                size={15}
                color={gender === 'Female' ? '#FF5704' : '#000'}
              />
            </View>
            <Text style={styles.optionLabel}>Female</Text>
          </TouchableOpacity>
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

      {/* Contact Details */}

      <View style={styles.addAddressContainer}>
        <Text style={styles.sectionHeader}>
          Add Address for Prasad Delivery
          <AntDesign name="infocirlceo" size={15} color="red" />
        </Text>
        <TouchableOpacity
          style={styles.addAddressButton}
          onPress={toggleAddressForm}>
          <AntDesign name="home" size={20} color="white" />
          <Text style={styles.addAddressButtonText}>
            {isFormVisible ? 'Hide Address Form' : 'Add Address'}
          </Text>
        </TouchableOpacity>
      </View>
      {isFormVisible && (
        <View>
          {/* Address Details */}
          <Text style={styles.sectionHeader}>
            Add Address for Prasad Delivery
          </Text>
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
        </View>
      )}
      {!isFormVisible && (
        <Image
          source={{
            uri: 'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/Puja-Prasad-App/HomePage/prasadDeliveey.png', // Replace with your actual image URL
          }}
          style={styles.addressImage}
        />
      )}
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
    backgroundColor: '#FFFEFA',
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
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
  placeholderText: {
    color: '#666',
  },
  editButton: {
    position: 'absolute',
    bottom: 10,
    right: 5,
    // backgroundColor: '#007bff',
    borderRadius: 15,
    paddingHorizontal: 4,
    paddingVertical: 4,
    borderWidth: 2,
    borderColor: '#FF8901',
  },
  editButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  profilePictureContainer: {
    alignItems: 'center',
    // marginBottom: 15,
  },
  addressImage: {
    width: '100%',
    height: 200,
    // marginBottom: 10,
    resizeMode: 'contain',
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    // backgroundColor: '#ccc',
    alignItems: 'center',
    // justifyContent:'center'
  },
  decorativeImage: {
    width: 200,
    height: 50,
    // marginTop: 10,
    resizeMode: 'contain',
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: '600',
    marginVertical: 10,
    color: 'black',
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
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  iconInside: {
    width: 16,
    height: 16,
    tintColor: '#ffffff', // Ensures icon color contrasts with the background
  },
  optionLabel: {
    fontSize: 14,
    color: '#000',
  },
  saveButton: {
    backgroundColor: '#FF5704',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    // marginTop: 20,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  addAddressContainer: {
    // marginVertical: 20,
  },
  addAddressButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 50,
    width: 200,
    justifyContent: 'center',
    // marginTop: 10,
  },
  addAddressButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 10,
  },
});

export default Profile;
