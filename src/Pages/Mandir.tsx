import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MandirNavbar from '../Component/MandirNavbar';
import MandirCard from '../Component/MandirCard';

const Mandir = () => {
  // const [selectedState, setSelectedState] = useState('Choose State');
  const [selectedState, setSelectedState] = useState('Choose State');
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const handleStateSelection = (state: string) => {
    setSelectedState(state);
    setDropdownVisible(false); // Close the dropdown after selection
  };

  const states = [
    'Uttar Pradesh',
    'Rajasthan',
    'Madhya Pradesh',
    'Maharashtra',
    'Gujarat',
    'Tamil Nadu',
    'Kerala',
    'Punjab',
    'Bihar',
    // Add more states as needed
  ];

  return (
    <View style={{paddingHorizontal: '4%',  backgroundColor: '#fff'}}>
      <MandirNavbar />

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Icon
            name="search"
            size={24}
            color="#FF8901"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for Mandir"
            placeholderTextColor="#666"
          />
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={{fontSize: 20}}>|</Text>
          <Image
            source={{
              uri: 'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/Puja-Prasad-App/Puja/kalash.png',
            }}
            style={styles.rightIcon}
          />
        </View>
      </View>

      {/* Horizontal Filters */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterContainer}>
        {[
          {
            id: 1,
            name: 'All God',
            icon: 'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/Puja-Prasad-App/Puja/all_god.png',
          },
          {
            id: 2,
            name: 'Brahma',
            icon: 'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/Puja-Prasad-App/Puja/bhramFilter.png',
          },
          {
            id: 3,
            name: 'Durga',
            icon: 'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/Puja-Prasad-App/Puja/durgafilter.png',
          },
          {
            id: 4,
            name: 'Ganesha',
            icon: 'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/Puja-Prasad-App/Puja/ganeshFilter.png',
          },
          {
            id: 5,
            name: 'Krishna',
            icon: 'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/Puja-Prasad-App/Puja/krishna.png',
          },
        ].map(filter => (
          <View key={filter.id} style={styles.filterItem}>
            <Image source={{uri: filter.icon}} style={styles.filterIcon} />
            <Text style={styles.filterText}>{filter.name}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Choose State Dropdown */}
      <View style={styles.dropdownContainer}>
        <TouchableOpacity style={styles.dropdown} onPress={toggleDropdown}>
          <Text style={styles.dropdownText}>{selectedState}</Text>
          <Icon
            name={isDropdownVisible ? 'arrow-drop-up' : 'arrow-drop-down'}
            size={24}
            color="#666"
          />
        </TouchableOpacity>

        {/* Dropdown List */}
        {isDropdownVisible && (
          <View style={styles.dropdownList}>
            {states.map((state, index) => (
              <TouchableOpacity
                key={index}
                style={styles.dropdownItem}
                onPress={() => handleStateSelection(state)}>
                <Text style={styles.dropdownItemText}>{state}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
      <View>
        <MandirCard/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.4)',
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    width: '100%',
    height: 50,
    marginTop: 20,
  },
  searchIcon: {
    marginRight: 5,
  },
  searchInput: {
    fontSize: 16,
    color: '#000',
  },
  rightIcon: {
    width: 24,
    height: 24,
  },
  filterContainer: {
    marginTop: 20,
  },
  filterItem: {
    alignItems: 'center',
    marginRight: 20,
  },
  filterIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 5,
  },
  filterText: {
    fontSize: 14,
    color: '#000',
    textAlign: 'center',
  },
  dropdownContainer: {
    marginTop: 20,
  },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#fff',
    width: '100%',
  },
  dropdownText: {
    fontSize: 16,
    color: '#666',
  },
  dropdownList: {
    marginTop: 5,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 5,
    display: 'flex', // Toggle this to 'flex' when dropdown is active
  },
  dropdownItem: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  dropdownItemText: {
    fontSize: 16,
    color: '#000',
  },
});

export default Mandir;
