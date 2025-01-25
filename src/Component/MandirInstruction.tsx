import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const MandirInstruction = () => {
  return (
    <View style={styles.container}>
      {/* Title */}
      <View style={styles.header}>
        <Text style={styles.title}>Instructions</Text>
        <Icon name="error" size={18} color="red" style={styles.icon} />
      </View>

      {/* Instructions List */}
      <View style={styles.instructionItem}>
        <Icon name="place" size={20} color="#FF8901" />
        <Text style={styles.text}>Vrindavan, Uttar Pradesh (India)</Text>
      </View>

      <View style={styles.instructionItem}>
        <Icon name="access-time" size={20} color="#FF8901" />
        <Text style={styles.text}>
          7:00 AM to 8:00 PM{' '}
          <Text style={styles.subText}>*all seasons are best to visit</Text>
        </Text>
      </View>

      <View style={styles.instructionItem}>
        <Icon name="photo-camera" size={20} color="#FF8901" />
        <Text style={styles.text}>Photography not allowed</Text>
      </View>

      <View style={styles.instructionItem}>
        <Icon name="language" size={20} color="#FF8901" />
        <Text style={styles.text}>Hindi (Local Language)</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginRight: 5,
  },
  icon: {
    marginTop: 2,
  },
  instructionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: '#333',
    marginLeft: 10,
  },
  subText: {
    fontSize: 14,
    color: '#FF8901',
  },
});

export default MandirInstruction;
