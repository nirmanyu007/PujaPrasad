import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const TempleDetail = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const description =
    "The Kashi Vishwanath Temple, located in Varanasi, Uttar Pradesh, India, is one of the most revered and ancient temples dedicated to Lord Shiva. Known as the 'Golden Temple' due to its stunning golden spire and dome, it stands on the western bank of the sacred Ganga River.";

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Kashi Vishwanath Temple, Varanasi, Uttar Pradesh, India
      </Text>
      <Text
        style={styles.description}
        numberOfLines={isExpanded ? undefined : 2}>
        {description}
      </Text>
      <TouchableOpacity onPress={toggleExpanded}>
        <Text style={styles.showMoreText}>
          {isExpanded ? 'Show less ▲' : 'Show more ▼'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    // margin: 16,
    marginVertical:'5%',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  description: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },
  showMoreText: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FD7109',
  },
});

export default TempleDetail;
