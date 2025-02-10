import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Alert, ScrollView} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation, NavigationProp, RouteProp, useRoute} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type StackParamList = {
  SelectPrasadPackage: {
    prasad: any; // complete prasad object from API
    imageUri: string;
    templeName: string;
    prasadEntries: {price: number; description: string}[];
    mandirId: string;
  };
  Cart: undefined;
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

const SelectPrasadPackage = () => {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [selectedDescription, setSelectedDescription] = useState<string | null>(null);
  const navigation = useNavigation<NavigationProp<StackParamList>>();
  const route = useRoute<RouteProp<StackParamList, 'SelectPrasadPackage'>>();
  const {prasad, imageUri, templeName, prasadEntries, mandirId} = route.params;

  const handleGoBack = () => {
    navigation.goBack();
  };

  // Build package options from prasadEntries
  const packages = prasadEntries.map((entry, index) => ({
    id: ['basic', 'standard', 'premium', 'deluxe'][index],
    title: [
      'Basic Package',
      'Standard Package',
      'Premium Package',
      'Deluxe Package',
    ][index],
    price: `₹ ${entry.price}/-`,
    description: [
      `Perfect for individual offerings.\nIncludes essential prasad items blessed at the temple.`,
      `Includes all items in the Basic Package.\nPlus additional offerings like sweets and small puja items.`,
      `A complete package for special blessings.\nIncludes prasad, premium sweets, and extra temple offerings.`,
      'The ultimate divine package! Experience the most sacred offerings, premium prasad, and a complete spiritual experience.',
    ][index],
    fullDescription: entry.description,
  }));

  const packageColors = {
    basic: '#4A0ABD',
    standard: '#D60724',
    premium: '#1AA11F',
    deluxe: '#000000',
  };

  const handlePress = (id: string) => {
    setSelectedPackage(id);
    const selectedPkg = packages.find(pkg => pkg.id === id);
    if (selectedPkg) {
      setSelectedDescription(selectedPkg.fullDescription);
    } else {
      setSelectedDescription('No description available.');
    }
  };

  const handleAddToCart = async () => {
    if (selectedPackage) {
      const selectedPackageData = packages.find(pkg => pkg.id === selectedPackage);
      if (selectedPackageData) {
        try {
          // Create a cart item with the realtime prasad data and the selected package.
          const cartItem = {
            id: prasad._id, // use realtime mandir _id
            prasad: prasad, // complete realtime prasad object
            selectedPackage: {
              id: selectedPackageData.id,
              title: selectedPackageData.title,
              price: parseFloat(selectedPackageData.price.replace(/[^0-9.]/g, '')),
              description: selectedPackageData.fullDescription,
            },
            quantity: 1,
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
      Alert.alert('No Package Selected', 'Please select a package before adding to the cart.');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.headerRow}>
          <AntDesign onPress={handleGoBack} name="arrowleft" size={23} color="black" />
          <Text style={styles.headerText}>Select Prasad Package</Text>
        </View>
        <View style={styles.packageWrapper}>
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
              <View style={styles.packageRow}>
                <Text
                  style={[
                    styles.packageTitle,
                    selectedPackage === pkg.id && styles.selectedTitle,
                    {color: packageColors[pkg.id as keyof typeof packageColors]},
                  ]}>
                  {pkg.title}
                </Text>
                <Text
                  style={[
                    styles.packagePrice,
                    {color: packageColors[pkg.id as keyof typeof packageColors]},
                  ]}>
                  {pkg.price}
                </Text>
              </View>
              <View style={styles.descriptionContainer}>
                {pkg.description.split('\n').map((line, index) => (
                  <View key={index} style={styles.descriptionRow}>
                    <Icon name="cards-diamond" size={14} color="#FFA500" style={styles.icon} />
                    <Text style={styles.packageDescription}>{line}</Text>
                  </View>
                ))}
              </View>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.selectedSection}>
          <Text style={styles.selectedLabel}>Selected Package</Text>
          <Text style={styles.selectedValue}>{selectedPackage || 'None'}</Text>
          <Text style={styles.fullDescription}>
            {stripHtmlTagsAndDecode(selectedDescription || 'No description available.')}
          </Text>
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SelectPrasadPackage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: '2%',
    paddingBottom: '4%',
  },
  headerText: {
    paddingLeft: '2%',
    fontSize: 18,
    color: 'black',
    fontWeight: '600',
  },
  packageWrapper: {
    backgroundColor: '#FFEFDD',
    borderRadius: 15,
    borderBottomWidth: 5,
    borderColor: '#FFC37E',
    paddingBottom: 10,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: 10,
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
  },
  selectedPackage: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  packageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  packageTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  selectedTitle: {},
  packagePrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FF5733',
    marginVertical: 8,
  },
  descriptionContainer: {},
  descriptionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  icon: {
    marginRight: 6,
  },
  packageDescription: {
    fontSize: 12,
    color: '#555',
  },
  selectedSection: {
    paddingTop: 20,
  },
  selectedLabel: {
    color: 'black',
    fontSize: 16,
    fontWeight: '600',
  },
  selectedValue: {
    color: 'black',
    fontSize: 13,
    fontWeight: '600',
    opacity: 0.5,
    paddingTop: 2,
  },
  fullDescription: {
    paddingTop: 2,
    lineHeight: 25,
    color: 'black',
    fontSize: 14,
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
});
