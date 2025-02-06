import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Linking,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';

// ------------------------------------------------------------------
// Example placeholders. Replace them with real data in your context.
// ------------------------------------------------------------------
const userDetails = {
  user: {
    _id: 'USER123',
  },
};
const templeDetails = {
  _id: 'TEMPLE123',
  nameEnglish: 'Sample Temple',
};
const selectedPuja = {
  _id: 'PUJA123', // For example, if you need to pass a puja ID
  poojaCardImage: 'https://example.com/samplePuja.jpg',
  title: 'Sample Pooja Title',
};
const clickedServices = {
  panditdakshina: true,
  donate: false,
  brahmanbhoj: false,
};
const poojaDate = '2025-01-01';
const poojaTime = '10:00 AM';
/**
 * If your web code uses "id" or "selectedpackage" or "selectedPuja" from route params,
 * be sure to pass them similarly in React Native.
 */

const PujaDetailPage = ({route}: {route: any}) => {
  // 1) Extract props from route.params
  const {packageName, price} = route.params;

  // 2) Basic states for single/partner/familyBhog (up to 6 Bhakta names)
  const [fullName1, setFullName1] = useState('');
  const [fullName2, setFullName2] = useState('');
  const [fullName3, setFullName3] = useState('');
  const [fullName4, setFullName4] = useState('');
  const [fullName5, setFullName5] = useState('');
  const [fullName6, setFullName6] = useState('');

  // 3) For jointFamilyPackage / vipPackage => dynamic array
  const [bhaktaNames, setBhaktaNames] = useState<string[]>(['', '', '', '', '', '']);
  const [gotras, setGotras] = useState<string[]>(['', '', '', '', '', '']);

  // 4) Single gotra for simpler packages
  const [gotra, setGotra] = useState('');
  const [dontKnowGotra, setDontKnowGotra] = useState(false);

  // 5) Prasad selection
  const [receivePrasad, setReceivePrasad] = useState<'yes' | 'no'>('no');

  // 6) Contact Info
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');

  // 7) If prasad = yes => shipping address
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [stateValue, setStateValue] = useState('');
  const [pincode, setPincode] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [confirmAddress, setConfirmAddress] = useState(false);

  // 8) WhatsApp number
  const [whatsAppNumber, setWhatsAppNumber] = useState('');
  const [whatsAppNumberError, setWhatsAppNumberError] = useState('');
  const [mobileNumberError, setMobileNumberError] = useState('');
  const [emailError, setEmailError] = useState('');

  // 9) Shipping address error states
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [address1Error, setAddress1Error] = useState('');
  const [cityError, setCityError] = useState('');
  const [stateValueError, setStateValueError] = useState('');
  const [pincodeError, setPincodeError] = useState('');

  // 10) Bhakta and Gotra error states
  const [bhaktaNameError, setBhaktaNameError] = useState('');
  const [gotraFieldError, setGotraFieldError] = useState('');

  // 11) Additional items for your Bill
  const [additionalRows] = useState([
    // Example of extra charges or line items
    {
      description: 'Pandit Dakshina',
      price: clickedServices.panditdakshina ? 100 : 0,
    },
    {description: 'Donate to Mandir', price: clickedServices.donate ? 200 : 0},
    {description: 'Brahman Bhoj', price: clickedServices.brahmanbhoj ? 350 : 0},
  ]);

  // 12) Sum up total
  const totalPrice = price + additionalRows.reduce((acc, row) => acc + row.price, 0);

  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  const validateForm = () => {
    let valid = true;

    // Validate WhatsApp number (if needed elsewhere, otherwise this block can be commented out)
    if (!whatsAppNumber) {
      setWhatsAppNumberError('Enter WhatsApp number');
      valid = false;
    } else if (whatsAppNumber.length !== 10 || isNaN(Number(whatsAppNumber))) {
      setWhatsAppNumberError('Number should be 10 digits');
      valid = false;
    } else {
      setWhatsAppNumberError('');
    }

    // Validate Mobile number - now compulsory
    if (!mobileNumber) {
      setMobileNumberError('Enter mobile number');
      valid = false;
    } else if (mobileNumber.length !== 10 || isNaN(Number(mobileNumber))) {
      setMobileNumberError('Number should be 10 digits');
      valid = false;
    } else {
      setMobileNumberError('');
    }

    // Validate Email - now compulsory
    if (!email) {
      setEmailError('Enter email address');
      valid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      setEmailError('Enter a valid email address');
      valid = false;
    } else {
      setEmailError('');
    }

    // Validate Bhakta Names: At least one is compulsory.
    if (packageName !== 'jointFamilyPackage' && packageName !== 'vipPackage') {
      const rawNames =
        packageName === 'familyBhogPackage'
          ? [fullName1, fullName2, fullName3, fullName4, fullName5, fullName6]
          : packageName === 'partnerPackage'
          ? [fullName1, fullName2]
          : [fullName1];
      const finalBhaktaNames = rawNames.filter(n => n.trim() !== '');
      if (finalBhaktaNames.length === 0) {
        setBhaktaNameError('At least one bhakta name is required.');
        valid = false;
      } else {
        setBhaktaNameError('');
      }
    } else {
      // For jointFamilyPackage / vipPackage
      if (bhaktaNames.filter(n => n.trim() !== '').length === 0) {
        setBhaktaNameError('At least one bhakta name is required.');
        valid = false;
      } else {
        setBhaktaNameError('');
      }
    }

    // Validate Gotra: For non-joint packages, gotra is compulsory unless user checks "I don't know my gotra"
    if (packageName !== 'jointFamilyPackage' && packageName !== 'vipPackage') {
      if (!dontKnowGotra && gotra.trim() === '') {
        setGotraFieldError("Gotra is required or check 'I don't know my gotra'.");
        valid = false;
      } else {
        setGotraFieldError('');
      }
    }

    // Validate Shipping Address if Prasad is selected (without alerts, using error messages)
    if (receivePrasad === 'yes') {
      if (!firstName.trim()) {
        setFirstNameError('First name is required for Prasad.');
        valid = false;
      } else {
        setFirstNameError('');
      }
      if (!lastName.trim()) {
        setLastNameError('Last name is required for Prasad.');
        valid = false;
      } else {
        setLastNameError('');
      }
      if (!address1.trim()) {
        setAddress1Error('Address is required for Prasad.');
        valid = false;
      } else {
        setAddress1Error('');
      }
      if (!city.trim()) {
        setCityError('City is required for Prasad.');
        valid = false;
      } else {
        setCityError('');
      }
      if (!stateValue.trim()) {
        setStateValueError('State is required for Prasad.');
        valid = false;
      } else {
        setStateValueError('');
      }
      if (!pincode.trim() || pincode.length !== 6 || isNaN(Number(pincode))) {
        setPincodeError('Enter a valid 6-digit pincode.');
        valid = false;
      } else {
        setPincodeError('');
      }
    }

    return valid;
  };

  // -----------------------------
  // Handle Payment (PhonePe)
  // -----------------------------
  const handlePayment = async () => {
    // if (!validateForm()) {
    //   Alert.alert('Validation Error', 'Please fill in all required fields correctly.');
    //   return;
    // }
    try {
      // 1) Build finalBhaktaNames
      let finalBhaktaNames: string[] = [];
      if (packageName === 'jointFamilyPackage' || packageName === 'vipPackage') {
        finalBhaktaNames = bhaktaNames.filter(n => n.trim() !== '');
      } else {
        const rawNames =
          packageName === 'familyBhogPackage'
            ? [fullName1, fullName2, fullName3, fullName4, fullName5, fullName6]
            : packageName === 'partnerPackage'
            ? [fullName1, fullName2]
            : [fullName1];
        finalBhaktaNames = rawNames.filter(n => n.trim() !== '');
      }

      // 2) Build finalGotras
      let finalGotras: string[] = [];
      if (packageName === 'jointFamilyPackage' || packageName === 'vipPackage') {
        finalGotras = gotras.filter(g => g.trim() !== '');
      } else {
        if (!dontKnowGotra && gotra.trim() !== '') {
          finalGotras = [gotra.trim()];
        }
      }

      // 3) Check if address is selected
      const isAddressSelected = receivePrasad === 'yes';

      // 4) Construct booking details, similar to your web code
      const bookingDetails = {
        // IDs
        userID: userDetails.user?._id,
        mandirID: templeDetails?._id,
        poojaID: selectedPuja?._id, // or from route if you pass it

        // Price
        totalPrice: totalPrice,
        bookingDate: new Date().toISOString(),

        // Package
        package: packageName,
        gotra: finalGotras,
        bhaktaNames: finalBhaktaNames,

        // Additional services
        dakshinaToPandit: clickedServices.panditdakshina ? 100 : null,
        donateToMandir: clickedServices.donate ? 200 : null,
        brahmanBhoj: clickedServices.brahmanbhoj ? 350 : null,
        poojaStatus: 'booked',

        // Prasad shipping
        isAddressSelected,
        prasadStatus: 'pending',
        address1: isAddressSelected ? address1 : '',
        address2: isAddressSelected ? address2 : '',
        city: isAddressSelected ? city : '',
        country: isAddressSelected ? country : '',
        email: email, // always send email
        firstname: isAddressSelected ? firstName : '',
        lastname: isAddressSelected ? lastName : '',
        mobile: mobileNumber, // always send mobile number
        state: isAddressSelected ? stateValue : '',
        pincode: isAddressSelected ? parseInt(pincode, 10) || 0 : 0,

        // Some extra fields from your web code
        mandirimage: selectedPuja?.poojaCardImage,
        mandirname: templeDetails?.nameEnglish,
        poojaname: selectedPuja?.title,
        poojadate: poojaDate,
        poojatime: poojaTime,

        // Example: you might want to store the WhatsApp number as well
        whatsAppNumber,
      };

      // 5) Build the payment request object
      const merchantTransactionId = `TXN${Date.now()}`; // example
      const paymentRequest = {
        amount: totalPrice,
        merchantTransactionId,
        merchantUserId: userDetails.user?._id,
        mobileNumber, // for phonepe
        bookingDetails,
      };

      console.log(paymentRequest);

      // 6) Call your backend to initiate phonepe using the updated API endpoint
      const response = await axios.post(
        'http://192.168.1.30:5001/final-payment-phonepe-app',
        paymentRequest,
      );
      if (response.data.paymentUrl) {
        // In a web browser, you'd do window.location.href = ...
        // In React Native, we use Linking to open the payment URL:
        Linking.openURL(response.data.paymentUrl);
      } else {
        Alert.alert('Error', 'Error initiating payment.');
      }
    } catch (error: any) {
      Alert.alert('Payment Failed', error?.message || 'Something went wrong.');
      console.log('Error initiating payment:', error);
    }
  };

  // -----------------------------------------------
  // For jointFamilyPackage / vip => dynamic add/remove
  // -----------------------------------------------
  const handleAddBhakta = () => {
    if (bhaktaNames.length < 15) {
      setBhaktaNames([...bhaktaNames, '']);
      setGotras([...gotras, '']);
    }
  };
  const handleRemoveBhakta = (index: number) => {
    if (bhaktaNames.length > 1) {
      const newBhakta = [...bhaktaNames];
      const newGotra = [...gotras];
      newBhakta.splice(index, 1);
      newGotra.splice(index, 1);
      setBhaktaNames(newBhakta);
      setGotras(newGotra);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.select({ios: 'padding', android: undefined})}
      style={{flex: 1}}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Heading + Back Arrow */}
        <View style={styles.headingRow}>
          <AntDesign onPress={handleGoBack} name="arrowleft" size={23} color="black" />
          <Text style={styles.heading}>Fill Your Details</Text>
        </View>

        {/*
        // Commented Out: Your WhatsApp Number section
        <Text style={styles.label}>Your WhatsApp Number</Text>
        <TextInput
          style={styles.input1}
          placeholder="Enter WhatsApp Number"
          value={whatsAppNumber}
          onChangeText={setWhatsAppNumber}
          keyboardType="phone-pad"
        />
        {whatsAppNumberError ? (
          <Text style={styles.errorText}>{whatsAppNumberError}</Text>
        ) : null}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingBottom: 10,
          }}>
          <Icon name="whatsapp" color="green" size={20} />
          <Text style={styles.note}>
            Vedic Vaibhav team will contact you on WhatsApp. Please provide your WhatsApp number.
          </Text>
        </View>
        <View style={styles.separator} />
        */}

        {/* Dynamic Bhakta Names */}
        {packageName !== 'jointFamilyPackage' && packageName !== 'vipPackage' ? (
          <>
            <Text style={styles.sectionTitle}>Fill the name of the Bhakta</Text>
            <Text style={styles.sectionNote}>
              Panditji will take these names along with gotra during the puja.
            </Text>

            {(packageName === 'singlePackage' ||
              packageName === 'partnerPackage' ||
              packageName === 'familyBhogPackage') && (
              <>
                {/* Bhakta Name 1 */}
                <TextInput
                  style={styles.input}
                  placeholder="Bhakta Name 1"
                  value={fullName1}
                  onChangeText={setFullName1}
                />
                {/* partner/familyBhog => Bhakta Name 2 */}
                {(packageName === 'partnerPackage' || packageName === 'familyBhogPackage') && (
                  <TextInput
                    style={styles.input}
                    placeholder="Bhakta Name 2"
                    value={fullName2}
                    onChangeText={setFullName2}
                  />
                )}
                {/* familyBhog => Bhakta Name 3 to 6 */}
                {packageName === 'familyBhogPackage' && (
                  <>
                    <TextInput
                      style={styles.input}
                      placeholder="Bhakta Name 3"
                      value={fullName3}
                      onChangeText={setFullName3}
                    />
                    <TextInput
                      style={styles.input}
                      placeholder="Bhakta Name 4"
                      value={fullName4}
                      onChangeText={setFullName4}
                    />
                    <TextInput
                      style={styles.input}
                      placeholder="Bhakta Name 5"
                      value={fullName5}
                      onChangeText={setFullName5}
                    />
                    <TextInput
                      style={styles.input}
                      placeholder="Bhakta Name 6"
                      value={fullName6}
                      onChangeText={setFullName6}
                    />
                  </>
                )}
              </>
            )}
            {bhaktaNameError ? <Text style={styles.errorText}>{bhaktaNameError}</Text> : null}
          </>
        ) : (
          // Joint Family or VIP => dynamic array of bhaktaNames
          <>
            <Text style={styles.sectionTitle}>Fill the Names of the Bhakta</Text>
            <Text style={styles.sectionNote}>
              Please enter the names of all Bhaktas participating in the puja.
            </Text>

            {bhaktaNames.map((name, index) => (
              <View key={index} style={styles.dynamicFieldRow}>
                <TextInput
                  style={[styles.input, {flex: 1}]}
                  placeholder={`Bhakta Name ${index + 1}`}
                  value={bhaktaNames[index]}
                  onChangeText={text => {
                    const updated = [...bhaktaNames];
                    updated[index] = text;
                    setBhaktaNames(updated);
                  }}
                />
                {index >= 6 && (
                  <TouchableOpacity onPress={() => handleRemoveBhakta(index)} style={styles.removeBtn}>
                    <Text style={{color: 'white'}}>X</Text>
                  </TouchableOpacity>
                )}
              </View>
            ))}
            {bhaktaNameError ? <Text style={styles.errorText}>{bhaktaNameError}</Text> : null}
            {bhaktaNames.length < 15 && (
              <TouchableOpacity style={styles.addButton} onPress={handleAddBhakta}>
                <Text style={styles.addButtonText}>+ Add More</Text>
              </TouchableOpacity>
            )}
          </>
        )}

        {/* Gotra */}
        {packageName !== 'jointFamilyPackage' && packageName !== 'vipPackage' ? (
          <>
            <Text style={styles.sectionTitle}>Fill the Gotra</Text>
            <Text style={styles.sectionNote}>
              Gotra will be recited during the puja.
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Gotra"
              value={gotra}
              onChangeText={setGotra}
              editable={!dontKnowGotra}
            />
            {gotraFieldError ? <Text style={styles.errorText}>{gotraFieldError}</Text> : null}
            <TouchableOpacity
              style={styles.checkboxContainer}
              onPress={() => setDontKnowGotra(!dontKnowGotra)}>
              <View style={styles.checkbox}>
                {dontKnowGotra && <View style={styles.checkboxTick} />}
              </View>
              <Text style={styles.checkboxLabel}>I don’t know my gotra</Text>
            </TouchableOpacity>
          </>
        ) : (
          // For jointFamilyPackage / vipPackage => multiple gotras
          <>
            <View style={styles.separator} />
            <Text style={styles.sectionTitle}>Fill the Gotras</Text>
            <Text style={styles.sectionNote}>
              Gotras will be recited during the puja.
            </Text>
            {gotras.map((g, index) => (
              <TextInput
                key={index}
                style={styles.input}
                placeholder={`Gotra ${index + 1}`}
                value={gotras[index]}
                onChangeText={text => {
                  const updated = [...gotras];
                  updated[index] = text;
                  setGotras(updated);
                }}
              />
            ))}
          </>
        )}

        <View style={styles.separator} />
        <Text style={styles.label}>Would you like to receive the Prasad box?</Text>
        <View style={styles.toggleContainer}>
          <TouchableOpacity
            style={[styles.toggleButton, receivePrasad === 'yes' && styles.activeToggleButton]}
            onPress={() => setReceivePrasad('yes')}>
            <Text style={[styles.toggleText, receivePrasad === 'yes' && styles.activeToggleText]}>
              Yes
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.toggleButton, receivePrasad === 'no' && styles.activeToggleButton]}
            onPress={() => setReceivePrasad('no')}>
            <Text style={[styles.toggleText, receivePrasad === 'no' && styles.activeToggleText]}>
              No
            </Text>
          </TouchableOpacity>
        </View>

        {/* If prasad = yes => show shipping address; else => only email + mobile */}
        {receivePrasad === 'yes' ? (
          <>
            <Text style={styles.sectionTitle}>Shipping Address</Text>
            <View style={styles.noteContainer}>
              <Text style={styles.note}>
                The Aashirwad Box will contain divine blessing elements.
              </Text>
            </View>

            <TextInput
              style={styles.input}
              placeholder="First Name"
              value={firstName}
              onChangeText={setFirstName}
            />
            {firstNameError ? <Text style={styles.errorText}>{firstNameError}</Text> : null}
            <TextInput
              style={styles.input}
              placeholder="Last Name"
              value={lastName}
              onChangeText={setLastName}
            />
            {lastNameError ? <Text style={styles.errorText}>{lastNameError}</Text> : null}
            <TextInput
              style={styles.input}
              placeholder="Address 1"
              value={address1}
              onChangeText={setAddress1}
            />
            {address1Error ? <Text style={styles.errorText}>{address1Error}</Text> : null}
            <TextInput
              style={styles.input}
              placeholder="Address 2"
              value={address2}
              onChangeText={setAddress2}
            />
            <TextInput
              style={styles.input}
              placeholder="Pincode"
              value={pincode}
              onChangeText={setPincode}
              keyboardType="numeric"
            />
            {pincodeError ? <Text style={styles.errorText}>{pincodeError}</Text> : null}
            <TextInput
              style={styles.input}
              placeholder="City"
              value={city}
              onChangeText={setCity}
            />
            {cityError ? <Text style={styles.errorText}>{cityError}</Text> : null}
            <TextInput
              style={styles.input}
              placeholder="State"
              value={stateValue}
              onChangeText={setStateValue}
            />
            {stateValueError ? <Text style={styles.errorText}>{stateValueError}</Text> : null}
            <TextInput
              style={styles.input}
              placeholder="Country"
              value={country}
              onChangeText={setCountry}
            />
            <TextInput
              style={styles.input}
              keyboardType="email-address"
              placeholder="Email address"
              value={email}
              onChangeText={setEmail}
            />
            <TextInput
              style={styles.input}
              keyboardType="phone-pad"
              placeholder="Mobile Number"
              value={mobileNumber}
              onChangeText={setMobileNumber}
            />
            <TouchableOpacity
              style={styles.checkboxContainer}
              onPress={() => setConfirmAddress(!confirmAddress)}>
              <View style={styles.checkbox}>
                {confirmAddress && <View style={styles.checkboxTick} />}
              </View>
              <Text style={styles.checkboxLabel}>Confirm Your Delivery Address</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text style={styles.sectionTitle}>Contact Info</Text>
            <View style={styles.noteContainer}>
              <Text style={styles.note}>We will use this to send updates.</Text>
            </View>
            <TextInput
              style={styles.input}
              placeholder="Enter Email Address"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
            {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
            <TextInput
              style={styles.input}
              placeholder="Enter Mobile Number"
              value={mobileNumber}
              onChangeText={setMobileNumber}
              keyboardType="phone-pad"
            />
            {mobileNumberError ? <Text style={styles.errorText}>{mobileNumberError}</Text> : null}
          </>
        )}

        <View style={styles.separator} />
        {/* Bill Details */}
        <Text style={styles.billHeading}>Bill Details</Text>
        <View style={styles.billRow}>
          <Text style={styles.billLabel}>{packageName}</Text>
          <Text style={styles.billValue}>₹ {price}</Text>
        </View>

        {additionalRows.map((row, idx) => {
          if (row.price > 0) {
            return (
              <View style={styles.billRow} key={idx}>
                <Text style={styles.billLabel}>{row.description}</Text>
                <Text style={styles.billValue}>₹ {row.price}</Text>
              </View>
            );
          }
          return null;
        })}

        <View style={styles.billDivider} />
        <View style={styles.billRow}>
          <Text style={[styles.billLabel, {fontWeight: 'bold'}]}>Total</Text>
          <Text style={[styles.billValue, {fontWeight: 'bold'}]}>₹ {totalPrice}</Text>
        </View>

        {/* Payment button */}
        <TouchableOpacity style={styles.paymentButton} onPress={handlePayment}>
          <Text style={styles.paymentButtonText}>Make Payment</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default PujaDetailPage;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  headingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 10,
    marginBottom: 10,
    borderBottomColor: '#EEEEEE',
    borderBottomWidth: 1,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 12,
    color: 'black',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: '600',
    color: '#4D4D4D',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 8,
  },
  input1: {
    borderWidth: 1,
    borderColor: '#FF8901',
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
    fontSize: 14,
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
    color: '#555',
    paddingLeft: 5,
  },
  noteContainer: {
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
    width: 62,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ddd',
    color: 'black',
  },
  toggleText: {
    color: 'black',
  },
  activeToggleText: {
    color: 'white',
  },
  activeToggleButton: {
    backgroundColor: '#FF6505',
    borderColor: '#FF6505',
    color: 'white',
  },
  paymentButton: {
    backgroundColor: '#00BD68',
    borderRadius: 80,
    paddingVertical: 15,
    alignItems: 'center',
    marginVertical: 20,
  },
  paymentButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  separator: {
    height: 10,
    backgroundColor: '#f0f0f0',
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  sectionNote: {
    fontSize: 12,
    color: '#666',
    marginBottom: 16,
  },
  dynamicFieldRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  removeBtn: {
    marginLeft: 8,
    backgroundColor: 'red',
    padding: 8,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  billHeading: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  billRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  billLabel: {
    fontSize: 14,
    color: '#333',
  },
  billValue: {
    fontSize: 14,
    color: '#333',
  },
  billDivider: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 8,
  },
});
