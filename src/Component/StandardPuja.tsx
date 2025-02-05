import React, {useEffect, useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CardBox from './CardBox';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';

type PoojaMandirList = {
  mandirId: string; // Assuming mandirId is a string representing the Mandir's _id
  originalPrice: number;
  discountPrice: number;
  poojaMandirTime: string;
  poojaMandirDates: string;
  poojaMandirBenefits: string;
  _id: string;
};

type Puja = {
  _id: string;
  poojaID: string;
  title: string;
  titleHindi?: string; // Optional
  poojaGod: string;
  moolmantra: string;
  mandirLists: PoojaMandirList[];
  poojaCardBenefit: string;
  poojaDescription: string;
  poojaCardImage: string;
  images: string[];
  isActive: boolean;
  isExclusive: boolean;
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

type Mandir = {
  _id: string;
  nameEnglish: string;
  poojaMandirDates: string;
};

const PujaPage = () => {
  const navigation = useNavigation();
  const [activeFilter, setActiveFilter] = useState('All Puja');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [activeTab, setActiveTab] = useState<string>('All');
  const [pujaData, setPujaData] = useState<Puja[]>([]);
  const [mandirMap, setMandirMap] = useState<{[key: string]: Mandir}>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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

  useEffect(() => {
    const fetchPujaData = async () => {
      try {
        const response = await axios.get(
          `http://192.168.1.30:5001/fetch-all-pooja`,
        );
        const processedPoojas: Puja[] = response.data.poojas.map(
          (puja: any) => ({
            ...puja,
            poojaCardBenefit: puja.poojaCardBenefit,
            poojaDescription: puja.poojaDescription,
          }),
        );
        setPujaData(processedPoojas);

        const mandirIdsSet = new Set<string>();
        processedPoojas.forEach(puja => {
          puja.mandirLists.forEach(mandir => {
            mandirIdsSet.add(mandir.mandirId);
          });
        });

        const uniqueMandirIds = Array.from(mandirIdsSet);

        const fetchMandirs = uniqueMandirIds.map(id =>
          axios
            .get(`http://192.168.1.30:5001/fetch-mandir-by-id/${id}`)
            .then(res => res.data.mandir as Mandir)
            .catch(err => {
              console.error(`Error fetching mandir with ID ${id}:`, err);
              return null;
            }),
        );

        const mandirResponses = await Promise.all(fetchMandirs);
        const validMandirs = mandirResponses.filter(
          (mandir: Mandir | null) => mandir !== null,
        ) as Mandir[];

        const mandirDataMap: {[key: string]: Mandir} = {};
        validMandirs.forEach((mandir: Mandir) => {
          mandirDataMap[mandir._id] = mandir;
        });
        setMandirMap(mandirDataMap);
        console.log('Mandir Map:', mandirDataMap);
      } catch (err: any) {
        console.error('There was an error fetching the Puja data!', err);
        setError('No poojas available right now. We will get back soon.');
      } finally {
        setLoading(false);
      }
    };

    fetchPujaData();
  }, []);

  // const samplePujaData = [
  //   {
  //     id: '1',
  //     pujaId: 'Rudrabhishek',
  //     title: 'Rudrabhishek (5 Shastri)',
  //     description:
  //       'The Mahamrityunjay Jaap offers protection from negative forces and aids in healing and recovery from...',
  //     location: 'Kashi Vishwanath Temple, Varanasi, Uttar Pradesh, India',
  //     date: '17 December, Tuesday',
  //     price: '₹850/-',
  //     imageUri:
  //       'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/Puja-Prasad-App/Puja/rudra-min.png',
  //   },

  //   {
  //     id: '2',
  //     pujaId: 'Hawan',
  //     title: 'Navagraha Hawan',
  //     description:
  //       'Navagraha Hawan helps reduce the malefic effects of planets and boosts positive energies...',
  //     location: 'ISKCON Temple, Bengaluru, Karnataka, India',
  //     date: '22 December, Sunday',
  //     price: '₹950/-',
  //     imageUri:
  //       'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/Puja-Prasad-App/Puja/navagraha_hawan.png',
  //   },
  //   {
  //     id: '3',
  //     pujaId: 'Puja',
  //     title: 'Ganesha Puja',
  //     description:
  //       'Ganesha Puja is performed to remove obstacles and bring success and prosperity in life...',
  //     location: 'Siddhivinayak Temple, Mumbai, Maharashtra, India',
  //     date: '20 December, Friday',
  //     price: '₹600/-',
  //     imageUri:
  //       'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/Puja-Prasad-App/Puja/ganesha_puja.png',
  //   },
  //   {
  //     id: '4',
  //     pujaId: 'Sringar',
  //     title: 'Durga Maa Sringar Puja',
  //     description:
  //       'Performed to honor Goddess Durga with ornaments, flowers, and offerings to seek her blessings...',
  //     location: 'Vaishno Devi Temple, Jammu & Kashmir, India',
  //     date: '25 December, Wednesday',
  //     price: '₹1200/-',
  //     imageUri:
  //       'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/Puja-Prasad-App/Puja/durga_sringar.png',
  //   },
  // ];

  const filteredPujaData = pujaData.filter(({title}) => {
    const matchesSearch = title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesFilter =
      activeFilter === 'All Puja' ||
      title.toLowerCase().includes(activeFilter.toLowerCase()); // Check active filter
    return matchesSearch && matchesFilter;
  });

  console.log('Active Filter:', activeFilter);
  console.log('Filtered Data:', filteredPujaData);

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
            value={searchTerm} // Bind the value to the state
            onChangeText={text => setSearchTerm(text)} // Update state as user types
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
      <View style={{width: '100%', paddingTop: '4%', paddingBottom: 100}}>
        <FlatList
          data={filteredPujaData}
          keyExtractor={item => item._id}
          renderItem={({item}) => {
            const mandirDetails = item.mandirLists.map(
              mandir =>
                mandirMap[mandir.mandirId]?.nameEnglish || 'Unknown Mandir',
            );

            // ✅ Extract the first date from the array (if available)
            const rawDateArray = item.mandirLists[0]?.poojaMandirDates;
            const rawDate = Array.isArray(rawDateArray)
              ? rawDateArray[0]
              : rawDateArray;

            // ✅ Ensure the date is a valid string before slicing
            const formattedDate =
              rawDate && typeof rawDate === 'string' && rawDate.includes('T')
                ? rawDate.split('T')[0] // ✅ Extract YYYY-MM-DD
                : rawDate || 'No date available'; // ✅ Handle missing dates

            // ✅ Debugging: Log the raw and formatted date
            console.log('Raw Date:', rawDate);
            console.log('Formatted Date:', formattedDate);

            return (
              <CardBox
                id={item._id}
                title={item.title}
                description={item.poojaCardBenefit}
                location={mandirDetails.join(', ')}
                date={formattedDate} // ✅ Now correctly formatted
                price={`₹${item.mandirLists[0]?.discountPrice || 'N/A'}`}
                imageUri={item.poojaCardImage}
              />
            );
          }}
          contentContainerStyle={{paddingBottom: 20}}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    display: 'flex',
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
