import React, {useEffect, useState} from 'react';
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
  Alert,
  Linking,
} from 'react-native';
import Antdesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

type RootStackParamList = {
  Address: undefined;
  Cart: undefined;
  PrasadCongrets: undefined;
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
  const [addresses, setAddresses] = useState<AddressDetailsType[]>([]);
  const [selectedAddressIndex, setSelectedAddressIndex] = useState<number | null>(null);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [addressDetails, setAddressDetails] = useState<AddressDetailsType>({
    name: '',
    phone: '',
    address1: '',
    address2: '',
    landmark: '',
    state: '',
    pincode: '',
    city: '',
    addressType: 'Home',
  });
  const [errors, setErrors] = useState({
    name: '',
    phone: '',
    address1: '',
    state: '',
    pincode: '',
    city: '',
  });

  useEffect(() => {
    const loadAddresses = async () => {
      try {
        const storedAddresses = await AsyncStorage.getItem('addresses');
        if (storedAddresses) {
          setAddresses(JSON.parse(storedAddresses));
        }
      } catch (error) {
        console.error('Failed to load addresses from storage', error);
      }
    };
    loadAddresses();
  }, []);

  const saveAddressesToStorage = async (updatedAddresses: AddressDetailsType[]) => {
    try {
      await AsyncStorage.setItem('addresses', JSON.stringify(updatedAddresses));
    } catch (error) {
      console.error('Failed to save addresses to storage', error);
    }
  };

  const validateForm = () => {
    const newErrors = {
      name: addressDetails.name.trim() ? '' : 'Please enter name',
      phone: /^[0-9]{10}$/.test(addressDetails.phone.trim())
        ? ''
        : 'Please enter a valid 10-digit phone number',
      address1: addressDetails.address1.trim() ? '' : 'Please enter address line 1',
      state: addressDetails.state.trim() ? '' : 'Please enter state',
      pincode: /^[0-9]{6}$/.test(addressDetails.pincode.trim())
        ? ''
        : 'Please enter a valid 6-digit pincode',
      city: addressDetails.city.trim() ? '' : 'Please enter city',
    };
    setErrors(newErrors);
    return Object.values(newErrors).every(error => error === '');
  };

  const handleSaveAddress = () => {
    if (validateForm()) {
      let updatedAddresses: AddressDetailsType[];
      if (editingIndex !== null) {
        updatedAddresses = addresses.map((addr, index) =>
          index === editingIndex ? addressDetails : addr,
        );
        setEditingIndex(null);
      } else {
        updatedAddresses = [...addresses, addressDetails];
      }
      setAddresses(updatedAddresses);
      saveAddressesToStorage(updatedAddresses);
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
        addressType: 'Home',
      });
      setErrors({
        name: '',
        phone: '',
        address1: '',
        state: '',
        pincode: '',
        city: '',
      });
    }
  };

  const handleClearAddresses = async () => {
    Alert.alert(
      'Clear All Addresses',
      'Are you sure you want to clear all saved addresses?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Clear',
          onPress: async () => {
            try {
              setAddresses([]);
              setSelectedAddressIndex(null);
              await AsyncStorage.removeItem('addresses');
              Alert.alert('Success', 'All addresses have been cleared.');
            } catch (error) {
              console.error('Failed to clear addresses', error);
              Alert.alert('Error', 'Failed to clear addresses.');
            }
          },
        },
      ],
    );
  };

  const handleEditAddress = (index: number) => {
    setAddressDetails(addresses[index]);
    setEditingIndex(index);
    setModalVisible(true);
  };

  const confirmDeleteAddress = (index: number) => {
    Alert.alert(
      'Delete Address',
      'Are you sure you want to delete this address?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => handleDeleteAddress(index),
        },
      ],
    );
  };

  const handleDeleteAddress = (index: number): void => {
    const updatedAddresses = [...addresses];
    updatedAddresses.splice(index, 1);
    setAddresses(updatedAddresses);
    saveAddressesToStorage(updatedAddresses);
    if (selectedAddressIndex === index) {
      setSelectedAddressIndex(null);
    } else if (selectedAddressIndex !== null && selectedAddressIndex > index) {
      setSelectedAddressIndex(selectedAddressIndex - 1);
    }
  };

  const handleInputChange = (field: keyof AddressDetailsType, value: string) => {
    setAddressDetails(prevDetails => ({
      ...prevDetails,
      [field]: value,
    }));
    setErrors(prevErrors => ({
      ...prevErrors,
      [field]: '',
    }));
  };

  // UPDATED: handleMakePayment now retrieves cart items, maps to prasadDeliveries,
  // constructs the address object, logs the payload and calls the API.
  const handleMakePayment = async () => {
    if (selectedAddressIndex !== null) {
      const selectedAddress = addresses[selectedAddressIndex];
      // Retrieve cart items from AsyncStorage (assumed to be stored under 'cartItems')
      const storedCart = await AsyncStorage.getItem('cartItems');
      let cartItems = [];
      if (storedCart) cartItems = JSON.parse(storedCart);
      if (cartItems.length === 0) {
        Alert.alert("No items in cart", "Please add prasad items to cart.");
        return;
      }
      // Map cartItems to the required prasadDeliveries format.
      // IMPORTANT: We now ensure that the mandirID is valid.
      const prasadDeliveries = cartItems.map((item: any) => {
        // Use item._id if available and valid (24 characters), otherwise check item.id.
        let validMandirID = '';
        if (item._id && typeof item._id === 'string' && item._id.length === 24) {
          validMandirID = item._id;
        } else if (item.id && typeof item.id === 'string' && item.id.length === 24) {
          validMandirID = item.id;
        } else {
          // For testing purposes, assign a dummy valid ObjectId.
          validMandirID = "000000000000000000000000";
          console.warn(
            "Invalid mandirID in cart item. Using dummy ObjectId. Item:",
            item,
          );
        }
        return {
          mandirID: validMandirID,
          mandirName: item.title,
          packageName: "Standard Package", // Customize if needed
          prasadPrice:
            typeof item.price === 'number'
              ? item.price
              : parseFloat(item.price.replace(/[^0-9.]/g, '')),
          prasadCount: item.quantity,
          prasadStatus: "pending",
          statusDate: new Date(),
          mandirImage: item.image,
        };
      });
      // Construct the final address object in the expected structure
      const constructedAddress = {
        name: selectedAddress.name,
        address:
          selectedAddress.address1 +
          (selectedAddress.address2 ? `, ${selectedAddress.address2}` : ''),
        landmark: selectedAddress.landmark || '',
        city: selectedAddress.city,
        state: selectedAddress.state,
        country: "India",
        email: "", // Add email if required
        number: selectedAddress.phone,
        pinCode: Number(selectedAddress.pincode),
      };
      const userID = "12345"; // Replace with actual userID from authentication
      const payloadData = {
        userID,
        address: constructedAddress,
        prasadDeliveries,
        sangamPrasadDelivery: [], // Empty since we are booking only prasad items
      };
      console.log("Final payload data being sent to API:", payloadData);
      try {
        const response = await axios.post("http://192.168.1.7:5001/prasad-booking-for-app", payloadData);
        if(response.data.paymentUrl){
          // Open the payment gateway using the returned URL
          Linking.openURL(response.data.paymentUrl);
        } else {
          Alert.alert("Payment initiation failed", response.data.message || "Unknown error");
        }
      } catch(error){
        console.error("Error in payment initiation:", error);
        Alert.alert("Error", "Failed to initiate payment.");
      }
    } else {
      Alert.alert('No Address Selected', 'Please select an address to proceed.');
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={addresses}
        keyExtractor={(item, index) => index.toString()}
        ListHeaderComponent={
          <>
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
              <TouchableOpacity style={{flexDirection: 'row'}} onPress={handleClearAddresses}>
                <Antdesign name="delete" size={20} color="black" />
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
            {addresses.length === 0 && (
              <View style={{alignItems: 'center'}}>
                <Image
                  source={{
                    uri: 'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/Puja-Prasad-App/Puja/address.png',
                  }}
                  style={{width: 210, height: 215}}
                />
              </View>
            )}
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
                {item.name} | <Text style={styles.addressType}>{item.addressType}</Text>
              </Text>
              <View style={styles.actionButtons}>
                <TouchableOpacity onPress={() => handleEditAddress(index)} style={styles.editButton}>
                  <Feather name="edit" size={16} color="#007BFF" />
                  <Text style={styles.editButtonText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.deleteButton} onPress={() => confirmDeleteAddress(index)}>
                  <Feather name="trash" size={16} color="#FF0000" />
                  <Text style={styles.deleteButtonText}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
            <Text style={styles.addressText}>{item.address1}</Text>
            {item.address2 ? <Text style={styles.addressText}>{item.address2}</Text> : null}
            <Text style={styles.addressText}>
              {item.city}, {item.state} {item.pincode}
            </Text>
            <Text style={styles.addressText}>Mobile: {item.phone}</Text>
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
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {editingIndex !== null ? 'Edit Address' : 'Add New Address'}
              </Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Entypo name="cross" size={24} color="#000" />
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.modalForm}>
              <TextInput
                style={styles.input}
                placeholder="Name"
                value={addressDetails.name}
                onChangeText={text => handleInputChange('name', text)}
              />
              {errors.name ? <Text style={styles.errorText}>{errors.name}</Text> : null}
              <TextInput
                style={styles.input}
                placeholder="Phone"
                keyboardType="phone-pad"
                value={addressDetails.phone}
                onChangeText={text => handleInputChange('phone', text)}
              />
              {errors.phone ? <Text style={styles.errorText}>{errors.phone}</Text> : null}
              <TextInput
                style={styles.input}
                placeholder="Address 1"
                value={addressDetails.address1}
                onChangeText={text => handleInputChange('address1', text)}
              />
              {errors.address1 ? <Text style={styles.errorText}>{errors.address1}</Text> : null}
              <TextInput
                style={styles.input}
                placeholder="Address 2 (Optional)"
                value={addressDetails.address2}
                onChangeText={text => handleInputChange('address2', text)}
              />
              <TextInput
                style={styles.input}
                placeholder="Landmark (Optional)"
                value={addressDetails.landmark}
                onChangeText={text => handleInputChange('landmark', text)}
              />
              <TextInput
                style={styles.input}
                placeholder="State"
                value={addressDetails.state}
                onChangeText={text => handleInputChange('state', text)}
              />
              {errors.state ? <Text style={styles.errorText}>{errors.state}</Text> : null}
              <View style={styles.row}>
                <TextInput
                  style={[styles.input, styles.halfInput]}
                  placeholder="Pincode"
                  keyboardType="numeric"
                  value={addressDetails.pincode}
                  onChangeText={text => handleInputChange('pincode', text)}
                />
                {errors.pincode ? <Text style={styles.errorText}>{errors.pincode}</Text> : null}
                <TextInput
                  style={[styles.input, styles.halfInput]}
                  placeholder="City"
                  value={addressDetails.city}
                  onChangeText={text => handleInputChange('city', text)}
                />
                {errors.city ? <Text style={styles.errorText}>{errors.city}</Text> : null}
              </View>
              <View style={styles.radioGroup}>
                <TouchableOpacity
                  style={styles.radioOption}
                  onPress={() => handleInputChange('addressType', 'Home')}>
                  <View
                    style={[
                      styles.radioCircle,
                      addressDetails.addressType === 'Home' && styles.radioSelected,
                    ]}
                  />
                  <Text style={styles.radioLabel}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.radioOption}
                  onPress={() => handleInputChange('addressType', 'Work')}>
                  <View
                    style={[
                      styles.radioCircle,
                      addressDetails.addressType === 'Work' && styles.radioSelected,
                    ]}
                  />
                  <Text style={styles.radioLabel}>Work</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.radioOption}
                  onPress={() => handleInputChange('addressType', 'Other')}>
                  <View
                    style={[
                      styles.radioCircle,
                      addressDetails.addressType === 'Other' && styles.radioSelected,
                    ]}
                  />
                  <Text style={styles.radioLabel}>Other</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
            <TouchableOpacity style={styles.saveButton} onPress={handleSaveAddress}>
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
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  clearButton: {
    fontSize: 14,
    color: 'black',
    paddingLeft: 5,
  },
  addButton: {
    borderWidth: 1,
    borderColor: '#28a745',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginHorizontal: 16,
    marginTop: 16,
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
  selectedAddressCard: {
    borderColor: '#28a745',
    borderWidth: 2,
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
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
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
  radioGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  bottomContainer: {
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
    marginTop: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInput: {
    width: '48%',
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
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 8,
  },
});

export default Address;
