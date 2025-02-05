import React from 'react';
import {View, Text, Image, StyleSheet, ScrollView} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation, useRoute, RouteProp} from '@react-navigation/native';

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

const BlogCardDetail: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<StackParamList, 'BlogDetail'>>();
  const {title, image, description, description2, description3, author, date} =
    route.params;

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <AntDesign
          onPress={handleGoBack}
          name="arrowleft"
          size={23}
          color="white"
        />
        <Text style={styles.headerText}>Vedic Vibhav</Text>
      </View>

      <ScrollView contentContainerStyle={styles.contentContainer}>
        {/* Blog Image */}
        <View style={styles.imageContainer}>
          <Image source={{uri: image}} style={styles.blogImage} />
          <View style={styles.newBadge}>
            <Text style={styles.newBadgeText}>New</Text>
          </View>
        </View>

        {/* Blog Title */}
        <Text style={styles.title}>{title}</Text>

        {/* Author and Date */}
        <View style={styles.authorDateContainer}>
          <View style={{display: 'flex', flexDirection: 'column'}}>
            <Text style={styles.author}>Author:</Text>
            <Text style={{fontSize: 14, color: 'black', fontWeight: 'bold'}}>
              {author}
            </Text>
          </View>
          <View style={{display: 'flex', flexDirection: 'column'}}>
            <Text style={styles.author}>Date:</Text>
            <Text style={{fontSize: 14, color: 'black', fontWeight: 'bold'}}>
              {date}
            </Text>
          </View>
        </View>

        {/* Blog Content */}
        <Text style={styles.content}>
          {description} {'\n\n'}
          {description2} {'\n\n'}
          {description3}
        </Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#FFA500',
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    paddingLeft: '2%',
    // fontFamily: 'Poppins-Bold',
  },
  contentContainer: {
    padding: 20,
  },
  imageContainer: {
    position: 'relative',
  },
  blogImage: {
    width: '100%',
    height: 195,
    borderRadius: 15,
  },
  newBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#6c5ce7',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  newBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#333',
    fontFamily: 'Poppins-Bold',
  },
  authorDateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  author: {
    fontSize: 14,
    color: '#555',
  },
  date: {
    fontSize: 14,
    color: '#555',
  },
  content: {
    fontSize: 14,
    color: '#444',
    lineHeight: 24,
    marginTop: 10,
  },
});

export default BlogCardDetail;
