import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
  TextInput,
  ScrollView,
  FlatList,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

type RootStackParamList = {
  Address: undefined;
  Cart: undefined;
};

type AddressDetailsType = {
  name: string;
  phone: string;
  address1: string;
  address2?: string;
  landmark?: string;
  state: string;
  pincode: string;
  city: string;
  addressType: 'Home' | 'Work' | 'Other';
};

const Address = () => {
    const navigation =
      useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [modalVisible, setModalVisible] = useState(false);
  const [address, setAddress] = useState('');
  const [addresses, setAddresses] = useState<AddressDetailsType[]>([]);
  const [selectedAddressIndex, setSelectedAddressIndex] = useState<
    number | null
  >(null); // Selected address state
  const [addressDetails, setAddressDetails] = useState<AddressDetailsType>({
    name: '',
    phone: '',
    address1: '',
    address2: '',
    landmark: '',
    state: '',
    pincode: '',
    city: '',
    addressType: 'Home', // This is valid as 'Home' | 'Work' | 'Other'
  });

  const handleSaveAddress = () => {
    console.log('Saved Address Details:', addressDetails);

    // Add the new address to the addresses array
    setAddresses(prevAddresses => [...prevAddresses, addressDetails]);

    // Close the modal and reset the form
    setModalVisible(false);
    setAddressDetails({
      name: '',
      phone: '',
      address1: '',
      address2: '',
      landmark: '',
      state: '',
      pincode: '',
      city: '',
      addressType: 'Home', // Reset to a valid value
    });
  };
  const handleDeleteAddress = (index: number): void => {
    const updatedAddresses = [...addresses];
    updatedAddresses.splice(index, 1);
    setAddresses(updatedAddresses);

    // Update selectedAddressIndex if the deleted address was selected
    if (selectedAddressIndex === index) {
      setSelectedAddressIndex(null);
    } else if (selectedAddressIndex !== null && selectedAddressIndex > index) {
      setSelectedAddressIndex(selectedAddressIndex - 1);
    }
  };
  const handleMakePayment = () => {
    if (selectedAddressIndex !== null) {
      const selectedAddress = addresses[selectedAddressIndex];
      console.log('Proceeding with address:', selectedAddress);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={addresses}
        keyExtractor={(item, index) => index.toString()}
        ListHeaderComponent={
          <>
            {/* Header */}
            <View style={styles.header}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Entypo
                  onPress={() => navigation.goBack()}
                  name="cross"
                  size={24}
                  color="#000"
                />
                <Text style={styles.headerText}>Address</Text>
              </View>
              <TouchableOpacity>
                <Text style={styles.clearButton}>Clear</Text>
              </TouchableOpacity>
            </View>

            <View style={{alignItems: 'center', paddingVertical: '5%'}}>
              <Image
                source={{
                  uri: 'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/Puja-Prasad-App/Puja/cart_address.png',
                }}
                style={{width: 160, height: 50}}
              />
            </View>
            <View style={{alignItems: 'center'}}>
              <Image
                source={{
                  uri: 'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/Puja-Prasad-App/Puja/address.png',
                }}
                style={{width: 210, height: 215}}
              />
            </View>

            {/* Add New Address Button */}
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => setModalVisible(true)}>
              <Text style={styles.addButtonText}>Add New Address</Text>
            </TouchableOpacity>
          </>
        }
        renderItem={({item, index}) => (
          <View
            style={[
              styles.addressCard,
              selectedAddressIndex === index && styles.selectedAddressCard,
            ]}>
            <View style={styles.addressHeader}>
              <Text style={styles.addressName}>
                {item.name} |{' '}
                <Text style={styles.addressType}>{item.addressType}</Text>
              </Text>
              <View style={styles.actionButtons}>
                <TouchableOpacity style={styles.editButton}>
                  <Feather name="edit" size={16} color="#007BFF" />
                  <Text style={styles.editButtonText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => handleDeleteAddress(index)}>
                  <Feather name="trash" size={16} color="#FF0000" />
                  <Text style={styles.deleteButtonText}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
            <Text style={styles.addressText}>{item.address1}</Text>
            {item.address2 ? (
              <Text style={styles.addressText}>{item.address2}</Text>
            ) : null}
            <Text style={styles.addressText}>
              {item.city}, {item.state} {item.pincode}
            </Text>
            <Text style={styles.addressText}>Mobile: {item.phone}</Text>

            {/* Radio Button */}
            <TouchableOpacity
              style={styles.radioOption}
              onPress={() => setSelectedAddressIndex(index)}>
              <View
                style={[
                  styles.radioCircle,
                  selectedAddressIndex === index && styles.radioSelected,
                ]}
              />
              <Text style={styles.radioLabel}>Deliver Here</Text>
            </TouchableOpacity>
          </View>
        )}
        ListFooterComponent={null}
      />
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={[
            styles.makePaymentButton,
            selectedAddressIndex === null && styles.disabledButton,
          ]}
          onPress={handleMakePayment}
          disabled={selectedAddressIndex === null}>
          <Text style={styles.makePaymentText}>Make Payment</Text>
        </TouchableOpacity>
      </View>

      {/* Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add New Address</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Entypo name="cross" size={24} color="#000" />
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.modalForm}>
              <TextInput
                style={styles.input}
                placeholder="Name"
                value={addressDetails.name}
                onChangeText={text =>
                  setAddressDetails({...addressDetails, name: text})
                }
              />
              <TextInput
                style={styles.input}
                placeholder="Phone"
                keyboardType="phone-pad"
                value={addressDetails.phone}
                onChangeText={text =>
                  setAddressDetails({...addressDetails, phone: text})
                }
              />
              <TextInput
                style={styles.input}
                placeholder="Address 1"
                value={addressDetails.address1}
                onChangeText={text =>
                  setAddressDetails({...addressDetails, address1: text})
                }
              />
              <TextInput
                style={styles.input}
                placeholder="Address 2"
                value={addressDetails.address2}
                onChangeText={text =>
                  setAddressDetails({...addressDetails, address2: text})
                }
              />
              <TextInput
                style={styles.input}
                placeholder="Landmark"
                value={addressDetails.landmark}
                onChangeText={text =>
                  setAddressDetails({...addressDetails, landmark: text})
                }
              />
              <TextInput
                style={styles.input}
                placeholder="State"
                value={addressDetails.state}
                onChangeText={text =>
                  setAddressDetails({...addressDetails, state: text})
                }
              />
              <View style={styles.row}>
                <TextInput
                  style={[styles.input, styles.halfInput]}
                  placeholder="Pincode"
                  keyboardType="numeric"
                  value={addressDetails.pincode}
                  onChangeText={text =>
                    setAddressDetails({...addressDetails, pincode: text})
                  }
                />
                <TextInput
                  style={[styles.input, styles.halfInput]}
                  placeholder="City"
                  value={addressDetails.city}
                  onChangeText={text =>
                    setAddressDetails({...addressDetails, city: text})
                  }
                />
              </View>
              <View style={styles.radioGroup}>
                {['Home', 'Work', 'Other'].map(type => (
                  <TouchableOpacity
                    key={type}
                    style={styles.radioOption}
                    onPress={() =>
                      setAddressDetails(prevDetails => ({
                        ...prevDetails,
                        addressType: type as 'Home' | 'Work' | 'Other', // Explicitly type `type`
                      }))
                    }>
                    <View
                      style={[
                        styles.radioCircle,
                        addressDetails.addressType === type &&
                          styles.radioSelected,
                      ]}
                    />
                    <Text style={styles.radioLabel}>{type}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleSaveAddress}>
              <Text style={styles.saveButtonText}>Save Address</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  selectedAddressCard: {
    borderColor: '#28a745',
    borderWidth: 2,
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#28a745',
    marginRight: 8,
  },
  radioSelected: {
    backgroundColor: '#28a745',
  },
  radioLabel: {
    fontSize: 14,
    color: '#333',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  clearButton: {
    fontSize: 14,
    color: '#FF0000',
  },
  addButton: {
    borderWidth: 1,
    borderColor: '#28a745',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginHorizontal: 16,
  },
  addButtonText: {
    color: '#28a745',
    fontWeight: 'bold',
    fontSize: 16,
  },
  addressCard: {
    padding: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginVertical: 8,
    backgroundColor: '#fff',
  },
  addressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  addressName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  addressType: {
    color: '#28a745',
    fontWeight: 'bold',
  },
  actionButtons: {
    flexDirection: 'row',
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  editButtonText: {
    color: '#007BFF',
    fontSize: 14,
    marginLeft: 4,
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#FF0000',
    fontSize: 14,
    marginLeft: 4,
  },
  addressText: {
    fontSize: 14,
    color: '#666',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    width: '90%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalForm: {
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 8,
    width: '100%',
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInput: {
    width: '48%',
  },
  radioGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 16,
  },

  saveButton: {
    backgroundColor: '#28a745',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  bottomContainer: {
    // position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: 16,
    backgroundColor: '#fff',
  },
  makePaymentButton: {
    backgroundColor: '#28a745',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  makePaymentText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Address;
