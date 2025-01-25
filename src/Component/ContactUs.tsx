import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ImageBackground,
} from 'react-native';
import Antdesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ContactUs = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerContainer}>
        <Antdesign
          name="arrowleft"
          size={24}
          color="black"
          style={styles.backIcon}
        />
        <Text style={styles.title}>Vedic Vaibhav</Text>
      </View>

      <Text style={styles.contactHeader}>Contact Us</Text>
      <Text style={styles.subHeader}>
        Feel free to reach out to us with any questions or feedback—just drop us
        a message!
      </Text>

      <Text style={styles.instruction}>
        Complete the form, and our team will respond within 24 hours!
      </Text>

      <View style={styles.formContainer}>
        <TextInput style={styles.input} placeholder="First Name" />
        <TextInput style={styles.input} placeholder="Last Name" />
        <TextInput
          style={styles.input}
          placeholder="Email Id"
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Phone No.*"
          keyboardType="phone-pad"
        />
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Message*"
          multiline
          numberOfLines={4}
        />
      </View>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Send Message</Text>
      </TouchableOpacity>

      <ImageBackground
        source={{
          uri: 'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/Puja-Prasad-App/HomePage/contact.png',
        }}
        style={styles.imageBackground}
        resizeMode="cover">
        <View style={styles.overlay}>
          <Text style={styles.contactDetail}>
            <Ionicons name="call" size={18} /> +91 7880652040
          </Text>
          <Text style={styles.contactDetail}>
            <Antdesign name="mail" size={18} /> support@vedicvaibhav.com
          </Text>
          <Text style={styles.contactDetail}>
            <Ionicons name="location" size={18} /> Chandigarh, India
          </Text>
        </View>
      </ImageBackground>
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
  contactHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  subHeader: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    marginBottom: 16,
  },
  instruction: {
    fontSize: 14,
    textAlign: 'center',
    color: '#999',
    marginBottom: 16,
  },
  formContainer: {
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontSize: 14,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#FF5722',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  imageBackground: {
    height: 179,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    borderRadius: 8,
    overflow: 'hidden',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contactDetailsContainer: {
    alignItems: 'center',
    marginTop: 16,
  },
  contactDetail: {
    fontSize: 14,
    marginBottom: 8,
    color: '#fff',
  },
});

export default ContactUs;
