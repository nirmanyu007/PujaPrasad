import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

const BlogCard: React.FC = () => {
  return (
    <View style={styles.card}>
      <Image
        source={{
          uri: 'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/Puja-Prasad-App/Puja/Blog1.png',
        }} // Replace with your image URL
        style={styles.image}
      />
      <View style={styles.textContainer}>
        <Text style={styles.title}>
          Why Maha Kumbh is the Ultimate Gateway to Moksha
        </Text>
        <Text style={styles.description}>
          Maha Kumbh, the grandest spiritual gathering in the world, is revered
          as the ultimate opportunity to attain moksha—freedom from the cycle of
          birth and rebirth <Text style={styles.readMore}>Read more...</Text>
        </Text>
        <View style={styles.footer}>
          <Text style={styles.author}>Tashneet Kaur</Text>
          <Text style={styles.date}>01 Jan, 2025</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 16,
  },
  image: {
    width: '100%',
    height: 200,
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
    marginBottom: 12,
  },
  readMore: {
    color: '#FF9800',
    fontWeight: 'bold',
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
