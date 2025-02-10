import React, {useEffect, useState} from 'react';
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
  PreviewPuja: undefined;
};

interface Post {
  _id: string;
  title: string;
  titleHindi?: string;
  description: string;
  description2?: string; // Add description2
  description3?: string;
  images?: string[];
  addedOn: string;
  author: string;
  hashtags?: string[];
}

const Blog: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [posts, setPosts] = useState<Post[]>([]);
  const [activeFilter, setActiveFilter] = useState<string | null>(null); // Default: No filter
  const navigation = useNavigation<NavigationProp<StackParamList>>();
  const [uniqueTags, setUniqueTags] = useState<string[]>([]);
  const [error, setError] = useState<Error | null>(null);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const filters = ['New', 'Trending', '#Hanuman', '#Holi', '#Shiva', '#HarHar'];

  // Sample Blog Data (Replace with API)
  const blogData = [
    {id: 1, title: 'Hanuman Jayanti Special', tag: '#Hanuman'},
    {id: 2, title: 'The Spiritual Importance of Holi', tag: '#Holi'},
    {id: 3, title: 'Shiva’s Eternal Wisdom', tag: '#Shiva'},
    {id: 4, title: 'The Power of Chanting Har Har Mahadev', tag: '#HarHar'},
    {id: 5, title: 'Latest Puja Trends', tag: 'Trending'},
    {id: 6, title: 'New Temple Rituals', tag: 'New'},
  ];

  const filteredPosts = posts.filter(({title, hashtags}) => {
    const matchesSearch = title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const matchesFilter =
      !activeFilter || // If no filter is selected, allow all posts
      (hashtags && hashtags.includes(activeFilter)) || // If post contains the active filter tag
      activeFilter === 'New' || // Special case for 'New'
      activeFilter === 'Trending'; // Special case for 'Trending'

    return matchesSearch && matchesFilter;
  });

  // Filter blogs only if a filter is selected
  const filteredBlogs = activeFilter
    ? blogData.filter(blog => blog.tag === activeFilter)
    : blogData; // Default to all blogs

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`http://192.168.1.30:5001/fetch-blogs`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Post[] = await response.json();

        // Sort posts in reverse order (latest first)
        const sortedPosts = data.sort(
          (a, b) =>
            new Date(b.addedOn).getTime() - new Date(a.addedOn).getTime(),
        );
        setPosts(sortedPosts);

        // Extract unique tags
        const tagsSet = new Set<string>();
        sortedPosts.forEach(post => {
          if (Array.isArray(post.hashtags)) {
            post.hashtags.forEach(tag => tagsSet.add(tag));
          }
        });
        setUniqueTags(Array.from(tagsSet));

        // setLoading(false);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
        setError(error instanceof Error ? error : new Error('Unknown error'));
        // setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <AntDesign
          onPress={handleGoBack}
          name="arrowleft"
          size={23}
          color="white"
        />
        <Text style={styles.headerText}>Blog</Text>
      </View>

      <View style={styles.container2}>
        {/* Search Box */}
        <View style={styles.searchContainer}>
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
            value={searchQuery} // Bind the value to the state
            onChangeText={text => setSearchQuery(text)} // Update state as user types
          />
        </View>

        {/* Filters */}
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
              onPress={() =>
                setActiveFilter(filter === activeFilter ? null : filter)
              } // Toggle filter
            >
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

        {/* Blog Results */}
        {/* Blog Results */}
        <ScrollView style={styles.results}>
          {filteredPosts.length > 0 ? (
            filteredPosts.map(blog => (
              <BlogCard
                key={blog._id}
                title={blog.title}
                image={blog.images?.[0] || ''}
                description={blog.description}
                description2={blog.description2 || ''}
                description3={blog.description3 || ''}
                author={blog.author}
                date={new Date(blog.addedOn).toDateString()}
              />
            ))
          ) : (
            <Text style={styles.noResultsText}>No blogs found.</Text>
          )}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  container2: {
    paddingHorizontal: 16,
  },
  header: {
    marginBottom: 12,
    backgroundColor: '#FFA500',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: '3%',
    paddingLeft: '2%',
  },
  headerText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    paddingLeft: '2%',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
    flex: 1,
  },
  filterContainer: {
    flexDirection: 'row',
    // marginBottom: 8,
    paddingBottom: 8,
  },
  filterButton: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    backgroundColor: '#FFE0BB',
    height: 32,
    borderColor: '#FF9800',
    marginRight: 8,
  },
  filterText: {
    fontSize: 14,
    color: 'black',
  },
  activeFilter: {
    backgroundColor: '#FF9800',
  },
  activeFilterText: {
    color: '#fff',
  },
  results: {
    marginTop: 8,
  },
  noResultsText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#888',
    marginTop: 20,
  },
});

export default Blog;
