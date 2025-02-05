import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  Animated
} from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import DateTimePicker from '@react-native-community/datetimepicker';
import {useNavigation, NavigationProp} from '@react-navigation/native';

type StackParamList = {
  PujaDetail: undefined;
  Congratulation: undefined; // Define any params if required, e.g., { id: number }
};

interface Bhakta {
  name: string;
  gotra: string;
}

interface FormErrors {
  name?: string;
  mobileNumber?: string;
  email?: string;
  occasion?: string;
  pujaDate?: string;
  description?: string;
}

interface FormData {
  name: string;
  mobileNumber: string;
  email: string;
  occasion: string;
  pujaDate: Date;
  description: string;
}

const PersonalizedPuja = () => {
  const [formData, setFormData] = useState({
    name: '',
    mobileNumber: '',
    email: '',
    occasion: '',
    pujaDate: new Date(),
    description: '',
  });

  const [showDatePicker, setShowDatePicker] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
  const [bhaktaDetails, setBhaktaDetails] = useState<
    {name: string; gotra: string}[]
  >([]);
  const [currentBhakta, setCurrentBhakta] = useState({name: '', gotra: ''});
  const [showBhaktaForm, setShowBhaktaForm] = useState(false);
  const slideAnim = useRef(new Animated.Value(-300)).current; // Use useRef to persist the animated value

  // State for validation errors
  const [errors, setErrors] = useState({
    name: '',
    mobileNumber: '',
    email: '',
    occasion: '',
    pujaDate: '',
    description: '',
  });

  // State to track if the form is valid
  const [isValid, setIsValid] = useState(false);

  const handleInputChange = (key: string, value: string) => {
    setFormData({...formData, [key]: value});
    setErrors({...errors, [key]: ''}); // Clear the error when the user types
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setFormData({...formData, pujaDate: selectedDate});
      setErrors({...errors, pujaDate: ''}); // Clear the error for pujaDate
    }
  };
  const handleBhaktaChange = (key: string, value: string) => {
    setCurrentBhakta({...currentBhakta, [key]: value});
  };

  const validateForm = () => {
    const newErrors = {
      name: formData.name.trim() ? '' : 'Please fill your name',
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

    // If there are no errors, form is valid
    const isFormValid = Object.values(newErrors).every(error => error === '');
    setIsValid(isFormValid);
    return isFormValid;
  };

  const handlePress = () => {
    if (validateForm()) {
      navigation.navigate('Congratulation'); // Navigate only if the form is valid
    }
  };
  const addBhakta = () => {
    if (currentBhakta.name && currentBhakta.gotra) {
      setBhaktaDetails([...bhaktaDetails, currentBhakta]);
      setCurrentBhakta({name: '', gotra: ''}); // Reset current Bhakta fields
    }
  };
  const onDelete = (index: number) => {
    const updatedBhaktaDetails = bhaktaDetails.filter((_, i) => i !== index);
    setBhaktaDetails(updatedBhaktaDetails);
  };

  const navigation = useNavigation<NavigationProp<StackParamList>>();

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

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Fill the Form</Text>
      <Text style={styles.subHeader}>
        Please fill out the form accurately to ensure proper Puja arrangements
        and a meaningful spiritual experience.
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        value={formData.name}
        onChangeText={text => handleInputChange('name', text)}
      />
      {errors.name ? <Text style={styles.errorText}>{errors.name}</Text> : null}

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
      <TouchableOpacity
        style={styles.addButton}
        // onPress={() => setShowBhaktaForm(!showBhaktaForm)}
        onPress={toggleModal}>
        <Text style={styles.addButtonText}>
          {showBhaktaForm ? 'Hide Bhakta Form' : '+ Add Bhakta'}
        </Text>
      </TouchableOpacity>

      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
        onRequestClose={toggleModal}>
        <View style={{flex: 1, justifyContent: 'flex-end'}}>
          <Animated.View
            style={[styles.modalView, {transform: [{translateY: slideAnim}]}]}>
            <TouchableOpacity
              style={{
                position: 'absolute',
                top: 10,
                right: 10,
                zIndex: 1,
                backgroundColor: 'transparent',
              }}
              onPress={toggleModal}>
              <Text style={{fontSize: 18, color: 'black', fontWeight: 'bold'}}>
                ✕
              </Text>
            </TouchableOpacity>
            <Text
              style={{
                color: 'black',
                fontSize: 16,
                fontWeight: '700',
                textAlign: 'center',
              }}>
              ADD BHAKT DETAILS
            </Text>
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
              <TouchableOpacity
                style={{
                  backgroundColor: 'white',
                  width: 110,
                  borderRadius: 25,
                  marginTop: 15,
                }}
                onPress={() => {
                  setBhaktaDetails(prev => [...prev, currentBhakta]);
                  setCurrentBhakta({name: '', gotra: ''}); // Reset form
                  toggleModal(); // Optionally close modal
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 16,
                    paddingVertical: 5,
                    color: 'black',
                  }}>
                  Add Bhakta
                </Text>
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

      {showBhaktaForm && (
        <View style={styles.bhaktaForm}>
          <Text style={styles.bhaktaHeader}>Add Bhakta Details</Text>
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={currentBhakta.name}
            onChangeText={text => handleBhaktaChange('name', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Gotra"
            value={currentBhakta.gotra}
            onChangeText={text => handleBhaktaChange('gotra', text)}
          />
          <Button title="Add Bhakta" onPress={addBhakta} />
        </View>
      )}
      <View
        style={{
          backgroundColor: '#1AA11F',
          borderRadius: 10,
          overflow: 'hidden',
          marginBottom: 70,
        }}>
        <TouchableOpacity onPress={handlePress} style={{padding: 10}}>
          <Text
            style={{
              color: '#fff',
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: 16,
            }}>
            Submit Request
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    marginBottom: 200,
  },
  header: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'black',
  },
  subHeader: {
    fontSize: 12,
    color: 'rgba(0,0,0,0.6)',
    marginBottom: 20,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
  },
  modalView: {
    height: 290,
    backgroundColor: '#FFCC4D',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
  },
  input2: {
    borderBottomWidth: 1, // Only bottom border
    borderBottomColor: '#A88732', // Color of the bottom border
    borderWidth: 0,
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
  },
  description: {
    height: 80,
    textAlignVertical: 'top',
  },
  datePicker: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
  },
  datePickerText: {
    color: '#555',
  },
  addButton: {
    marginTop: 10,
    marginBottom: 20,
    alignSelf: 'flex-start',
  },
  addButtonText: {
    color: '#007BFF',
    fontWeight: 'bold',
  },
  bhaktaForm: {
    backgroundColor: '#FFEEAA',
    padding: 15,
    borderRadius: 5,
    marginBottom: 20,
  },
  bhaktaHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  bhaktaList: {
    marginTop: 20,
    // marginBottom: 100,
  },
  bhaktaItem: {
    // backgroundColor: '#F5F5F5',
    padding: 10,
    borderRadius: 5,
    marginBottom: 30,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bhaktaText: {
    fontSize: 14,
  },
  deleteText: {
    color: 'red',
    fontSize: 14,
    // fontWeight: 'bold',
  },
});

export default PersonalizedPuja;
