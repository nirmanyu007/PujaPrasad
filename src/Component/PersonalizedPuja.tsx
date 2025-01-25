import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {useNavigation, NavigationProp} from '@react-navigation/native';

type StackParamList = {
  PujaDetail: undefined;
  Congratulation: undefined; // Define any params if required, e.g., { id: number }
};

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
  const [bhaktaDetails, setBhaktaDetails] = useState<
    {name: string; gotra: string}[]
  >([]);
  const [currentBhakta, setCurrentBhakta] = useState({name: '', gotra: ''});
  const [showBhaktaForm, setShowBhaktaForm] = useState(false);

  const handleInputChange = (key: string, value: string) => {
    setFormData({...formData, [key]: value});
  };

  const handleBhaktaChange = (key: string, value: string) => {
    setCurrentBhakta({...currentBhakta, [key]: value});
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setFormData({...formData, pujaDate: selectedDate});
    }
  };

  const addBhakta = () => {
    if (currentBhakta.name && currentBhakta.gotra) {
      setBhaktaDetails([...bhaktaDetails, currentBhakta]);
      setCurrentBhakta({name: '', gotra: ''}); // Reset current Bhakta fields
    }
  };
  const navigation = useNavigation<NavigationProp<StackParamList>>();

  const handlePress = () => {
    navigation.navigate('Congratulation'); // TypeScript compatibility
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
      <TextInput
        style={styles.input}
        placeholder="Mobile number"
        keyboardType="phone-pad"
        value={formData.mobileNumber}
        onChangeText={text => handleInputChange('mobileNumber', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email address"
        keyboardType="email-address"
        value={formData.email}
        onChangeText={text => handleInputChange('email', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Occasion"
        value={formData.occasion}
        onChangeText={text => handleInputChange('occasion', text)}
      />
      <TouchableOpacity
        style={styles.datePicker}
        onPress={() => setShowDatePicker(true)}>
        <Text style={styles.datePickerText}>
          Select Puja date: {formData.pujaDate.toDateString()}
        </Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={formData.pujaDate}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}
      <TextInput
        style={[styles.input, styles.description]}
        placeholder="Description"
        multiline
        value={formData.description}
        onChangeText={text => handleInputChange('description', text)}
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setShowBhaktaForm(!showBhaktaForm)}>
        <Text style={styles.addButtonText}>
          {showBhaktaForm ? 'Hide Bhakta Form' : '+ Add Bhakta'}
        </Text>
      </TouchableOpacity>
      {bhaktaDetails.length > 0 && (
        <View style={styles.bhaktaList}>
          <Text style={styles.bhaktaHeader}>Bhakta Details</Text>
          {bhaktaDetails.map((bhakta, index) => (
            <View key={index} style={styles.bhaktaItem}>
              <Text style={styles.bhaktaText}>Name: {bhakta.name}</Text>
              <Text style={styles.bhaktaText}>Gotra: {bhakta.gotra}</Text>
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
        }}>
        <TouchableOpacity onPress={handlePress} style={{padding: 10}}>
          <Text
            style={{color: '#fff', textAlign: 'center', fontWeight: 'bold', fontSize:16}}>
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
    marginBottom:200
  },
  header: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color:'black'
  },
  subHeader: {
    fontSize: 12,
    color: 'rgba(0,0,0,0.6)',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
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
    marginBottom: 15,
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
    backgroundColor: '#F5F5F5',
    padding: 10,
    borderRadius: 5,
    marginBottom: 30,
  },
  bhaktaText: {
    fontSize: 14,
  },
});

export default PersonalizedPuja;
