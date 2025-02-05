import {View, Text, TouchableOpacity, StyleSheet, Alert, ScrollView} from 'react-native';
import React, {useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  useNavigation,
  NavigationProp,
  RouteProp,
  useRoute,
} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


type StackParamList = {
  SelectPrasadPackage: {
    imageUri: string;
    templeName: string;
    prasadEntries: {price: number; description: string}[];
  };
  Cart: undefined;
};

const SelectPrasadPackage = () => {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
   const [selectedDescription, setSelectedDescription] = useState<
     string | null
   >(null);
const navigation = useNavigation<NavigationProp<StackParamList>>();

const route = useRoute<RouteProp<StackParamList, 'SelectPrasadPackage'>>();

const {imageUri, templeName, prasadEntries} = route.params;
// console.log(description);


   const handleGoBack = () => {
     navigation.goBack(); // Navigate back to the previous screen
   };

  const packages = prasadEntries.map((entry, index) => ({
    id: ['basic', 'standard', 'premium', 'deluxe'][index], // Assigning unique IDs
    title: [
      'Basic Package',
      'Standard Package',
      'Premium Package',
      'Deluxe Package',
    ][index],
    price: `₹ ${entry.price}/-`,
    description: [
      `Perfect for individual offerings.\n` +
        `Includes essential prasad items blessed at the temple.`,
      `Includes all items in the Basic Package.\n` +
        `Plus additional offerings like sweets and small puja items.`,
      `A complete package for special blessings.\n` +
        `Includes prasad, premium sweets, and extra temple offerings.`,
      'The ultimate divine package! Experience the most sacred offerings, premium prasad, and a complete spiritual experience.',
    ][index], // Unique static descriptions
    fullDescription: entry.description,
  }));

  const packageColors = {
    basic: '#4A0ABD', // Basic Package: Purple
    standard: '#D60724', // Standard Package: Red
    premium: '#1AA11F', // Premium Package: Green
    deluxe: '#000000', // Deluxe Package: Default Black
  };

  const handlePress = (id: string) => {
    setSelectedPackage(id);

    // Find the selected package description from prasadEntries
    const selectedPkg = packages.find(pkg => pkg.id === id);
    if (selectedPkg) {
      setSelectedDescription(selectedPkg.fullDescription);
    } else {
      setSelectedDescription('No description available.');
    }
  };

  

  

 const handleAddToCart = async () => {
   if (selectedPackage) {
     const selectedPackageData = packages.find(
       pkg => pkg.id === selectedPackage,
     );

     if (selectedPackageData) {
       try {
         // New item to be added to the cart
         const cartItem = {
           id: new Date().getTime().toString(),
           title: templeName, // Title of the temple
           description: selectedPackageData.title, // Package title
           price: parseFloat(selectedPackageData.price.replace(/[^0-9.]/g, '')), // Numeric price
           quantity: 1, // Default quantity
           image: imageUri || '', // Ensure this matches `CartItem.image`
         };

         const storedCart = await AsyncStorage.getItem('cartItems');
         let cartArray = storedCart ? JSON.parse(storedCart) : [];
         cartArray.push(cartItem);

         await AsyncStorage.setItem('cartItems', JSON.stringify(cartArray));
         Alert.alert('Success', 'Package added to cart!');
       } catch (error) {
         Alert.alert('Error', 'Failed to add package to cart.');
         console.error('Error storing data in AsyncStorage:', error);
       }
     }
   } else {
     Alert.alert(
       'No Package Selected',
       'Please select a package before adding to the cart.',
     );
   }
 };





  return (
    <View style={styles.container}>
      <ScrollView>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: '2%',
            // paddingVertical: '2%',
            paddingBottom: '4%',
          }}>
          <AntDesign
            onPress={handleGoBack}
            name="arrowleft"
            size={23}
            color="black"
          />
          <Text
            style={{
              paddingLeft: '2%',
              fontSize: 18,
              color: 'black',
              fontWeight: 600,
            }}>
            Select Prasad Package
          </Text>
        </View>
        <View
          style={{
            backgroundColor: '#FFEFDD',
            borderRadius: 15,
            borderBottomWidth: 5,
            borderBlockColor: '#FFC37E',
          }}>
          <Text style={styles.header}>🌟 Choose Your Prasad Package 🌟</Text>
          <Text style={styles.subHeader}>Click to select package</Text>

          {packages.map(pkg => (
            <TouchableOpacity
              key={pkg.id}
              style={[
                styles.packageContainer,
                selectedPackage === pkg.id && styles.selectedPackage,
              ]}
              onPress={() => handlePress(pkg.id)}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text
                  style={[
                    styles.packageTitle,
                    selectedPackage === pkg.id && styles.selectedTitle,
                    {
                      color:
                        packageColors[pkg.id as keyof typeof packageColors],
                    },
                  ]}>
                  {pkg.title}
                </Text>
                <Text
                  style={[
                    styles.packagePrice,
                    {
                      color:
                        packageColors[pkg.id as keyof typeof packageColors],
                    }, // Dynamic Price Color
                  ]}>
                  {pkg.price}
                </Text>
              </View>
              <View style={styles.descriptionContainer}>
                {pkg.description.split('\n').map((line, index) => (
                  <View key={index} style={styles.descriptionRow}>
                    <Icon
                      name="cards-diamond"
                      size={14}
                      color="#FFA500"
                      style={styles.icon}
                    />
                    <Text style={styles.packageDescription}>{line}</Text>
                  </View>
                ))}
              </View>
            </TouchableOpacity>
          ))}
        </View>
        <View>
          <Text
            style={{
              color: 'black',
              fontSize: 16,
              fontWeight: '600',
              paddingTop: 20,
            }}>
            Selected Package
          </Text>
          <Text
            style={{
              color: 'black',
              fontSize: 13,
              fontWeight: '600',
              opacity: 0.5,
              paddingTop: 2,
            }}>
            {selectedPackage || 'None'}
          </Text>
          <Text style={styles.fullDescription}>
            {selectedDescription || 'No description available.'}
          </Text>
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.addToCartButton}
          onPress={handleAddToCart}>
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: 10,
  },
  fullDescription: {
    paddingTop: 2,
    lineHeight: 25,
    color: 'black',
    fontSize: 14,
  },
  subHeader: {
    fontSize: 14,
    textAlign: 'center',
    color: '#666',
    marginBottom: 16,
  },
  packageContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    // shadowColor: '#000',
    // shadowOffset: {width: 0, height: 2},
    // shadowOpacity: 0.1,
    // shadowRadius: 4,
    // elevation: 4,
  },
  selectedPackage: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  packageTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  selectedTitle: {
    // color: 'red',
  },
  packagePrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FF5733',
    marginVertical: 8,
  },
  packageDescription: {
    fontSize: 12,
    color: '#555',
    // marginBottom: 10,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    padding: 16,
    borderTopWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
  },
  addToCartButton: {
    backgroundColor: '#00BD68',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  addToCartText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  descriptionContainer: {
    // marginBottom: 10,
  },
  descriptionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4, // Space between each line
  },
  icon: {
    marginRight: 6, // Space between icon and text
  },
});

export default SelectPrasadPackage;
