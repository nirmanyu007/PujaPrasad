import React, {useEffect, useState} from 'react';
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
import axios from 'axios';

const Mandir = () => {
  // const [selectedState, setSelectedState] = useState('Choose State');
  const [selectedState, setSelectedState] = useState('Choose State');
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [data, setData] = useState<any>({mandirs: []}); // ✅ Default structure

  const [states, setStates] = useState<any[]>([]);
  const [stateFilter, setStateFilter] = useState('');
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [godFilter, setGodFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [templeFilter, setTempleFilter] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [searchOptions, setSearchOptions] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [resultsCount, setResultsCount] = useState<number>(0);

  const staticStates = [
    'Himachal Pradesh',
    'Punjab',
    'Haryana',
    'Rajasthan',
    'Uttar Pradesh',
  ];

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://192.168.1.7:5001/fetch-active-mandirs`,
        );
        setData(response.data);
        setFilteredData(response.data.mandirs);

        // Mandir List
        const uniqueStates = Array.from(
          new Set(response.data.mandirs.map((temple: any) => temple.state)),
        ).map(state => {
          const temple = response.data.mandirs.find(
            (t: any) => t.state === state,
          );
          return {
            name: temple?.state || '',
            value: state,
          };
        });
        setStates([{name: 'All States', value: ''}, ...uniqueStates]);

        // States List
        const uniqueSearchOptions = Array.from(
          new Set(response.data.mandirs.map((temple: any) => temple.nameID)),
        )
          .map(nameID => {
            const temple = response.data.mandirs.find(
              (t: any) => t.nameID === nameID,
            );
            return {
              value: temple?.nameEnglish || '',
              filter: nameID,
            };
          })
          .filter(option => option.value);
        setSearchOptions(uniqueSearchOptions);
      } catch (err) {
        setError('Failed to fetch data');
        console.error(`Error occuring: ${err}`);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (data && Array.isArray(data.mandirs)) {
      const filteredMandirs = data.mandirs.filter((temple: any) => {
        // Check all filters
        const matchesGodFilter = godFilter
          ? temple.godName?.some((god: string) =>
              god.toLowerCase().includes(godFilter.toLowerCase()),
            )
          : true;
        const matchesStateFilter = stateFilter
          ? temple.state?.toLowerCase() === stateFilter.toLowerCase()
          : true;
        const matchesTempleFilter = templeFilter
          ? temple.nameID?.toLowerCase().includes(templeFilter.toLowerCase())
          : true;

        return matchesGodFilter && matchesStateFilter && matchesTempleFilter;
      });

      setFilteredData(filteredMandirs);
      setResultsCount(filteredMandirs.length);
    }
  }, [data, godFilter, stateFilter, templeFilter]);

  const handleSearch = (value: string) => {
    setTempleFilter(value);
  };

  const handleGod = (value: string) => {
    setGodFilter(prevValue => (prevValue === value ? '' : value)); // Toggle filter
  };

  const handleStateSelection = (state: string) => {
    setSelectedState(state);
    setDropdownVisible(false);

    if (!data || !data.mandirs || !Array.isArray(data.mandirs)) {
      console.error("Data is not an array or hasn't loaded yet.");
      return;
    }

    const filteredTemples =
      state === 'Choose State'
        ? data.mandirs // Show all temples when "Choose State" is selected
        : data.mandirs.filter((temple: any) => temple.state === state);

    setFilteredData(filteredTemples);
  };

  if (loading)
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  if (error)
    return (
      <View>
        <Text>{error}</Text>
      </View>
    );

  return (
    <View style={{paddingHorizontal: '4%', backgroundColor: '#fff'}}>
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
            onChangeText={handleSearch}
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
            name: 'Shree Krishna',
            icon: 'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/Puja-Prasad-App/Puja/krishna.png',
          },
        ].map(filter => (
          <TouchableOpacity
            key={filter.id}
            style={[
              styles.filterItem,
              godFilter === filter.name && styles.selectedFilter,
              filter.name === 'All God' &&
                godFilter === '' &&
                styles.selectedFilter, // Highlight when "All God" is active
            ]}
            onPress={() =>
              handleGod(filter.name === 'All God' ? '' : filter.name)
            }>
            <Image source={{uri: filter.icon}} style={styles.filterIcon} />
            <Text style={styles.filterText}>{filter.name}</Text>
          </TouchableOpacity>
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
            {staticStates.map((state, index) => (
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
      <View style={{marginVertical: 10}}>
        <Text style={{fontSize: 16, color: '#FF8901', fontWeight: '500'}}>
          Results found: {resultsCount}
        </Text>
      </View>
      <ScrollView style={{marginTop: 0}}>
        {filteredData.map((temple: any, index: number) => (
          <MandirCard
            key={index}
            image={temple.mandirSectionImage}
            name={temple.nameEnglish}
            place={temple.location}
            hoverName={temple.nameHindi}
            id={temple._id}
            templeData={temple} // ✅ Change templeDetails to templeData
          />
        ))}
      </ScrollView>
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
  selectedFilter: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4, // Equivalent to blur
    // elevation: 4, // For Android
    borderColor: '#FFE3B6', // Stroke color
    borderWidth: 2,
    borderRadius: 9,
    // padding: 5,
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
    marginVertical: 10,
    minHeight: 90,
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
    marginTop: 10,
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
    width: '50%',
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
