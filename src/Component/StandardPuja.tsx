import React, {useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CardBox from './CardBox';

const PujaPage = () => {
  const [activeFilter, setActiveFilter] = useState('All Puja');

  const filters = [
    {
      label: 'All Puja',
      icon: 'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/Puja-Prasad-App/Puja/om1.png',
    },
    {
      label: 'Rudrabhishek',
      icon: 'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/Puja-Prasad-App/Puja/shivji2.png',
    },
    {
      label: 'Puja',
      icon: 'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/Puja-Prasad-App/Puja/join_hand2.png',
    },
    {
      label: 'Hawan',
      icon: 'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/Puja-Prasad-App/Puja/havan2.png',
    },
    {
      label: 'Sringar',
      icon: 'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/Puja-Prasad-App/Puja/shngar.png',
    },
  ];

  return (
    <View style={styles.container}>
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
            placeholder="Search for Puja"
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

      {/* Filters */}
      <View style={styles.filterContainer}>
        {filters.map((filter, index) => (
          <TouchableOpacity
            key={index}
            style={styles.filter}
            onPress={() => setActiveFilter(filter.label)}>
            <Image source={{uri: filter.icon}} style={styles.filterIcon} />
            <Text style={styles.filterText}>{filter.label}</Text>
            {activeFilter === filter.label && (
              <View style={styles.activeLine} />
            )}
          </TouchableOpacity>
        ))}
      </View>
      <View style={{width:'100%', paddingTop:'4%'}}>
        <CardBox />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    display:'flex'
  },
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
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    marginTop: 20,
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    // paddingBottom: 50,
  },
  filter: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '25%',
  },
  filterIcon: {
    width: 30,
    height: 30,
    marginBottom: 5,
  },
  filterText: {
    fontSize: 12,
    color: '#000',
    textAlign: 'center',
    
  },
  activeLine: {
    width: '70%',
    height: 4,
    backgroundColor: '#FF8901',
    marginTop: 5,
  },
});

export default PujaPage;
