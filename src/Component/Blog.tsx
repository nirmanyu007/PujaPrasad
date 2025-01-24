import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import BlogCard from './BlogCard'; // Import BlogCard component
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

type StackParamList = {
  PujaDetail: undefined;
  PreviewPuja: undefined; // Define any params if required, e.g., { id: number }
};

const Blog: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<string>(''); // Current selected filter
  const navigation = useNavigation<NavigationProp<StackParamList>>();

  const handleGoBack = () => {
    navigation.goBack(); // Navigate back to the previous screen
  };

  const filters = ['New', 'Trending', '#Hanuman', '#Holi', '#Shiva', '#HarHar'];

  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <AntDesign
          onPress={handleGoBack}
          name="arrowleft"
          size={23}
          color="white"
        />
        <Text
          style={{
            color: 'white',
            fontSize: 18,
            fontWeight: 600,
            paddingLeft: '2%',
          }}>
          Blog
        </Text>
      </View>
      <View style={styles.container2}>
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
                    placeholder="Search for Blog"
                    placeholderTextColor="#666"
                  />
                </View>
                
              </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterContainer}>
          {filters.map((filter, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.filterButton,
                activeFilter === filter && styles.activeFilter,
              ]}
              onPress={() => handleFilterClick(filter)}>
              <Text
                style={[
                  styles.filterText,
                  activeFilter === filter && styles.activeFilterText,
                ]}>
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <View style={styles.results}>
          {activeFilter === 'New' && <BlogCard />}
          {/* Add more cards or data based on filters */}
          {/* <BlogCard /> */}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#fff',
    // paddingHorizontal: 16, // Reduced padding to minimize space
    // paddingTop: 16, // Top padding for header
  },
  container2: {
    paddingHorizontal: 16,
  },
  header: {
    // fontSize: 18,
    // fontWeight: '600',
    marginBottom: 12, // Reduced space below header
    // color: 'white',
    backgroundColor: '#FFA500',
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: '3%',
    paddingLeft: '2%',
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
    marginVertical: 20,
  },
  searchIcon: {
    marginRight: 5,
  },
  searchInput: {
    fontSize: 16,
    color: '#000',
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 8,
    borderColor: 'rgba(0,0,0,0.5)',
    borderWidth: 1,
    borderRadius: 10,
  },
  filterContainer: {
    flexDirection: 'row',
    marginBottom: 8, // Reduced margin below filters
  },
  filterButton: {
    paddingVertical: 4, // Reduced padding for buttons
    paddingHorizontal: 12, // Reduced horizontal padding
    borderRadius: 20,
    borderWidth: 1,
    height: 32,
    borderColor: '#FF9800',
    marginRight: 8,
  },
  filterText: {
    fontSize: 14,
    color: '#FF9800',
  },
  activeFilter: {
    backgroundColor: '#FF9800',
  },
  activeFilterText: {
    color: '#fff',
  },
  results: {
    // flex: 1,
    marginTop: 8, // Reduced space above results
  },
});


export default Blog;
