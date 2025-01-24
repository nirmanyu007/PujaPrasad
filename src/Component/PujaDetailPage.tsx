import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';

const PujaDetailPage: React.FC = () => {
  const [whatsAppNumber, setWhatsAppNumber] = useState('');
  const [bhaktaName, setBhaktaName] = useState('');
  const [gotra, setGotra] = useState('');
  const [dontKnowGotra, setDontKnowGotra] = useState(false);
  const [receivePrasad, setReceivePrasad] = useState(true);
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState({
    name: '',
    address1: '',
    address2: '',
    landmark: '',
    state: '',
    pincode: '',
    city: '',
  });
  const [confirmAddress, setConfirmAddress] = useState(false);

  const handlePayment = () => {
    Alert.alert('Payment', 'Proceeding to payment...');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Fill Your Details</Text>

      <Text style={styles.label}>Your WhatsApp Number</Text>
      <TextInput
        style={styles.input}
        keyboardType="phone-pad"
        placeholder="Enter WhatsApp Number"
        value={whatsAppNumber}
        onChangeText={setWhatsAppNumber}
      />
      <Text style={styles.note}>
        📢 Vedic Vaibhav team will contact you on WhatsApp. Please provide your
        WhatsApp number.
      </Text>

      <Text style={styles.label}>Fill the name of the Bhakta & Gotra</Text>
      <TextInput
        style={styles.input}
        placeholder="Full Bhakta Name"
        value={bhaktaName}
        onChangeText={setBhaktaName}
      />
      <TextInput
        style={styles.input}
        placeholder="Gotra"
        value={gotra}
        onChangeText={setGotra}
        editable={!dontKnowGotra}
      />
      <TouchableOpacity
        style={styles.checkboxContainer}
        onPress={() => setDontKnowGotra(!dontKnowGotra)}>
        <View style={styles.checkbox}>
          {dontKnowGotra && <View style={styles.checkboxTick} />}
        </View>
        <Text style={styles.checkboxLabel}>I don’t know my gotra</Text>
      </TouchableOpacity>

      <Text style={styles.label}>
        Would you like to receive the Prasad box?
      </Text>
      <View style={styles.toggleContainer}>
        <TouchableOpacity
          style={[
            styles.toggleButton,
            receivePrasad && styles.activeToggleButton,
          ]}
          onPress={() => setReceivePrasad(true)}>
          <Text style={styles.toggleText}>Yes</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.toggleButton,
            !receivePrasad && styles.activeToggleButton,
          ]}
          onPress={() => setReceivePrasad(false)}>
          <Text style={styles.toggleText}>No</Text>
        </TouchableOpacity>
      </View>

      {receivePrasad && (
        <>
          <Text style={styles.label}>Contact Info</Text>
          <TextInput
            style={styles.input}
            keyboardType="phone-pad"
            placeholder="Enter mobile number"
            value={mobileNumber}
            onChangeText={setMobileNumber}
          />
          <TextInput
            style={styles.input}
            keyboardType="email-address"
            placeholder="Email address"
            value={email}
            onChangeText={setEmail}
          />

          <Text style={styles.label}>Address</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            value={address.name}
            onChangeText={value => setAddress({...address, name: value})}
          />
          <TextInput
            style={styles.input}
            placeholder="Address 1"
            value={address.address1}
            onChangeText={value => setAddress({...address, address1: value})}
          />
          <TextInput
            style={styles.input}
            placeholder="Address 2"
            value={address.address2}
            onChangeText={value => setAddress({...address, address2: value})}
          />
          <TextInput
            style={styles.input}
            placeholder="Landmark"
            value={address.landmark}
            onChangeText={value => setAddress({...address, landmark: value})}
          />
          <TextInput
            style={styles.input}
            placeholder="State"
            value={address.state}
            onChangeText={value => setAddress({...address, state: value})}
          />
          <TextInput
            style={styles.input}
            placeholder="Pincode"
            keyboardType="numeric"
            value={address.pincode}
            onChangeText={value => setAddress({...address, pincode: value})}
          />
          <TextInput
            style={styles.input}
            placeholder="City"
            value={address.city}
            onChangeText={value => setAddress({...address, city: value})}
          />

          <TouchableOpacity
            style={styles.checkboxContainer}
            onPress={() => setConfirmAddress(!confirmAddress)}>
            <View style={styles.checkbox}>
              {confirmAddress && <View style={styles.checkboxTick} />}
            </View>
            <Text style={styles.checkboxLabel}>
              Confirm Your Delivery Address
            </Text>
          </TouchableOpacity>
        </>
      )}

      <TouchableOpacity style={styles.paymentButton} onPress={handlePayment}>
        <Text style={styles.paymentButtonText}>Make Payment</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
    fontSize: 14,
  },
  note: {
    fontSize: 12,
    color: '#888',
    marginBottom: 16,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxTick: {
    width: 12,
    height: 12,
    backgroundColor: '#4CAF50',
  },
  checkboxLabel: {
    fontSize: 14,
  },
  toggleContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  toggleButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeToggleButton: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  toggleText: {
    color: '#fff',
  },
  paymentButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
  },
  paymentButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PujaDetailPage;
