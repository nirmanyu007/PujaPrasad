import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

type Props = {
  location: string;
  openTiming: string;
  closeTiming: string;
  localLanguage: string;
};

const MandirInstruction: React.FC<Props> = ({
  location,
  openTiming,
  closeTiming,
  localLanguage,
}) => {
  return (
    <View style={styles.container}>
      {/* Title */}
      <View style={styles.header}>
        <Text style={styles.title}>Instructions</Text>
        <Icon name="error" size={18} color="red" style={styles.icon} />
      </View>
      <View
        style={{
          width: '20%', // Customize the width of the underline
          height: 2, // Thickness of the underline
          backgroundColor: '#FF8901', // Color of the underline
          marginBottom: 10,
        }}></View>

      {/* Instructions List */}
      <View style={styles.instructionItem}>
        <Icon name="place" size={20} color="#FF8901" />
        <Text style={styles.text}>{location}, India</Text>
      </View>

      <View style={styles.instructionItem}>
        <Icon name="access-time" size={20} color="#FF8901" />
        <Text style={styles.text}>
          {openTiming} to {closeTiming}{' '}
        </Text>
        <Text style={styles.subText}>*all seasons are best to visit</Text>
      </View>

      <View style={styles.instructionItem}>
        <Icon name="photo-camera" size={20} color="#FF8901" />
        <Text style={styles.text}>Photography not allowed</Text>
      </View>

      <View style={styles.instructionItem}>
        <Icon name="language" size={20} color="#FF8901" />
        <Text style={styles.text}>{localLanguage}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#CFCECD',
    // elevation: 2,
    // shadowColor: '#000',
    // shadowOpacity: 0.1,
    // shadowOffset: {width: 0, height: 2},
    // shadowRadius: 5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#CFCECD',
    marginRight: 5,
    // textDecorationStyle:'solid',
    // textDecorationLine: 'underline',
    // textDecorationColor: '#FF8901',
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
    fontSize: 11,
    color: '#FF8901',
  },
});

export default MandirInstruction;
