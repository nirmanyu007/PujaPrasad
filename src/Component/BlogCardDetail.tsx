import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';



const BlogCardDetail = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
              <AntDesign
                // onPress={handleGoBack}
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
                Vedic Vibhav
              </Text>
            </View>

      <ScrollView contentContainerStyle={styles.contentContainer}>
        {/* Blog Image */}
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: 'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/Puja-Prasad-App/Puja/Blog1.png', // Replace with your image URL
            }}
            style={styles.blogImage}
          />
          <View style={styles.newBadge}>
            <Text style={styles.newBadgeText}>New</Text>
          </View>
        </View>

        {/* Blog Title */}
        <Text style={styles.title}>
          Why Maha Kumbh is the Ultimate Gateway to Moksha
        </Text>

        {/* Author and Date */}
        <View style={styles.authorDateContainer}>
          <Text style={styles.author}>Author: Tashneet Kaur</Text>
          <Text style={styles.date}>01 Jan, 2025</Text>
        </View>

        {/* Blog Content */}
        <Text style={styles.content}>
          Maha Kumbh, the grandest spiritual gathering in the world, is revered
          as the ultimate opportunity to attain moksha—freedom from the cycle of
          birth and rebirth. This sacred event, celebrated once every 12 years,
          brings together millions of devotees, saints, and seekers at the
          Triveni Sangam, the confluence of Ganga, Yamuna, and the mystical
          Saraswati rivers...
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
  },
  contentContainer: {
    padding: 20,
  },
  imageContainer: {
    position: 'relative',
  },
  blogImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
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
    fontSize: 16,
    color: '#444',
    lineHeight: 24,
    marginTop: 10,
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#FFA500',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  fabText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default BlogCardDetail;
