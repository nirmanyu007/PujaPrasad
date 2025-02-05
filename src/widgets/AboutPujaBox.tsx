import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const AboutPujaBox = ({description}: {description: string}) => {
  const [expanded, setExpanded] = useState(false);
  const MAX_LENGTH = 150; // Set max character limit before truncation

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  return (
    <View style={styles.card}>
      <Text style={{}}>
                {expanded
                  ? description
                  : `${description.substring(0, 120)}...`}
              </Text>

      {description.length > 120 && (
                <TouchableOpacity onPress={handleToggle} style={styles.toggleButton}>
                  <Text style={styles.toggleText}>
                    {expanded ? 'Show less' : 'Show more'}
                  </Text>
                  <Icon
                    name={expanded ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
                    size={20}
                    color="#FFA500"
                  />
                </TouchableOpacity>
              )}
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
    marginTop: '3%',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
    elevation: 3,
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
    // marginTop: 8,
    textAlign: 'right',
  },
 
  toggleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent:'center',
    // marginTop: 10,
  },
});

export default AboutPujaBox;
