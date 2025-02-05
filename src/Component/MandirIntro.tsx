import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

type Props = {
  description?: string; // Optional property
};

const MandirIntro: React.FC<Props> = ({description}) => {
  const [expanded, setExpanded] = useState(false);

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  // Ensure `description` has a valid string value
  const safeDescription =
    description && description.length > 0
      ? description
      : 'No introduction available.';

  return (
    <View style={{paddingHorizontal: 20}}>
      {/* Title */}
      <View style={styles.header}>
        <Text style={styles.title}>Introduction</Text>
      </View>

      {/* Introduction Text */}
      <View style={styles.introBox}>
        <Text style={styles.text}>
          {expanded
            ? safeDescription
            : `${safeDescription.substring(0, 120)}...`}
        </Text>

        {/* Show More / Show Less Button */}
        {safeDescription.length > 120 && (
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
    // marginTop: 10,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFA500',
  },
  toggleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent:'center',
    marginTop: 10,
  },
});

export default MandirIntro;
