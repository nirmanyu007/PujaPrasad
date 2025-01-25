import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const MandirIntro = () => {
  const [expanded, setExpanded] = useState(false);

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  const introText = `Baijnath Temple, located in Himachal Pradesh, is one of the oldest and most revered temples dedicated to Lord Shiva, worshipped here as Baijnath, the healer of all diseases. The temple, built in the 8th century, is known for its stunning North Indian (Shikhara) architecture and its deep spiritual significance.`;

  return (
    <View style={{paddingHorizontal: 20}}>
      {/* Title */}
      <View style={styles.header}>
        <Text style={styles.title}>Introduction</Text>
      </View>

      {/* Introduction Text */}
      <View style={styles.introBox}>
        <Text style={styles.text}>
          {expanded ? introText : `${introText.substring(0, 120)}...`}
        </Text>

        {/* Show More / Show Less Button */}
        <TouchableOpacity onPress={handleToggle}>
          <Text style={styles.toggleText}>
            {expanded ? 'Show less' : 'Show more'}{' '}
            <Text style={{fontSize: 18}}>{expanded ? '▲' : '▼'}</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#FFA500',
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 10,
    borderRadius: 8,
    // borderTopRightRadius: 8,
    alignSelf: 'flex-start',
    
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  introBox: {
    backgroundColor: '#FFF7EB',
    borderWidth: 1,
    borderColor: '#FFA500',
    borderRadius: 8,
    padding: 10,
    marginTop: -5,
  },
  text: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  toggleText: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFA500',
  },
});

export default MandirIntro;
