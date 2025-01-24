import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const AboutPujaBox: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <View style={styles.card}>
      <Text style={styles.heading}>
        Mahamrityunjaya Chanting and Rudrabhishek 11 Shastri
      </Text>
      <Text style={styles.description}>
        Protection from negative forces, untimely death, and aids in healing and
        recovery from illnesses.
      </Text>
      <Text style={styles.body}>
        {isExpanded
          ? 'The Rudrabhishek 11 Shastri Pooja is an elaborate and highly revered Vedic ritual conducted by 11 skilled priests (Shastris) to invoke the powerful blessings of Lord Shiva.'
          : 'The Rudrabhishek 11 Shastri Pooja is an elaborate and highly revered Vedic ritual...'}
      </Text>
      <TouchableOpacity onPress={handleToggle}>
        <Text style={styles.toggleText}>
          {isExpanded ? 'Show less \u25B2' : 'Show more \u25BC'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFF7ED',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#F5C488',
    // margin: 16,
    marginTop:'3%',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
    elevation: 3,
  },
  heading: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#000',
  },
  description: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
  },
  body: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },
  toggleText: {
    fontSize: 14,
    color: '#FF6505',
    fontWeight: 'bold',
    marginTop: 8,
  },
});

export default AboutPujaBox;
