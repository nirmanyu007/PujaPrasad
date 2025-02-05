import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React,{useState} from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons';

type Props = {
  description?: string; // Optional property
};

const MandirHistory: React.FC<Props> = ({description}) => {

    const [expanded, setExpanded] = useState(false);
    
      const handleToggle = () => {
        setExpanded(!expanded);
      };

      const safeDescription =
        description && description.length > 0
          ? description
          : 'No introduction available.';

    const introText = `Baijnath Temple, dating back to the 8th century, is dedicated to Lord Shiva as Baijnath, the healer of diseases. According to legend, Lord Shiva named the temple "Baijnath" after visiting the spot with Goddess Parvati. Built by two local merchants, the temple is an example of North Indian (Shikhara) architecture with intricate carvings. Known for its healing powers, .`;
  return (
    <View style={{paddingHorizontal: 20}}>
      {/* Title */}
      <View style={styles.header}>
        <Text style={styles.title}>History</Text>
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
          <TouchableOpacity style={styles.toggleButton} onPress={handleToggle}>
            <Text style={styles.toggleText}>
              {expanded ? 'Show less' : 'Show more'}
            </Text>
            <Icon
              name={expanded ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
              size={20}
              color="black"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
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
    // backgroundColor: '#FFF7EB',
    borderWidth: 1,
    borderColor: '#CFCFCF',
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
    fontWeight: '600',
    color: 'black',
  },
  toggleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent:'center',
    marginTop: 10,
  },
});

export default MandirHistory