import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../App';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type CardBoxProps = {
  title: string;
  description: string;
  location: string;
  date: string;
  id:string;
  price: string;
  imageUri: string;
  // onPress: () => void;
};

const decodeHtmlEntities = (text: string): string => {
  return text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'") // Add more as needed
    .replace(/&nbsp;/g, '');
};

const stripHtmlTagsAndDecode = (html: string): string => {
  const withoutHtmlTags = html.replace(/<\/?[^>]+(>|$)/g, ''); // Strip HTML tags
  return decodeHtmlEntities(withoutHtmlTags); // Decode HTML entities
};

const CardBox: React.FC<CardBoxProps> = ({
  title,
  description,
  location,
  date,
  id,
  price,
  imageUri,
  // onPress,
}) => {
 type NavigationProps = NativeStackNavigationProp<
     RootStackParamList,
     'PujaDetails'
   >;
   const navigation = useNavigation<NavigationProps>();

  const handlePress = () => {
     navigation.navigate('PujaDetails', {pujaId: id}); // TypeScript compatibility
  };

  return (
    <View style={styles.cardContainer}>
      <TouchableOpacity onPress={handlePress}>
        {/* Top Section with Image */}
        <View style={styles.imageContainer}>
          <Image source={{uri: imageUri}} style={styles.cardImage} />
        </View>

        {/* Text Content */}
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{stripHtmlTagsAndDecode(description)}</Text>

          {/* Location Section */}
          <View style={styles.infoRow}>
            <Image
              source={{
                uri: 'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/Puja-Prasad-App/Puja/temple.png',
              }}
              style={styles.icon}
            />
            <Text style={styles.infoText}>{location}</Text>
          </View>

          {/* Date Section */}
          <View style={styles.infoRow}>
            <Image
              source={{
                uri: 'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/Puja-Prasad-App/Puja/date.png',
              }}
              style={styles.icon}
            />
            <Text style={styles.infoText}>{date}</Text>
          </View>

          {/* Footer Section */}
          <View style={styles.footer}>
            <Text style={styles.startingPrice}>*Starting from {price}</Text>
            <TouchableOpacity style={styles.button} onPress={handlePress}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={styles.buttonText10}> |</Text>
                <Text style={styles.buttonText}> Book Puja</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom:15,
    overflow: 'hidden',
    elevation: 5, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOpacity: 0.2,
    shadowOffset: {width: 0, height: 2},

    shadowRadius: 5,
    alignSelf: 'stretch', // Ensures it stretches to fill parent width
    paddingHorizontal: 0, // No extra padding horizontally
  },
  imageContainer: {
    position: 'relative',
  },
  cardImage: {
    width: '100%',
    height: 180,
    objectFit: 'cover',
  },
  labelContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: '#FF6F00',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  labelText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  contentContainer: {
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F55E00',
    paddingTop: '2%',
  },
  description: {
    fontSize: 14,
    color: 'rgba(0,0,0,0.8)',
    fontStyle: 'italic',
    paddingTop: '1%',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  icon: {
    width: 25,
    height: 25,
    marginRight: 10,
  },
  infoText: {
    fontSize: 14,
    color: 'rgba(0,0,0,0.5)',
    flex: 1,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 15,
    backgroundColor: '#008732',
    borderRadius: 10,
    marginBottom: '5%',
  },
  startingPrice: {
    fontSize: 14,
    color: 'white',
    fontStyle: 'italic',
    fontWeight: 'bold',
    paddingLeft: 10,
  },
  button: {
    // backgroundColor: '#28a745',
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 3,
  },
  buttonText10: {
    fontSize: 32,
    color: 'white',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default CardBox;
