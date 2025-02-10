import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {useNavigation, NavigationProp} from '@react-navigation/native';

type StackParamList = {
  BlogDetail: {
    title: string;
    image: string;
    description: string;
    description2: string;
    description3: string;
    author: string;
    date: string;
  };
};

interface BlogCardProps {
  title: string;
  image: string;
  description: string;
  description2: string;
  description3: string;
  author: string;
  date: string;
}
const decodeHtmlEntities = (text: string): string => {
  return text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'") // Add more as needed
    .replace(/&nbsp;/g, '');
};

const stripHtmlTagsAndDecode = (html: string): string => {
  const withoutHtmlTags = html.replace(/<\/?[^>]+(>|$)/g, ''); // Strip HTML tags
  return decodeHtmlEntities(withoutHtmlTags); // Decode HTML entities
};

const BlogCard: React.FC<BlogCardProps> = ({
  title,
  image,
  description,
  description2,
  description3,
  author,
  date,
}) => {
  const navigation = useNavigation<NavigationProp<StackParamList>>();

  const handleClick = () => {
    navigation.navigate('BlogDetail', {
      title,
      image,
      description,
      description2,
      description3,
      author,
      date,
    });
  };

  return (
    <TouchableOpacity onPress={handleClick} style={styles.card}>
      {image ? (
        <Image source={{uri: image}} style={styles.image} />
      ) : (
        <View style={styles.imagePlaceholder}>
          <Text style={styles.placeholderText}>No Image</Text>
        </View>
      )}
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description} numberOfLines={3}>
          {stripHtmlTagsAndDecode(description)}{' '}
          {stripHtmlTagsAndDecode(description2)}{' '}
          {stripHtmlTagsAndDecode(description3)}
        </Text>
        <Text style={styles.readMore}>Read more...</Text>
        <View style={{borderWidth: 0.2, borderColor: '#B3B3B3'}}></View>
        <View style={styles.footer}>
          <Text style={styles.author}>{author}</Text>
          <Text style={styles.date}>{date}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width:'100%',
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    // shadowColor: '#000',
    // shadowOffset: {width: 0, height: 2},
    // shadowOpacity: 0.1,
    // shadowRadius: 4,
    // elevation: 2,
    borderColor:'#999999',
    borderWidth:1,
    marginBottom: 16,
  },
  image: {
    width: '100%',
    height: 200,
  },
  imagePlaceholder: {
    width: '100%',
    height: 200,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: '#888',
  },
  textContainer: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#666',
    // marginBottom: 12,
  },
  readMore: {
    color: '#FF9800',
    fontWeight: 'bold',
    marginBottom:5,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  author: {
    fontSize: 12,
    color: '#888',
  },
  date: {
    fontSize: 12,
    color: '#888',
  },
});

export default BlogCard;
