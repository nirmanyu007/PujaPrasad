import {View, Text, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import React, {useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  useNavigation,
  NavigationProp,
  RouteProp,
  useRoute,
} from '@react-navigation/native';


type StackParamList = {
  SelectPrasadPackage: {imageUri: string; templeName: string};
  Cart: {
    title: string;
    description: string;
    price: string;
    quantity: number;
    image: string;
  }[];
};

const SelectPrasadPackage = () => {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
const navigation = useNavigation<NavigationProp<StackParamList>>();
const route = useRoute<RouteProp<StackParamList, 'SelectPrasadPackage'>>();

const {imageUri, templeName} = route.params;

   const handleGoBack = () => {
     navigation.goBack(); // Navigate back to the previous screen
   };

  const packages = [
    {
      id: 'basic',
      title: 'Basic Package',
      price: '₹ 501/-',
      description:
        'Perfect for individual offerings.\nIncludes essential prasad items blessed at the temple.',
    },
    {
      id: 'standard',
      title: 'Standard Package',
      price: '₹ 701/-',
      description:
        'Includes all items in the Basic Package.\nPlus additional offerings like sweets and small puja items.',
    },
    {
      id: 'premium',
      title: 'Premium Package',
      price: '₹ 1001/-',
      description:
        'A complete package for special blessings.\nIncludes prasad, premium sweets, and extra temple offerings.',
    },
  ];

  const handlePress = (id: string) => {
    setSelectedPackage(id);
  };

  

  const handleAddToCart = () => {
    if (selectedPackage) {
      const selectedPackageData = packages.find(
        pkg => pkg.id === selectedPackage,
      );

      if (selectedPackageData) {
        navigation.navigate('Cart', [
          {
            title: templeName,
            description: selectedPackageData.title,
            price: selectedPackageData.price,
            quantity: 1,
            image: imageUri,
          },
        ]);
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
      <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingHorizontal: '2%',
                  // paddingVertical: '2%',
                  paddingBottom:'4%'
                }}>
                <AntDesign
                  onPress={handleGoBack}
                  name="arrowleft"
                  size={23}
                  color="black"
                />
                <Text style={{paddingLeft: '2%', fontSize:18,color:'black',fontWeight:600}}>Select Prasad Package</Text>
              </View>
      <View style={{backgroundColor: 'yellow', borderRadius: 15}}>
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
                ]}>
                {pkg.title}
              </Text>
              <Text style={styles.packagePrice}>{pkg.price}</Text>
            </View>
            <Text style={styles.packageDescription}>{pkg.description}</Text>
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
        <Text style={{paddingTop: 2, lineHeight: 25}}>
          Kashi Temple Prasad: A Divine Offering of Blessings The Prasad at
          Kashi Temple is not just a simple offering, but a sacred blessing from
          Lord Vishwanath himself. This divine gift, offered to devotees, holds
          a profound spiritual significance. Made with love and devotion, it
          typically includes an assortment of delicacies like sweets (pedas,
          kheer, halwa), fresh fruits, and milk, all prepared with pure
          ingredients. Every item is imbued with positive energy and believed to
          be a manifestation of divine grace.
        </Text>
      </View>
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
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  selectedPackage: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  packageTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  selectedTitle: {
    color: 'red',
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
    marginBottom: 10,
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

export default SelectPrasadPackage;
