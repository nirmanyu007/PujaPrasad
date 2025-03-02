import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation, NavigationProp} from '@react-navigation/native';

type Puja = {
  _id: string; // Puja ID
  title: string;
  poojaCardImage: string;
  poojaCardBenefit: string;
  mandirLists: {
    poojaMandirDates: string[];
    poojaMandirTime: string;
    originalPrice: number;
  }[];
};

type Props = {
  name: string; // Mandir name
  pujas: Puja[]; // Array of pujas
};

type StackParamList = {
  PujaDetails: {
    pujaId: string;
    pujaData: Puja; // Include pujaData of type Puja
  }; // Define the route for PujaDetail
};

const MandirPuja: React.FC<Props> = ({name, pujas}) => {
  const navigation = useNavigation<NavigationProp<StackParamList>>();

  const handlePujaCardPress = (puja: Puja) => {
    navigation.navigate('PujaDetails', {
      pujaId: puja._id,
      pujaData: puja, // Pass the entire puja object
    });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.headerText}>
        🌼 BOOK ONLINE PUJA IN 🌼{'\n'}
        <Text style={styles.headerSubText}>{name}</Text>
      </Text>

      {pujas.length === 0 ? (
        // No puja available message
        <View style={styles.noPujaContainer}>
          <Text style={styles.noPujaText}>No puja available</Text>
        </View>
      ) : (
        // Render puja cards if pujas are available
        <ScrollView>
          {pujas.map((puja, index) => {
            const {title, poojaCardImage, poojaCardBenefit, mandirLists} = puja;
            const firstMandir = mandirLists[0]; // Assuming there’s always at least one mandir
            const pujaDate =
              firstMandir?.poojaMandirDates[0] || 'Date not available';
            const pujaTime =
              firstMandir?.poojaMandirTime || 'Time not available';
            const price = firstMandir?.originalPrice || 0;

            return (
              <TouchableOpacity
                key={index}
                style={styles.card}
                onPress={() => handlePujaCardPress(puja)}>
                {/* Top Section */}
                <View style={styles.imageContainer}>
                  <Image
                    source={{
                      uri: poojaCardImage || 'https://via.placeholder.com/150', // Fallback if image is missing
                    }}
                    style={styles.image}
                  />
                  <Text style={styles.badge}>BHOG</Text>
                </View>

                {/* Middle Section */}
                <View style={styles.detailsContainer}>
                  <Text style={styles.pujaName}>{title}</Text>
                  <Text style={styles.pujaDescription}>{poojaCardBenefit}</Text>
                  <View style={styles.dateContainer}>
                    <Icon name="event" size={18} color="#FF8901" />
                    <Text style={styles.dateText}>
                      {pujaDate}, {pujaTime}
                    </Text>
                  </View>
                </View>

                {/* Bottom Section */}
                <View style={styles.footer}>
                  <Text style={styles.price}>*Starting from ₹ {price}/-</Text>
                  <TouchableOpacity style={styles.bookButton}>
                    <Text style={styles.bookButtonText}>Book Puja →</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#0A6B81',
  },
  headerText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  headerSubText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  noPujaContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  noPujaText: {
    fontSize: 16,
    color: 'white',
    fontStyle: 'italic',
  },
  card: {
    marginTop: 20,
    backgroundColor: '#FFF',
    borderRadius: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 5,
    overflow: 'hidden',
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 180,
  },
  badge: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: '#FF8901',
    color: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    fontSize: 12,
    fontWeight: 'bold',
  },
  detailsContainer: {
    padding: 15,
  },
  pujaName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  pujaDescription: {
    fontSize: 14,
    color: '#666',
    marginVertical: 5,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  dateText: {
    fontSize: 14,
    color: '#333',
    marginLeft: 5,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF7EB',
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#EEE',
  },
  price: {
    fontSize: 14,
    color: '#FF8901',
    fontWeight: 'bold',
  },
  bookButton: {
    backgroundColor: '#FF8901',
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 15,
  },
  bookButtonText: {
    fontSize: 14,
    color: '#FFF',
    fontWeight: 'bold',
  },
});

export default MandirPuja;
