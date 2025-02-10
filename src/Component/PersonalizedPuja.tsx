// src/pages/PersonalizedPuja.tsx
import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  Animated,
  ActivityIndicator,
} from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import DateTimePicker from '@react-native-community/datetimepicker';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import axios from 'axios';

type StackParamList = {
  PujaDetail: undefined;
  Congratulation: undefined;
};

interface FormData {
  firstName: string;
  lastName: string;
  mobileNumber: string;
  email: string;
  occasion: string;
  pujaDate: Date;
  description: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  mobileNumber?: string;
  email?: string;
  occasion?: string;
  pujaDate?: string;
  description?: string;
}

interface Bhakta {
  name: string;
  gotra: string;
}

const PersonalizedPuja: React.FC = () => {
  const navigation = useNavigation<NavigationProp<StackParamList>>();

  // Main form data (without gotra input)
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    mobileNumber: '',
    email: '',
    occasion: '',
    pujaDate: new Date(),
    description: '',
  });

  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [bhaktaDetails, setBhaktaDetails] = useState<Bhakta[]>([]);
  const [currentBhakta, setCurrentBhakta] = useState<Bhakta>({
    name: '',
    gotra: '',
  });
  // (showBhaktaForm is no longer used since we always use modal for bhakta entry)
  const slideAnim = useRef(new Animated.Value(-300)).current; // for bhakta modal slide

  // Validation errors state
  const [errors, setErrors] = useState<FormErrors>({});
  const [isValid, setIsValid] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [successModalVisible, setSuccessModalVisible] =
    useState<boolean>(false);

  const handleInputChange = (key: keyof FormData, value: string) => {
    setFormData({...formData, [key]: value});
    setErrors({...errors, [key]: ''});
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setFormData({...formData, pujaDate: selectedDate});
      setErrors({...errors, pujaDate: ''});
    }
  };

  const handleBhaktaChange = (key: keyof Bhakta, value: string) => {
    setCurrentBhakta({...currentBhakta, [key]: value});
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {
      firstName: formData.firstName.trim() ? '' : 'Please fill your first name',
      lastName: formData.lastName.trim() ? '' : 'Please fill your last name',
      mobileNumber: /^[0-9]{10}$/.test(formData.mobileNumber.trim())
        ? ''
        : 'Mobile number must be 10 digits',
      email: formData.email.trim() ? '' : 'Please enter an email address',
      occasion: formData.occasion.trim() ? '' : 'Please enter the occasion',
      pujaDate: formData.pujaDate ? '' : 'Please select a puja date',
      description: formData.description.trim()
        ? ''
        : 'Please provide a description',
    };

    setErrors(newErrors);
    const formIsValid = Object.values(newErrors).every(error => error === '');
    setIsValid(formIsValid);
    return formIsValid;
  };

  const handlePress = async () => {
    // Validate main form first
    if (!validateForm()) {
      return;
    }
    // If no bhakta details provided, open bhakta modal automatically
    if (bhaktaDetails.length === 0) {
      setErrors(prev => ({
        ...prev,
        firstName: 'Please add at least one Bhakta detail',
      }));
      toggleModal();
      return;
    }
    // Prepare payload according to API mapping.
    const payload = {
      userID: '66e96f2e7d86bec306f4e80d', // Static user id
      firstName: formData.firstName,
      lastName: formData.lastName,
      fullName: bhaktaDetails.map(b => b.name), // Array of bhakta names
      gotra: bhaktaDetails.map(b => b.gotra), // Array of gotra values
      mobile: formData.mobileNumber,
      email: formData.email,
      poojaName: null, // Initially null
      problemName: formData.occasion,
      description: formData.description,
      poojaDate: formData.pujaDate,
      isFromApp: true,
    };

    setSubmitting(true);
    try {
      const response = await axios.post(
        'http://192.168.1.30:5001/add-personalized-pooja-booking',
        payload,
      );
      if (response.status === 201 || response.status === 200) {
        setSuccessModalVisible(true);
        setTimeout(() => {
          setSuccessModalVisible(false);
          resetForm();
        }, 3000);
      }
    } catch (error) {
      console.error('Error adding Pooja booking:', error);
      setErrors(prev => ({
        ...prev,
        description: 'Server error while adding booking.',
      }));
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      mobileNumber: '',
      email: '',
      occasion: '',
      pujaDate: new Date(),
      description: '',
    });
    setBhaktaDetails([]);
  };

  const toggleModal = () => {
    if (modalVisible) {
      Animated.timing(slideAnim, {
        toValue: -300,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setModalVisible(false));
    } else {
      setModalVisible(true);
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  const addBhakta = () => {
    if (currentBhakta.name.trim() && currentBhakta.gotra.trim()) {
      setBhaktaDetails([...bhaktaDetails, currentBhakta]);
      setCurrentBhakta({name: '', gotra: ''});
      toggleModal();
    }
  };

  const onDelete = (index: number) => {
    const updated = [...bhaktaDetails];
    updated.splice(index, 1);
    setBhaktaDetails(updated);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Fill the Form</Text>
      <Text style={styles.subHeader}>
        Please fill out the form accurately to ensure proper Puja arrangements
        and a meaningful spiritual experience.
      </Text>
      <View style={styles.row}>
        <TextInput
          style={[styles.input, {flex: 1, marginRight: 5}]}
          placeholder="First Name"
          value={formData.firstName}
          onChangeText={text => handleInputChange('firstName', text)}
        />
        {errors.firstName ? (
          <Text style={styles.errorText}>{errors.firstName}</Text>
        ) : null}
        <TextInput
          style={[styles.input, {flex: 1, marginLeft: 5}]}
          placeholder="Last Name"
          value={formData.lastName}
          onChangeText={text => handleInputChange('lastName', text)}
        />
      </View>
      {errors.lastName ? (
        <Text style={styles.errorText}>{errors.lastName}</Text>
      ) : null}

      <TextInput
        style={styles.input}
        placeholder="Mobile number"
        keyboardType="phone-pad"
        value={formData.mobileNumber}
        onChangeText={text => handleInputChange('mobileNumber', text)}
      />
      {errors.mobileNumber ? (
        <Text style={styles.errorText}>{errors.mobileNumber}</Text>
      ) : null}

      <TextInput
        style={styles.input}
        placeholder="Email address"
        keyboardType="email-address"
        value={formData.email}
        onChangeText={text => handleInputChange('email', text)}
      />
      {errors.email ? (
        <Text style={styles.errorText}>{errors.email}</Text>
      ) : null}

      <TextInput
        style={styles.input}
        placeholder="Occasion"
        value={formData.occasion}
        onChangeText={text => handleInputChange('occasion', text)}
      />
      {errors.occasion ? (
        <Text style={styles.errorText}>{errors.occasion}</Text>
      ) : null}

      <TouchableOpacity
        style={styles.datePicker}
        onPress={() => setShowDatePicker(true)}>
        <Text style={styles.datePickerText}>
          Select Puja date: {formData.pujaDate.toDateString()}
        </Text>
        <Fontisto name="date" size={20} color="black" />
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={formData.pujaDate}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}
      {errors.pujaDate ? (
        <Text style={styles.errorText}>{errors.pujaDate}</Text>
      ) : null}

      <TextInput
        style={[styles.input, styles.description]}
        placeholder="Description"
        multiline
        value={formData.description}
        onChangeText={text => handleInputChange('description', text)}
      />
      {errors.description ? (
        <Text style={styles.errorText}>{errors.description}</Text>
      ) : null}

      {/* Gotra field removed */}

      <TouchableOpacity style={styles.addButton} onPress={toggleModal}>
        <Text style={styles.addButtonText}>+ Add Bhakta</Text>
      </TouchableOpacity>

      {/* Bhakta Modal */}
      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
        onRequestClose={toggleModal}>
        <View style={{flex: 1, justifyContent: 'flex-end'}}>
          <Animated.View
            style={[styles.modalView, {transform: [{translateY: slideAnim}]}]}>
            <TouchableOpacity style={styles.modalClose} onPress={toggleModal}>
              <Text style={styles.modalCloseText}>✕</Text>
            </TouchableOpacity>
            <Text style={styles.modalHeader}>ADD BHAKT DETAILS</Text>
            <TextInput
              style={styles.input2}
              placeholder="Name"
              value={currentBhakta.name}
              onChangeText={text =>
                setCurrentBhakta(prev => ({...prev, name: text}))
              }
            />
            <TextInput
              style={styles.input2}
              placeholder="Gotra"
              value={currentBhakta.gotra}
              onChangeText={text =>
                setCurrentBhakta(prev => ({...prev, gotra: text}))
              }
            />
            <View
              style={{
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <TouchableOpacity style={styles.modalButton} onPress={addBhakta}>
                <Text style={styles.modalButtonText}>Add Bhakta</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
      </Modal>

      {bhaktaDetails.length > 0 && (
        <View style={styles.bhaktaList}>
          <Text style={styles.bhaktaHeader}>Bhakta Details</Text>
          {bhaktaDetails.map((bhakta, index) => (
            <View key={index} style={styles.bhaktaItem}>
              <Text style={styles.bhaktaText}>{bhakta.name}</Text>
              <Text style={styles.bhaktaText}>{bhakta.gotra}</Text>
              <TouchableOpacity onPress={() => onDelete(index)}>
                <Text style={styles.deleteText}>Delete</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}

      <View style={styles.submitContainer}>
        <TouchableOpacity
          style={styles.submitButton}
          onPress={handlePress}
          disabled={submitting}>
          <Text style={styles.submitButtonText}>Submit Request</Text>
        </TouchableOpacity>
        {submitting && <ActivityIndicator size="large" color="#fff" />}
      </View>

      {/* Success Modal */}
      <Modal
        transparent
        visible={successModalVisible}
        animationType="fade"
        onRequestClose={() => {}}>
        <View style={styles.successModalContainer}>
          <View style={styles.successModal}>
            <Text style={styles.successText}>
              Booking created successfully!
            </Text>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {paddingTop: 20, marginBottom: 200, paddingHorizontal: 20},
  header: {fontSize: 16, fontWeight: 'bold', marginBottom: 5, color: 'black'},
  subHeader: {fontSize: 12, color: 'rgba(0,0,0,0.6)', marginBottom: 20},
  row: {flexDirection: 'column'},
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
  },
  description: {height: 80, textAlignVertical: 'top'},
  datePicker: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  datePickerText: {color: '#555'},
  errorText: {color: 'red', fontSize: 12, marginTop: 5},
  addButton: {marginTop: 10, marginBottom: 20, alignSelf: 'flex-start'},
  addButtonText: {color: '#007BFF', fontWeight: 'bold'},
  modalView: {
    height: 290,
    backgroundColor: '#FFCC4D',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    padding: 20,
  },
  modalClose: {position: 'absolute', top: 10, right: 10, zIndex: 1},
  modalCloseText: {fontSize: 18, color: 'black', fontWeight: 'bold'},
  modalHeader: {
    color: 'black',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 10,
  },
  input2: {
    borderBottomWidth: 1,
    borderBottomColor: '#A88732',
    borderWidth: 0,
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
  },
  modalButton: {
    backgroundColor: 'white',
    width: 110,
    borderRadius: 25,
    marginTop: 15,
    alignSelf: 'center',
  },
  modalButtonText: {
    textAlign: 'center',
    fontSize: 16,
    paddingVertical: 5,
    color: 'black',
  },
  bhaktaList: {marginTop: 20},
  bhaktaHeader: {fontSize: 16, fontWeight: 'bold', marginBottom: 10},
  bhaktaItem: {
    padding: 10,
    borderRadius: 5,
    marginBottom: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bhaktaText: {fontSize: 14},
  deleteText: {color: 'red', fontSize: 14},
  submitContainer: {
    backgroundColor: '#1AA11F',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 70,
  },
  submitButton: {padding: 10},
  submitButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  successModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  successModal: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  successText: {fontSize: 18, fontWeight: 'bold', color: 'green'},
});

export default PersonalizedPuja;
