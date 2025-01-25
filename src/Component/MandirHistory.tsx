import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React,{useState} from 'react'

const MandirHistory = () => {

    const [expanded, setExpanded] = useState(false);
    
      const handleToggle = () => {
        setExpanded(!expanded);
      };

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
              {expanded ? introText : `${introText.substring(0, 200)}...`}
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
  )
}
const styles = StyleSheet.create({
  
  header: {
    backgroundColor: '#FFA500',
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom:10,
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
    borderColor: 'rgba(0,0,0,0.1)',
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

export default MandirHistory