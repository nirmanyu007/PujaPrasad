import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import CartBox from './CartBox';
import Entypo from 'react-native-vector-icons/Entypo';
import {useNavigation, NavigationProp} from '@react-navigation/native';

type StackParamList = {
  Address: undefined;
};

const Cart = () => {
   const navigation = useNavigation<NavigationProp<StackParamList>>(); 
               const handleClick = () => {
                 navigation.navigate('Address'); // Navigate to PreviewPuja screen
               };
  const [cartItems, setCartItems] = useState([
    {
      id: '1',
      title: 'Banke Bihari Prasadam',
      description: 'A Divine Offering of Blessings',
      price: 701,
      quantity: 1,
      image: 'https://via.placeholder.com/100', // Replace with your image URL
    },
    {
      id: '2',
      title: 'Banke Bihari Prasadam',
      description: 'A Divine Offering of Blessings',
      price: 701,
      quantity: 1,
      image: 'https://via.placeholder.com/100', // Replace with your image URL
    },
  ]);

  const incrementQuantity = (id: string) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? {...item, quantity: item.quantity + 1} : item,
      ),
    );
  };

  const decrementQuantity = (id: string) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id && item.quantity > 1
          ? {...item, quantity: item.quantity - 1}
          : item,
      ),
    );
  };

  const getTotalAmount = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View
          style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
          <Entypo name="cross" size={24} color="#000" />
          <Text style={styles.headerText}>Cart</Text>
        </View>
        <TouchableOpacity>
          <Text style={styles.clearButton}>Clear</Text>
        </TouchableOpacity>
      </View>
      <View style={{alignItems: 'center', paddingVertical: '5%'}}>
        <Image
          source={{
            uri: 'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/Puja-Prasad-App/Puja/cart_cart.png',
          }}
          style={{width: 160, height: 50}}
        />
      </View>

      {/* Cart Summary */}
      <View style={styles.cartSummary}>
        <Text style={styles.cartSummaryText}>
          Total Item ({getTotalItems()})
        </Text>
      </View>

      {/* Cart Items */}
      <FlatList
        data={cartItems}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <CartBox
            item={item}
            incrementQuantity={incrementQuantity}
            decrementQuantity={decrementQuantity}
          />
        )}
      />

      {/* Bill Details */}
      <View style={styles.billDetails}>
        <Text style={styles.billText}>Bill details</Text>
        <View style={styles.billRow}>
          <Text style={styles.billLabel}>Item total</Text>
          <Text style={styles.billValue}>₹{getTotalAmount()}</Text>
        </View>
        <View style={styles.billRow}>
          <Text style={styles.billLabel}>Platform Convenience Fee</Text>
          <Text style={styles.billValue}>₹25 FREE</Text>
        </View>
        <View style={styles.billRow}>
          <Text style={styles.billLabel}>Delivery Charge</Text>
          <Text style={styles.billValue}>₹25 FREE</Text>
        </View>
        <View style={styles.billRow}>
          <Text style={styles.billLabel}>Sub Total</Text>
          <Text style={styles.billValue}>₹{getTotalAmount()}</Text>
        </View>
        <View style={styles.billRow2}>
          <Text style={styles.billLabel}>Total Amount</Text>
          <Text style={styles.totalAmount}>₹{getTotalAmount()}</Text>
        </View>
        <Text style={styles.savings}>Your total savings ₹50</Text>
        {/* Bottom Image */}
        <Image
          source={{
            uri: 'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/Puja-Prasad-App/Puja/bottom.png',
          }}
          style={styles.bottomImage}
          resizeMode="cover"
        />
      </View>

      {/* Checkout Button */}
      <TouchableOpacity
        onPress={handleClick}
        style={styles.checkoutButton}>
        <Text style={styles.checkoutText}>Checkout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingLeft: '3%',
    color: 'black',
  },
  clearButton: {
    fontSize: 14,
    color: '#FF0000',
  },
  cartSummary: {
    paddingLeft: 16,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    backgroundColor: '#f9f9f9',
  },
  cartSummaryText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  billDetails: {
    position: 'relative',
    // padding: 16,
    backgroundColor: '#f9f9f9',
    marginVertical: 8,
    shadowColor: 'rgba(0, 0, 0, 0.5)', // Color of the shadow
    shadowOffset: {width: 0, height: 0}, // Horizontal and vertical offset
    shadowOpacity: 1, // Opacity of the shadow
    shadowRadius: 4, // Blur radius
    elevation: 4, // For Android
    borderRadius: 15,
    // marginHorizontal: 16,
    overflow: 'hidden', // Ensures the image doesn't exceed the container
    width: '100%', // Full width
  },
  billText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    paddingLeft: '4%',
  },
  bottomImage: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    // objectFit: 'fill',
    width: '100%',
    height: 50,
  },
  billRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
    paddingHorizontal: 16,
  },
  billRow2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
    marginBottom: 26,
    paddingHorizontal: 16,
  },
  billLabel: {
    fontSize: 14,
    color: '#666',
  },
  billValue: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  totalAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF5733',
  },
  savings: {
    fontSize: 12,
    color: 'black',
    marginTop: 8,
    zIndex: 100,
    paddingBottom: 16,
    paddingLeft: '3%',
  },
  checkoutButton: {
    backgroundColor: '#00BD68',
    padding: 16,
    margin: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  checkoutText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default Cart;
